var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var product_routes = require('./app/routes/product/product_routes');
var index_route = require('./app/routes/index');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.use('/api', product_routes);
app.use('/', index_route);

app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app;
