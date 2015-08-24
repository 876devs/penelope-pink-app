angular.module('routes', []).config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
   $routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'HomeController'});
   $routeProvider.when('/product/:id', { templateUrl: 'views/product_detail.html', controller: 'ProductDetailController'});
   $locationProvider.html5Mode(true);
}]);
