var express = require('express');
var router = express.Router();
var Order = require('./order');

router.get('/orders', Order.getOrders);
router.post('/order', Order.createOrder);

module.exports = router;
