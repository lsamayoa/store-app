'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$controller', 'Products',
	function ($scope, $controller, Products) {
		$controller('CrudController', { $scope: $scope, $datasource: Products});
	}
]);