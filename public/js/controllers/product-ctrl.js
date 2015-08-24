angular.module('ProductCtrl', [])
.controller('ProductDetailController', ['$scope', '$routeParams','ProductFactory',
  function($scope, $routeParams, ProductFactory) {
    ProductFactory.show({id: $routeParams.id}, function(product){
      $scope.product = product;
    }, function(error){
      $scope.product = {};
    });
}]);
