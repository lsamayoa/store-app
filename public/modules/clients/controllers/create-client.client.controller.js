'use strict';

angular.module('clients').controller('CreateClientController', ['$scope', 
	function($scope) {
		$scope.client = {}; 
		$scope.client.emails = [];

		$scope.createClient = function () {
			$scope.create($scope.client);
			$scope.client = {};
		};
	}
]);