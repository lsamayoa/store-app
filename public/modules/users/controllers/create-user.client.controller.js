'use strict';

angular.module('users').controller('CreateUserController', ['$scope', 
	function($scope) {
		$scope.user = {}; 
		$scope.user.roles = [];

		$scope.createUser = function () {
			$scope.create($scope.user);
			$scope.user = {};
		};
	}
]);