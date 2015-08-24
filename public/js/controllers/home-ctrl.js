angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', 'ProductsFactory',
function($scope, ProductsFactory) {
  ProductsFactory.show(function(products){
    $scope.products = products;
  }, function(err){
    $scope.products = [];
  });
}]);
