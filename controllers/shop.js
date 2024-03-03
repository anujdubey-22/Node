const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(result => {
    console.log(result,'result in getting product in shop controller');
    res.render('shop/product-list', {
      prods: result,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error => {
    console.log(error);
  })
};


exports.getProduct = (req,res,next) =>{
  //console.log(req,'req...........................')
  const prodId = req.params.productId;
console.log(prodId,'prodID')
  // Product.findAll({where:{id:prodId}}).then(products => {
  //   console.log(products)
  //   res.render('shop/product-detail',{product:products[0],pageTitle:products[0].title,path:'/products'})
  // }).catch(error => {
  //   console.log
  // })

  if (isNaN(prodId)) {
    console.log('Invalid product ID');
    return res.send('Invalid product ID');
  } else {
    Product.findByPk(prodId).then(product=> {
      res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})
    }).catch(error => {
      console.log(error);
    })
  }

  // Product.findByPk(prodId).then(product=> {
  //   //console.log(product,'product line 23 in shop.js controller')
  //   res.render('shop/product-detail',{product:product,pageTitle:product.title,path:'/products'})
  // })
  // .catch(error => {
  //   console.log(error);
  // })
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));

    // Product.findById(prodId,(product => {
  //   Cart.addProduct(prodId,product.price);
  // }))
  // res.redirect('/cart')
};

  


exports.getIndex = (req, res, next) => {
  Product.findAll().then(result => {
    //console.log(result,'result in getting product in shop controller');
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(error => {
    console.log(error);
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    //console.log(cart);
    return cart.getProducts().then(products => {
        res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:products
      });
    }).catch(error => console.log(error,'error in line 82 in shop controller'));
  })
  .catch(error => console.log(error,'error in line 84 in shop controller'));


  // Cart.getCart(cart=>{
  //   console.log(cart,'cart in shop contoller')
  //   Product.fetchAll(products=>{
  //     let updatedcartArray=[]
  //     for(product of products){
  //       const updatedcart = cart.products.find(prod => prod.id===product.id);
  //       if(updatedcart){
  //         updatedcartArray.push({...product,qty:updatedcart.qty});
  //       }
  //     }
  //     console.log(updatedcartArray)
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products:updatedcartArray
  //     });
  //   })
  // })
  
};


exports.postOrder = (req,res,next) => {
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart=cart;
    return cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
      );
    })
    .catch(error => console.log(error));
  })
  .then(result => {
    return fetchedCart.setProducts(null);
    
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(error => console.log(error));
}


exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
  })
  .catch(error => {
    console.log(error);
  })
  
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
  req.user.getCart()
  .then(cart => {
    return cart.getProducts( { where: {id: productId}});
  })
  .then(products => {
    console.log(products,products[0],'products in shop controller')
    const product = products[0]
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart')
  })
  .catch(error => {
    console.log(error);
  })

  // Product.findById(productId,(product)=>{
  //   Cart.deleteProductFromCart(productId,product.price);
  //   res.redirect('/cart')
  // })
}