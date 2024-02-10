const express = require('express');

const router = express.Router();

router.use('/add-product',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 2');
    res.send('<form action="/admin/product" method="POST"><input type="text" name="product"><input type="text" name="size" ><button type="submit">Send</button></form');
});

router.post('/product',(req,res,next) =>{
    console.log(req.body);
    res.redirect('/shop')
})

module.exports=router