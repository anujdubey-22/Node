const path=require('path');

exports.getShop=(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 1');
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
};

