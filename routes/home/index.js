const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res)=>{

    Post.find({}).then(posts => {
        res.render('home/index', {posts: posts});
    });

    //a missing catch error here

});
router.get('/about', (req, res)=>{

    res.render('home/about');

});
router.get('/login', (req, res)=>{

    res.render('home/login');

});
router.get('/register', (req, res)=>{

    res.render('home/register');

});

module.exports = router;