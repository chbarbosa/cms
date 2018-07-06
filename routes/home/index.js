const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res)=>{

    Post.find({}).then(posts => {
        Category.find({}).then(categories => {
            res.render('home/index', {posts: posts, categories: categories});
        });
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
router.post('/register', (req, res)=>{

    const newUser = new User({
        firstName: req.body.firstname,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    res.send('home/register');

});
router.get('/post/:id', (req, res)=>{

    Post.findOne({_id: req.params.id})
    .then(post => {

        Category.find({}).then(categories => {
            res.render('home/post', {post: post, categories: categories});
        });
    });

});

module.exports = router;