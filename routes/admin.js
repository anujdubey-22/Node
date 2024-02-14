const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

// console.log(rootDir,'rootDir')
// console.log(path.join(__dirname,'../','views','admin.html'))
// console.log(path.join(rootDir,'views','admin.html'))

router.use('/add-product',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 2');
    
    res.sendFile(path.join(rootDir,'views','admin.html'));
});

router.post('/product',(req,res,next) =>{
    console.log(req.body);
    res.redirect('/shop')
})

module.exports=router