const express = require('express');

const router = express.Router();


router.get('/',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 1');
    res.send('<h1>welcome to home</h1>');
});


module.exports = router