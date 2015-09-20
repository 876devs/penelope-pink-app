var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGOLAB_URI);

var StockSchema = new Schema({
  st_size: {type: String, required: true},
  st_color: {type: String, required: true},
  st_quantity: {type: String, required: true}
});

var ProductSchema = new Schema({
  pr_product_name: {type: String, required: true, unique: true},
  pr_description: {type: String, required: true},
  pr_img: [{type: String, required: true}],
  pr_price: String,
  pr_stock_remain: {type: Number, required:true, default: 1},
  pr_category: [String],
  pr_created_on: {type: Date, default: Date.now},
  pr_stock_details: [StockSchema]
});

exports.Product = mongoose.model('Product', ProductSchema);
exports.Stock = mongoose.model('Stock', StockSchema);

// module.exports = mongoose.model('User', {
//     us_password: {type: String, required: true},
//     us_email: {type: String, required: true},
//     us_created: {type: Date, default: Date.now}
// });
