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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then(([rows,fieldData])=>{
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
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
  Product.findById(productId,(product) => {
    if(product){
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product:product
      });
    }
    else{
      return res.redirect('/');
    }
  })
  
};


exports.postEditProduct=(req,res,next)=>{
  const productId = req.body.productId;
  const title = req.body.title ;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description ;
  const product =new Product(productId,title,imageUrl,description,price);
  product.save();
  return res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([product,fieldData]) => {
    res.render('admin/products', {
      prods: product,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(error => {
    console.log(error)
  });
};

exports.postDeleteProduct=(req,res,next) => {
  console.log(req.params.productId,'productid in admin controller');
  console.log(req.body,'delete product by id');
  const productId = req.params.productId // or we can use (req.body.productId);
  Product.deleteProduct(productId).then(([product,fieldData]) => {
    res.redirect('/admin/products');
  })
  .catch(error => {
    console.log(error);
  });
  

}