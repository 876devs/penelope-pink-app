angular.module('ProductCtrl', [])
.controller('ProductDetailController', ['$scope', '$routeParams','ProductFactory',
  function($scope, $routeParams, ProductFactory) {
    ProductFactory.show({id: $routeParams.id}, function(product){
      $scope.product = product;
    }, function(error){
      $scope.product = {};
    });

    $scope.order = {};
    $scope.order.or_quantity = 0;
    $scope.no_quantity = true;
    $scope.order_size = "";
    $scope.order_color = "";
    $scope.decreaseQty = function(){
      $scope.order.or_quantity = $scope.order.or_quantity - 1;
      if($scope.order.or_quantity <= 1)
        $scope.no_quantity = true;
    }

    $scope.selectedSize = function(size){
      if($scope.order.or_size){
        $scope.order.size = size;
      }
    }

    $scope.selectedColor = function(color){
      if($scope.order.or_color){
        $scope.order.color = color;
      }
    }
    $scope.increaseQty = function(){
      $scope.order.or_quantity = $scope.order.or_quantity + 1;
      $scope.no_quantity = false;
    }
    $scope.addToCart = function(){
      $scope.order.pr_product.push($scope.product._id);
      console.log($scope.order);
    }
}]);
