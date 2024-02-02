const http = require('http')

const server = http.createServer((req,res) => {

    //console.log(req.url, req.method, req.headers)
    const url = req.url

    if(url === '/home'){
        res.write('<html>');
        res.write('<head><title>WELCOME HOME</title><head>');
        res.write('<body><h1>WELCOME HOME</h1></body>');
        res.write('</html>');
        
        res.end();
    }
    else if( url === '/about' ){
        res.write('<html>');
        res.write('<head><title>About Page</title></head>');
        res.write('<body><h1>Welcome to About Us page</h1></body>')
        res.write('</html');
        
        res.end();
    }
    else if(url === '/node'){
        res.write('<html>');
        res.write('<head><title>Node Js project</title></head>');
        res.write('<body><h1>Welcome to my Node Js project</h1></body>');
        res.write('</html>');
        
        res.end();
    }
    else{
        res.write('<html>');
        res.write('<head>');
        res.write('<body><h1>HELLO</h1></body>');
        res.write('</html>');
        
        res.end();
    }
})

server.listen(4000)