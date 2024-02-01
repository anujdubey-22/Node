const http = require('http')

const server = http.createServer((req,res) => {
    //console.log(req.url, req.method, req.headers)
    res.write('Hello in the world of node.js')
    res.end()
})

server.listen(4000)