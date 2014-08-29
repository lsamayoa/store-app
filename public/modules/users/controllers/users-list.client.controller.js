'use strict';

angular.module('users').controller('UsersListController', ['$scope', '$controller',
	function ($scope, $controller) {
		$controller('ListController', {$scope: $scope});
  	}
 ]);