var Product = require('../../models/db').Product;
var multer  = require('multer');
var upload = multer({ dest: './public/images/' });
var aws = require('aws-sdk');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

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

exports.sign = function(req, res){
  //console.log(req.query);
  //res.end();
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
  var s3 = new aws.S3();
  var s3_params = {
      Bucket: S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.send({data:return_data});
        }
    });
}
