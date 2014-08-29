'use strict';

angular.module('products').controller('ProductsListController', ['$scope', '$controller',
	function($scope, $controller) {
		$controller('ListController', { $scope: $scope });
	}
]);