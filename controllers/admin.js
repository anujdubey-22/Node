const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {



  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  //console.log(req.user,'req.user in app.js controller')
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  }).then(result => {
    //console.log(result.product)
    res.redirect('/admin/products')
  })
  .catch(error => {
    console.log(error)
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);
  if(!editMode){
    console.log('editmode',editMode)
    return res.redirect('/')
  }
  const productId = req.params.productId;
  req.user.getProducts( { where: { id: productId}})
  //Product.findByPk(productId)
  .then(products =>{
    const product = products[0]
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product:product
    });
  })
  .catch(error => {
    console.log(error);
  });

  // Product.findByPk(productId,(product) => {
  //   if(product){
      
  //   }
  //   else{
  //     return res.redirect('/');
  //   }
  // })
  
};


exports.postEditProduct=(req,res,next)=>{
  const productId = req.body.productId;
  const title = req.body.title ;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description ;
  Product.update({ title, price,imageUrl, description}, {
    where: {
      id: productId
    }
  }).then((result)=> {
    //  console.log(result,'result in admin controller updating database')
    return res.redirect('/admin/products');})
  .catch(error => {
    console.log(error)
  })
  
}


exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  //Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(error => {
    console.log(error);
  });
};

exports.postDeleteProduct=(req,res,next) => {
  console.log(req.params.productId,'productid in admin controller');
  //console.log(req.body,'delete product by id');
  const productId = req.params.productId // or we can use (req.body.productId);
  Product.destroy( {
    where: {
      id: productId
    }
  }).then(result => {
    console.log(result,'result in admin controller in deleting entries in database');
    res.redirect('/admin/products');
  })
  .catch(error => {
    console.log(error);
  })
}