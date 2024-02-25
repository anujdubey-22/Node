const fs = require('fs');
const cart = require('./cart');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id){
      getProductsFromFile(products =>{
        
        const existingProductIndex = products.findIndex(prod =>{
          return prod.id===this.id;
        })
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProduct),err=>{
          console.log(err,'updating product');
        })
      })
    }
    else{
      this.id = Math.random().toString();
      getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      });
    }

    
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id===id);
      cb(product);
    })
  }

  static deleteProduct(productId){
    getProductsFromFile(products => {
      //console.log(productId,'  ',products)
      const productToDelete=products.find(prod=>prod.id===productId);
      const newProducts = products.filter(prod =>prod.id!==productId);
      //console.log(productToDelete,newProducts)
      fs.writeFile(p, JSON.stringify(newProducts),err => {
        console.log(err);

        cart.deleteProductFromCart(productId,productToDelete.price);
      }
      
      )
      
    })
  }

};

