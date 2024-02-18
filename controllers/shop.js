const path=require('path');

exports.getShop=(req,res,next) => {
    //res.send('<h1>welcome to home</h1>')
    console.log('in the middleware 1');

    const products = JSON.parse(req.query.products);

    

    //console.log(products,'shop req.body line 6');


    let html = '';
        html += `<link rel="stylesheet" type="text/css" href="/css/main.css"`;
        // Iterate over the products array

        html += `
        <body>
        <header class="main-header">
            <nav class="main-header__nav">
            <ul class="main-header__item-list">
                <li class="main-header__item"><a href="/admin/add-product">Add-product</a></li>
                <li class="main-header__item"><a class="active" href="/shop">Shop</a></li>
                <li class="main-header__item"><a href="/contactus">Contact Us</a></li>
            </ul>
            </nav>
        </header>

        <main>`;
        for (let i = 0; i < products.length; i++) {
        // Concatenate the title of each product to the HTML string
        html += `<h3>${products[i].title}</h3>`;
        }
        html += `</main>
        </body>`;
            
        res.send(html);




    //res.sendFile(path.join(__dirname,'../','views','shop.html'));

};

