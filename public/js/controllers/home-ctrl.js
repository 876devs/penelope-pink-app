angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', 'ProductsFactory',
function($scope, ProductsFactory) {
  ProductsFactory.query({limit: 8}, function(products){
    $scope.products = products;
  }, function(err){
    $scope.products = [];
  });
}]);
