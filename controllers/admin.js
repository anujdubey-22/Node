const path = require('path');
const rootDir = require('../util/path');

exports.getAdmin=(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 2');
    
    res.sendFile(path.join(rootDir,'views','admin.html'));
}

exports.postAdmin=(req,res,next) =>{
    console.log(req.body);
    res.redirect('/shop')
}