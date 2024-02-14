const express = require('express');

const path = require('path');

const router = express.Router();

router.use('/contactus',(req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','contactus.html'))
});

router.post('/success',(req,res,next) => {
    console.log(req.body);
    console.log('in success');
    res.send('<h2>Form successfuly filled</h2>')
    //res.redirect('/successdone')
})

module.exports=router;
