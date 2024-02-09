//const http = require('http');

const express = require('express');

const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use('/add-product',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 2');
    res.send('<form action="/product" method="POST"><input type="text" name="product"><input type="text" name="size" ><button type="submit">Send</button></form');
});

app.use('/product',(req,res,next) =>{
    console.log(req.body);
    res.redirect('/')
})

app.use('/',(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 1');
    res.send('<h1>welcome to home</h1>');
});

app.listen(4000);

// const server = http.createServer()

// server.listen(4000)
