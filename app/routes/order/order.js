var Order = require('../../models/db').Order;

exports.getOrders = function(req, res){
  var no_records = req.query.limit || 8;
  Order
  .find()
  .sort({or_created_on: -1})
  .limit(no_records)
  .populate('pr_product')
  .exec(function(err, orders){
    if(err || !orders){
          res.send([]);
      }else{
        res.send(orders);
        console.log(orders);
      }
  });
}

exports.createOrder = function(req, res){
  var order = new Order(req.body);
  order.save(function(err){
    if(err){
      res.send({message: 'DB Error. Could not create order.'})
    }else{
      res.send({message: 'Order Created'});
    }
  });
}
