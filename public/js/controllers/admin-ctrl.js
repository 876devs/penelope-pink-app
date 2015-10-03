angular.module('AdminCtrl', [])
.controller('AdminController', ['$scope', '$http', 'ProductsFactory', 'OrdersFactory',
 function($scope, $http, ProductsFactory, OrdersFactory) {
    function loadProducts(){
      ProductsFactory.query({limit: 0}, function(products){
          $scope.products = products;
        }, function(error){
        $scope.products = [];
      });
    };

    OrdersFactory.query({limit: 0}, function(orders){
      $scope.orders = orders;
    },function(error){
      $scope.orders = [];
    });


  loadProducts();
  $scope.file_upload = false;
  $scope.selectedsizes = [];
  $scope.stock = [];
  $scope.itemAdded = false;
  $scope.addProduct = false;
  $scope.submitting = false;
  $scope.button_text = 'Add Product';
  $scope.files = [];
  $scope.product = {};
  $scope.product.pr_stock_details = [];
  $scope.sizes = ['XL', 'SM'];
  $scope.colors = ['Blue', 'White'];
  $scope.categories = ['Dress'];
  $scope.status = ['Pending', 'Delivered', 'Cancelled'];
  $scope.orders =

  toggleBtn = function(){
    $scope.addProduct = !$scope.addProduct;
    if($scope.button_text === 'Add Product'){
      $scope.button_text = 'Show Products';
    }else{
      $scope.button_text = 'Add Product';
    }
  }

  $scope.setAddmore = function(){
    var num = parseInt($scope.product.pr_stock_remain);
    if(num === 1 || isNaN(num)){
        $scope.addMore = false;
        $scope.col_size = "col-md-4";
    }else if(num > 1){
      $scope.addMore = true;
      $scope.col_size = "col-md-2";
    }
  }

  $scope.addStock = function(){
    $scope.itemAdded = true;
    $scope.item = {st_size: $scope.product.pr_size, st_color: $scope.product.pr_color, st_quantity: $scope.product.pr_stock_remain};
    $scope.product.pr_stock_details.push($scope.item);
  }

  $scope.removeStock = function(index_of_stock){
      $scope.product.pr_stock_details.splice(index_of_stock,1);
      if($scope.product.pr_stock_details.length === 0){
        $scope.itemAdded = false;
      }
  }

  $scope.showProductForm = function(){
      toggleBtn();
  };

  $scope.updateOrder = function(order){
    console.log(order);
  };

  $scope.saveProduct = function(){
        $scope.submitting = true;
        var params = {file_type:"jpg"}
        $http({
              url: '/api/sign_s3',
              method: "GET",
              params: params
        }).success(function(response){
          $scope.product.pr_img = response.data.url;
          //Upload file now
          $http({
              url: response.data.signed_request,
              method: "PUT",
              headers: {'Content-Type':params.file_type},
              data: $scope.files[0]
          }).success(function(response){

            $http({ url: '/api/product', data:$scope.product, method: 'POST'})
            .success(function(response){ console.log('Product created');})
            .error(function(response){ console.log('Product not created');});
              resetForm();
              toggleBtn();
              loadProducts();
              $scope.file_upload = false;
         })
          .error(function(error){
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
