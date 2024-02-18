const express = require('express');
const app = express();
const Product = require('../models/product');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

// to add static path for css ...
// const cssFilePath = path.join(__dirname, '../public')
// console.log(cssFilePath,'cssfilepath')
// router.use(express.static(path.join(__dirname, '../public')));
// console.log((path.join(__dirname, '../public')),'2nd css file path')



exports.getAdmin=(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 2');
    
    res.sendFile(path.join(rootDir,'views','admin.html'));
}

exports.postAdmin=(req,res,next) =>{
    //console.log(req.body,'req.body.. admin/routes');
    const product =new Product(req.body.product);
    product.save(() =>{
        Product.fetchAll((products) => {
            console.log('products from line 18 in admin/routes',products,'products ..admin/routes');
            // Create a string to store the HTML for all the titles
             // Send the HTML string as the response
            //res.send(`<h3>${products}</h3>`)
            //console.log(products,'products in line 33 admin controller')
            res.redirect('/shop?products=' + JSON.stringify(products));
        })
    });

    
    
    
}