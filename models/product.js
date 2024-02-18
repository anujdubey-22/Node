
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');

function getFromFile(cb) {

    fs.readFile(p, (error,fileContent) => {
        if(error){
            console.log(error,'eroor in line 32 product model');
             cb([]);
        }
        else{
            let a=(JSON.parse(fileContent));
            //console.log(a,'line 35 in product model');
            cb(a);
        }
        
    });
};

module.exports = class Product {
    constructor(t){
        this.title = t
    }

    save(cb) {
        console.log(this,'this')
        
        console.log(p,'p in product model line 15')
        getFromFile((products) => {
            products.push(this);
            console.log(products);
            fs.writeFile(p,JSON.stringify(products), (error) => {
                console.log(error,'error in line 23');
                if(cb){
                    cb()
                }
            })
        });

        // fs.readFile(p,(error,fileContent) => {
        //     let products = [];
        //     if(!error){
        //         products = JSON.parse(fileContent);
        //     }
        //     products.push(this);
        //     console.log(products);
        //     fs.writeFile(p,JSON.stringify(products), (error) => {
        //         console.log(error,'error in line 23');
        //         if(cb){
        //             cb()
        //         }
        //     })
            
        // })
        
    }

    static fetchAll(cb) {
        getFromFile(cb);  
    };


};
