var express = require('express');
var router = express.Router();
var Product = require('./product');
var multer  = require('multer');
var upload = multer({ dest: './public/images/' });

router.get('/products', Product.getProducts);
router.get('/product/:id', Product.getProduct);
router.post('/product', upload.array('image'), Product.createProduct);

module.exports = router;
