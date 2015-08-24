var Product = require('./models/db.js');
module.exports = function(app){
    app.get('/api/products', function(req, res){
      Product.find(function(err, products){
        if(err || !products){
            res.send([]);
        }else{
          res.send(products);
        }
      });
    });

    app.get('/api/product/:id', function(req, res){
      Product.findById(req.params.id, function(err, product){
        if(err || !product){
            res.send([]);
        }else{
          res.send(product);
        }
      });
    });

    app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};
