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

services.factory('CreateProductFactory', function($resource){
  return $resource('/api/product',{},{
      create: { method: 'POST'}
  });
});

services.factory('OrderFactory', function($resource){
    return $resource('/api/order',{},{
        create: {method: 'POST'}
    });
})

services.factory('OrdersFactory', function($resource){
    return $resource('/api/orders',{},{
        query: {method: 'GET', isArray: true}
    });
})

services.factory('UserFactory', function($resource){
    return $resource('/api/users',{},{
      show: {method: 'POST', isArray: true}
    })
});
