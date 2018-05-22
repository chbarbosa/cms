const express = require('express');
const router = express.Router();
const post = require('../../models/Post');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    res.send('It works');
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    let allowComments = false;

    if (req.body.allowComments) {
        allowComments = true;
    }

    Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body

    });
    console.log(req.body);
});

module.exports = router;