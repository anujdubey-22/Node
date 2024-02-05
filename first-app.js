const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res) => {

    //console.log(req.url, req.method, req.headers)
    const url = req.url
    const method=req.method
    //console.log(method)

    if(url==='/'){
        //res.setHeader('Content-Type','text/html')
        // let data=''
        // fs.readFile('Message.text',(error,data)=>{
        //     if (error){
        //         console.log(error)
        //     }
        //     else{
        //         console.log(data.toString(),'data console')
        //         data= data.toString();
        //     }
        // })
        async function read(){
            const fileData= await fs.promises.readFile('Message.text');
            const data = fileData.toString();
            console.log(data,'data')
            
            // res.write('<html>');
            // res.write('<head><title>WELCOME HOME</title><head>');
            // res.write('<body>  <form action="/message" method="Post"><label for="message">Message : </label><input type="text" placeholder="Type your Message Here" name="message"> <button>Send</button> </form> </body>');
            // res.write('</html>');
            // res.end();
            res.write('<html>');
            res.write('<head><title>WELCOME HOME</title><head>');
            res.write('<body>');
            res.write('<h4>Message to display:</h4>');
            res.write('<h5>' + data + '</h5>');
            res.write('<form action="/message" method="Post">');
            res.write('<label for="message">Message: </label>');
            res.write('<input type="text" placeholder="Type your Message Here" name="message">');
            res.write('<button>Send</button>');
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            res.end();

        }
        read()
        
    }
    
    
    if(url==='/message' && method==='POST'){
        const body=[]

        req.on('data',(chunks) => {
            console.log(chunks)
            body.push(chunks)
        })

        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('Message.text',message);
            //res.write(message);
             
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        })
        
    }
    
    //res.end() if we run this then this means we have send the response and it doesnot apply setHeader to lacation(/) and setstatusCode to 302 because the response is send to client .
})

server.listen(4000)