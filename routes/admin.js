const express = require('express');

const router = express.Router();

const productcontroller = require('../controllers/admin')

// console.log(rootDir,'rootDir')
// console.log(path.join(__dirname,'../','views','admin.html'))
// console.log(path.join(rootDir,'views','admin.html'))

router.get('/add-product',productcontroller.getAdmin);

router.post('/product',productcontroller.postAdmin)

module.exports=router