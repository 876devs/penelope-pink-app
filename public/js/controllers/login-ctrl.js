angular.module('LoginCtrl', ['ngMessages'])
.controller('LoginController', ['$scope', '$location', function($scope, $location) {
  $scope.submit = function(){
    $location.url('/admin');
  };
}]);
