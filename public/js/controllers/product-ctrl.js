angular.module('ProductCtrl', [])
.controller('ProductDetailController', ['$scope', '$routeParams','ProductFactory', 'OrderFactory',
  function($scope, $routeParams, ProductFactory, OrderFactory) {
    ProductFactory.show({id: $routeParams.id}, function(product){
      $scope.product = product;
    }, function(error){
      $scope.product = {};
    });

    $scope.order = {};
    $scope.order.or_quantity = 0;
    $scope.order_incomplete = true;
    $scope.quantity_selected = false;
    $scope.order.or_value = 0;
    $scope.order.pr_product = [];

    $scope.decreaseQty = function(){
      $scope.order.or_quantity = $scope.order.or_quantity - 1;
      if($scope.order.or_quantity <= 1)
        $scope.quantity_selected = false;

        calculateOrderValue();
    }

    $scope.increaseQty = function(){
      $scope.order.or_quantity = $scope.order.or_quantity + 1;
      $scope.quantity_selected = true;
      calculateOrderValue();
    }

    $scope.addToCart = function(){
    if($scope.order.or_quantity > 0 && $scope.order.hasOwnProperty('or_size') && $scope.order.hasOwnProperty('or_color') )
      {
          $scope.order.pr_product.push($scope.product._id);
          OrderFactory.create($scope.order, function(success){
            console.log('Order Created');
          }, function(error){
              console.log('Erorr');
          });
      }else {
        console.log('No Bueno')
      }
    }

    calculateOrderValue = function(){
        $scope.order.or_value = $scope.order.or_quantity * parseInt($scope.product.pr_price);
    }


}]);
