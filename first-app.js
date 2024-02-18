//const http = require('http');

const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');


const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusRoutes = require('./routes/contactus')


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);
app.use(contactusRoutes);

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname,'./','views','error.html'))
})

app.listen(3000);

// const server = http.createServer()

// server.listen(4000)
