'use strict';

// $datasource controller
angular.module('core').controller('CrudController', ['$scope', '$state', '$datasource',
	function($scope, $state, $datasource) {
		var baseName = $datasource.route,
			singularName = inflection.singularize(baseName),
			paramName = singularName+'Id';
		
	
		$scope.find = function() {
			return $datasource.getList().then(function (items) {
				$scope[baseName] = items;
			});
		};

		$scope.findOne = function(itemId) {
			return $datasource.get(itemId).then(function (item) {
				$scope[singularName] = item;	
			});
		};

		$scope.create = function(user) {
			return $datasource.post(user).then(function(response) {
				var stateParams = {};
				stateParams[paramName] = response._id;
				$state.go(baseName + '.show', stateParams);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(itemId) {
			if (itemId) { 
				return $datasource.one(itemId).remove().then(function (response) {
					for (var i in $scope[baseName] ) {
						var item = $scope[baseName][i];
						if (item != null && item._id === itemId ) {
							$scope[baseName].splice(i, 1);
						}
					}
					return response;
				});
			} else {
				return $scope[singularName].remove().then(function(response) {
					$state.go(baseName);
					return response;
				});
			}
		};	
	}
]);