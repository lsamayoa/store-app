'use strict';

angular.module('users').controller('ShowUserController', ['$scope', '$stateParams', 
	function($scope, $stateParams) {
		// We do it this way to get this route $stateParams instead of the parent's $stateParams
		$scope.showOne = function() {
			$scope.findOne($stateParams.userId);
		};
	}
]);