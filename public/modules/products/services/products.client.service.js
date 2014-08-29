'use strict';

//Products service used to communicate Products REST endpoints
angular.module('products').factory('Products', ['Restangular',
	function(Restangular) {
		return Restangular.all('products');
	}
]);