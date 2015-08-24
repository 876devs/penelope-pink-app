angular.module('AdminCtrl', [])
.controller('AdminController', ['$scope', function($scope) {
  $scope.status = ['Pending', 'Delivered', 'Cancelled'];
  $scope.orders = [{ or_date: "June 23, 2015",
                    or_name: "First",
                    or_contact: "8764477877",
                    or_product:"Black Frock",
                    or_size: "X",
                    or_status: "Pending"},
                    { or_date: "June 23, 2015",
                      or_name: "second",
                      or_contact: "8764477877",
                      or_product:"Black Frock",
                      or_size: "X",
                      or_status: "Pending"},
                    { or_date: "June 23, 2015",
                      or_name: "third",
                      or_contact: "8764477877",
                      or_product:"Black Frock",
                      or_size: "X",
                      or_status: "Pending"}];

  $scope.updateOrder = function(order){
    console.log(order);
  };
}]);
