var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

module.exports = mongoose.model('Product', {
    pr_product_name: {type: String, required: true, unique: true},
    pr_description: {type: String, required: true},
    pr_img: [{type: String, required: true}],
    pr_price: String,
    pr_stock_remain: {type: Number, required:true, default: 1},
    pr_size: [{type: String, required: true}],
    pr_color: [{type: String}]
});
