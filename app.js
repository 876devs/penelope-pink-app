var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    passport = require('passport'),
    session = require('express-session'),
    product_routes = require('./app/routes/product/product_routes'),
    index_route = require('./app/routes/index'),
    order_routes = require('./app/routes/order/order_routes'),
    user_route = require('./app/routes/users');
    port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
//Remember to place the new routes above the index_route
app.use('/api', user_route);
app.use('/api', product_routes);
app.use('/api', order_routes);
app.use('/', index_route);


app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;
