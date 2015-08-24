angular.module('routes', []).config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
   $routeProvider.when('/', { templateUrl: 'views/home.html', controller: 'HomeController'});
   $routeProvider.when('/product', { templateUrl: 'views/product-detail.html', controller: 'ProductController'});
   $locationProvider.html5Mode(true);
}]);
