const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});


module.exports = Cart;

















// const fs = require('fs');
// const { totalmem } = require('os');
// const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json')


// module.exports= class Cart{
//     static addProduct(id,productPrice){
//         //console.log(productPrice,'productPrice');
//         fs.readFile(p,(error,filecontent) => {
//             let cart = { products: [],totalPrice: 0};
//             if(!error){
//                 cart=JSON.parse(filecontent);
//             }

//             const existingProductIndex = cart.products.findIndex(prod => prod.id===id);
//             const existingProduct=cart.products[existingProductIndex];

//             let updatedProduct;

//             if(existingProduct){
//                 updatedProduct = { ...existingProduct };
//                 updatedProduct.qty = updatedProduct.qty+1 ;
//                 cart.products = [...cart.products] ;
//                 cart.products[existingProductIndex] = updatedProduct;
//             }
//             else{
//                 updatedProduct ={id:id,qty:1};  
//                 cart.products =[...cart.products,updatedProduct];
//             }
//             productPrice=parseInt(productPrice);
//             //console.log(typeof productPrice);
//             cart.totalPrice = parseInt(cart.totalPrice) + (productPrice);
//             fs.writeFile(p,JSON.stringify(cart),err => {
//                 console.log(err,'error in cart adding');
//             })
//         })
//     }

//     static deleteProductFromCart(id,productPrice){
//         fs.readFile(p,(error,filecontent)=>{
//             if(error){
//                 console.log(error,'error in reading cart.json');
//             }
//             else{
//                 let item = JSON.parse(filecontent);
//                 console.log('item ->',item,'item')
//                 let deleteItem = item.products.find(prod => prod.id===id);
//                 if (deleteItem){
//                     item.totalPrice=item.totalPrice -(productPrice*deleteItem.qty);
//                     let updatedcart=item.products.filter(prod => prod.id!==id);
//                     updatedcart = { products: updatedcart, totalPrice: item.totalPrice };
//                     fs.writeFile(p,JSON.stringify(updatedcart),err=> {
//                         console.log(err,'error in writing file cart.json after deleting');

//                     })
//                 }
                
//             }
            
//         })
//     }

//     static getCart(cb){
//         fs.readFile(p,(error,filecontent)=>{
//             if(error){
//                 console.log(error,'error in getting cart in cart.js');
//                 cb([]);
//             }
//             else{
//                 const cartItem=JSON.parse(filecontent);
//                 console.log(cartItem,'cartItem in cart.js')
//                 cb(cartItem);
//             }
//         })
//     }

// }
