var Product = require('../../models/db').Product;
var multer  = require('multer');
var upload = multer({ dest: './public/images/' });

exports.getProducts = function(req, res){
  var no_records = req.query.limit || 8;
  Product
  .find({pr_stock_remain: {$gt: 0}})
  .sort({pr_created_on: -1})
  .limit(no_records)
  .exec(function(err, products){
    if(err || !products){
          res.send([]);
      }else{
        res.send(products);
      }
  });
};

exports.getProduct = function(req, res){
  Product.findById(req.params.id, function(err, product){
    if(err || !product){
        res.send([]);
    }else{
      res.send(product);
    }
  });
};

exports.createProduct = function(req, res){
  var product = new Product(req.body);
  for(i in req.files){
    product.pr_img.push(req.files[i].filename);
  }
  product.save(function(err){
    if(err){
      res.send({message: 'Product not created'});
    }else{
      res.send({message: 'Product created'});
    }
  });
};
