const http = require('http')

const server = http.createServer((req,res) => {

    //console.log(req.url, req.method, req.headers)
    const url = req.url

    if(url === '/home'){
        res.write('Welcome home');
        res.end();
    }
    else if( url === '/about' ){
        res.write('Welcome to About Us page');
        res.end();
    }
    else if(url === '/node'){
        res.write('Welcome to my Node Js project');
        res.end();
    }
    else{
        res.write('Hello');
        res.end();
    }
})

server.listen(4000)