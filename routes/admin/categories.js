const express = require('express');
const router = express.Router();
const faker = require('faker');
const Category = require('../../models/Category');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    res.render('admin/categories/index');
});

router.post('/create', (req, res)=>{
    const newCategory = new Category({
        name: req.body.name
    });
    newCategory.save().then(savedCategory=>{
        res.render('admin/categories/index');
    });
    //No error treatment
});


module.exports = router;