var Product = require('./models/db.js');
module.exports = function(app){
    app.get('/api/products', function(req, res){
      Product.find(function(err, products){
        if(err || !products){
            res.json([]);
        }else{
          res.json(products);
        }
      });
    });
    app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });
};
