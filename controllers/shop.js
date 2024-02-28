const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error =>{
    console.log(error);
  });
  
};


exports.getProduct = (req,res,next) =>{
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product,fieldData])=> {
    //console.log(product,'product line 23 in shop.js controller')
    res.render('shop/product-detail',{product:product[0],pageTitle:product.title,path:'/products'})
  })
  .catch(error => {
    console.log(error);
  })
  

}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId
  Product.findById(prodId,(product => {
    Cart.addProduct(prodId,product.price);
  }))
  res.redirect('/cart')
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(error =>{
    console.log(error);
  });
  
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    console.log(cart,'cart in shop contoller')
    Product.fetchAll(products=>{
      let updatedcartArray=[]
      for(product of products){
        const updatedcart = cart.products.find(prod => prod.id===product.id);
        if(updatedcart){
          updatedcartArray.push({...product,qty:updatedcart.qty});
        }
      }
      console.log(updatedcartArray)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:updatedcartArray
      });
    })
  })
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postCartDelete=(req,res,next) => {
  console.log(req.body.productId,'productId in deleting cart in shop.js controller.');
  const productId = req.body.productId;
  Product.findById(productId,(product)=>{
    Cart.deleteProductFromCart(productId,product.price);
    res.redirect('/cart')
  })
}