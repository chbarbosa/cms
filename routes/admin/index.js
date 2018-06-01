const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    res.render('admin/index');
});

router.post('/generate-fake-posts', (req, res)=>{

    for (let index = 0; index < param.body.amount; index++) {
        
        
    }

});

module.exports = router;