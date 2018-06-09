const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isEmpty } = require('../../helpers/upload-helper');

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
    let filename = 'bmw z4.png';
    if (!isEmpty(req.files)) {        
        let file = req.files.file;
        filename = file.name;
    
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
        res.redirect('/admin/posts');
    });
});

router.get('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{
        res.render('admin/posts/edit', {post: post});
    });
    //Not found
});

router.put('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post=>{

        if(req.body.allowComments){
            post.allowComments = true;
        } else{
            post.allowComments = false;
        }

        //post.user = req.user.id;
        post.title = req.body.title;
        post.status = req.body.status;
        //post.allowComments = allowComments;
        post.body = req.body.body;
        //post.category = req.body.category;

        post.save().then(updatedPost=>{
            res.redirect('/admin/posts');
        });
        //If not saved?
    });
    //Not found
});



router.delete('/:id', (req, res)=>{
    Post.remove({_id: req.params.id}).then(result => {
        res.redirect('/admin/posts');
    });
    //if not found
    //if not removed?
});


module.exports = router;