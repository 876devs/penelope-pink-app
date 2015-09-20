angular.module('AdminCtrl', [])
.controller('AdminController', ['$scope', '$http', 'ProductsFactory',
 function($scope, $http, ProductsFactory) {
    function loadProducts(){
      ProductsFactory.query({limit: 0}, function(products){
          $scope.products = products;
      }, function(error){
        $scope.products = [];
      });
    };

    loadProducts();


  $scope.addProduct = false;
  $scope.button_text = 'Add Product';
  $scope.files = [];
  $scope.product = {};
  $scope.sizes = ['XL'];
  $scope.colors = ['blue'];
  $scope.categories = ['Dress'];
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

  function toggleBtn(){
    $scope.addProduct = !$scope.addProduct;
    if($scope.button_text === 'Add Product'){
      $scope.button_text = 'Show Products';
    }else{
      $scope.button_text = 'Add Product';
    }
  }

  $scope.showProductForm = function(){
      toggleBtn();
  };

  $scope.updateOrder = function(order){
    console.log(order);
  };

  $scope.saveProduct = function(){
    var formData = new FormData();
        // for (var i in $scope.files) {
        //     formData.append("image", $scope.files[i]);
        // }
        // for(var key in $scope.product)
        // {
        //   formData.append(key, $scope.product[key]);
        // }
        // $http({ url: '/api/product', data:$scope.product, method: 'POST'})
        // .success(function(response){ console.log('Sent');})
        // .error(function(response){ console.log('No bueno');});

        var params = {file_type:"jpg"}
        $http({
              url: '/api/sign_s3',
              method: "GET",
              params: params
        }).success(function(response){
          //Upload file now
          $http({
              url: response.data.signed_request,
              method: "PUT",
              headers: {'Content-Type':params.file_type},
              data: $scope.files[0]
          }).success(function(response){
            $scope.product.pr_img = response.data.url;
            $http({ url: '/api/product', data:$scope.product, method: 'POST'})
            .success(function(response){ console.log('Product created');})
            .error(function(response){ console.log('Product not created');});
              resetForm();
              toggleBtn();
              loadProducts();
          }).error(function(error){
            console.log('File not upoaded');
            console.log(error);
          })
        }).error(function(error){ console.log('Error with s3'); });
  };

  function resetForm(){
    $scope.product = {};
    $scope.files = [];
  };

  $scope.cancel = function(){
     resetForm();
  };

  $scope.setFiles = function(element){
    for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
  };

}]);
