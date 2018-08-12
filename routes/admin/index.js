const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    Post.count({}).then(postCount=>{
        Comment.count({}).then(commentCount=>{
            res.render('admin/index',{postCount: postCount, commentCount: commentCount});
        });
    });
});

router.post('/generate-fake-posts', (req, res)=>{

    for (let index = 0; index < req.body.amount; index++) {
        let post = new Post();

        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save().then(postSaved=>console.log(postSaved)).catch(err => {throw err});
    }
    res.redirect('/admin/posts');

});

module.exports = router;