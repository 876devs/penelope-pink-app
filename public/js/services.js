var services = angular.module('app.services',['ngResource']);

services.factory('ProductsFactory', function($resource){
  return $resource('/api/products',{},{
      query: { method: 'GET', isArray: true}
  });
});

services.factory('ProductFactory', function($resource){
  return $resource('/api/product/:id',{},{
      show: { method: 'GET', params: {id: '@id'}}
  });
});
