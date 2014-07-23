'use strict';

angular.module('clients').controller('ClientsListController', ['$scope', '$modal', '$q', 'toaster', 'Clients',
	function($scope, $modal, $q, toaster, Clients) {
		// Find a list of Clients
		$scope.find = function() {
			Clients.getList().then(function (clients) {
				$scope.clients = clients;
			});
		};

		// Remove existing Client
		$scope.remove = function(client) {
			client.remove().then(function () {
				for (var i in $scope.clients ) {
					if ($scope.clients [i] === client ) {
						$scope.clients.splice(i, 1);
					}
				}
			});
		};

		$scope.showRemove = function () {
			$modal
			.open({
				templateUrl: '/modules/clients/views/remove-client-modal.client.view.html',
				controller: ['$scope', '$modalInstance', function (scope, $modalInstance) {
					scope.client = angular.copy($scope.client);
			      	scope.ok = function () {
						$modalInstance.close(true);
					};
					scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
	      		}]
			})
			.result
			.then(function (shouldDelete) {
				if(shouldDelete){
					$scope.remove();
				}
			});
		};

		$scope.removeSelection = function () {
			var removePromises = _.map(angular.copy($scope.selection.items), function (userId) {
				Clients.one(userId).remove().then(function (response) {
					for (var i in $scope.users ) {
						var user = $scope.users[i];
						if (user != null && user._id === userId ) {
							$scope.users.splice(i, 1);
						}
					}
				});
			});

			$q.all(removePromises).then(function (values) {
				toaster.pop('success', 'Clients Deleted', 'Deleted ' + values.length + ' in total.', 5000);
			});
		};
	}
]);