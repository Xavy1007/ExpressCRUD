const fs=require("fs");
exports.getAllProducts=(req, res) => {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`,"utf-8"));
    console.log(req.requestTime)
    res.status(200).json({
        status:"success",
        timeOfRequest:req.requestTime,
        result:products.length,
        data:{
            products,
        }
    });
}

exports.addProduct=(req, res) => {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`,"utf-8"));
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`,JSON.stringify(products));
    res.status(200).json({
        status:"success",
        result:products.length,
        data:{
            products,
        }
    });
}
exports.getProductById=(req, res) => {
    const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`,"utf-8"));
    console.log(req.params);
    const foundProduct=products.find(p => p.id == req.params.id);
    if (foundProduct){
        return res.status(200).json({
            status:"success",
            data:{
                product:foundProduct,
            }
        });
    }else{
        return res.status(404).json({
            status:"not found"
        });
    }
}
exports.updateProduct = (req,res) => {
      const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`,"utf-8"));
      let found = products.findIndex(p => p.id == req.params.id);
      if(found != -1){
          let product=products[found];
          product.name = req.body.name;
          product.price = req.body.price;
          product.category = req.body.category;
          products[found]= product
          fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
          res.status(200).json({
          status: "success",
          results: products.length,
          data:{
            product: products
          }
        });
      } else {
        res.status(404).json({
          status: "Product Not Found",
        });
      }
      }
exports.deleteProductById = (req,res) => {
        const products=JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`,"utf-8"));
        let newProduct = products.filter(p => p.id != req.params.id);
        /*console.log(products.length)
        console.log(newProduct.length)*/
        if(newProduct.length != products.length){
            fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(newProduct));
            res.status(200).json({
            status: "success",
            results: products.length,
            data:{
              product: products
            }
          });
        }else{
            res.status(404).json({
                status: "Product Not Found",
              });
        }
       
        }