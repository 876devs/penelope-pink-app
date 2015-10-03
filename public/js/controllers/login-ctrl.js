angular.module('LoginCtrl', ['ngMessages'])
.controller('LoginController', ['$scope', '$location', 'UserFactory',function($scope, $location, UserFactory) {

  $scope.submit = function(){

    UserFactory.show({username: "tremaine", password: "Jamaica1@"}, function(success){
        console.log(success);
        $location.url('/admin/orders');
    }, function(error){
        console.log('Error');
    });
  };
}]);
