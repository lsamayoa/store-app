'use strict';

angular.module('clients').controller('ClientsListController', ['$scope', '$controller',
	function ($scope, $controller) {
		$controller('ListController', { $scope: $scope });
	}
]);