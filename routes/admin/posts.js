const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const fs = require('fs');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    Post.find({}).then(posts=>{
        res.render('admin/posts', {posts: posts});
    });
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    let errors = [];

    if (!req.body.title) {
        errors.push({message: 'please add a title'});
    }

    if (!req.body.body) {
        errors.push({message: 'please add a description'});
    }

    if (errors.length > 0) {
        res.render('admin/posts/create', {
            errors: errors
        });
        
    } else {
            let filename = 'bmw z4.png';
            if (!isEmpty(req.files)) {        
                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
            
                file.mv('./public/uploads/'+filename, (err)=>{
                    if(err) throw err;
                });
            }
        
            let allowComments = false;
        
            if (req.body.allowComments) {
                allowComments = true;
            }
        
            const newPost = new Post({
                title: req.body.title,
                status: req.body.status,
                allowComments: allowComments,
                body: req.body.body,
                file: filename
        
            });
        
            newPost.save().then(savedPost =>{
                req.flash('success_message', `Post ${savedPost.title} was created successfully`);
                res.redirect('/admin/posts');
            });

    }

});

router.get('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{
        res.render('admin/posts/edit', {post: post});
    });
    //Not found
});

// POST UPDATING



router.put('/edit/:id', (req, res)=>{
    console.log(req.params.id);

    Post.findOne({_id: req.params.id})

        .then(post=>{
            if(req.body.allowComments){
                allowComments = true;
            } else{
                allowComments = false;
            }

            //post.user = req.user.id;
            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;
            //post.category = req.body.category;


            if(!isEmpty(req.files)){

                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                post.file = filename;

                file.mv('./public/uploads/' + filename, (err)=>{

                    if(err) throw err;

                });

            }

            post.save().then(updatedPost=>{

                req.flash('success_message', 'Post was successfully updated');

                res.redirect('/admin/posts');
            });

        }).catch((err)=>{if(err) throw err});

});



router.delete('/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post => {

        
        fs.unlink(uploadDir + post.file, (err)=>{
            //Is this right??
            post.remove();
            //req.flash('sucess_message', 'Post was deleted');
            res.redirect('/admin/posts');

        });



    });
    //if not found
    //if not removed?
});


module.exports = router;