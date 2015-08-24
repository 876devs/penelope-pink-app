angular.module('routes', []).config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
   $routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'HomeController'});
   $routeProvider.when('/product/:id', { templateUrl: 'views/product_detail.html', controller: 'ProductDetailController'});
   $routeProvider.when('/login', { templateUrl: 'views/login.html', controller: 'LoginController'});
   $routeProvider.when('/admin', { templateUrl: 'views/admin.html', controller: 'AdminController'});
   $locationProvider.html5Mode(true);
}]);
