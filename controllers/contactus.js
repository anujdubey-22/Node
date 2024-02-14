const path = require('path');

exports.getContact = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','contactus.html'))
}

exports.postContact = (req,res,next) => {
    console.log(req.body);
    console.log('in success');
    res.send('<h2>Form successfuly filled</h2>')
    //res.redirect('/successdone')
}

