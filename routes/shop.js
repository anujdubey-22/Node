const express = require('express');
const path=require('path');
const router = express.Router();


router.get('/',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 1');
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
});


module.exports = router