'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider
		.state('products', {
			templateUrl: 'modules/products/views/products-layout.client.view.html',
			controller: 'ProductsController'
		})
			.state('products.list', {
				url: '/products',
				templateUrl: 'modules/products/views/list-products.client.view.html'
			})
			.state('products.create', {
				url: '/products/create',
				templateUrl: 'modules/products/views/create-product.client.view.html'
			})
			.state('products.show', {
				url: '/products/:productId',
				templateUrl: 'modules/products/views/view-product.client.view.html'
			});
	}
]);