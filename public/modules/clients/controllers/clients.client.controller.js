'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$controller', 'Clients',
	function($scope, $controller, Clients ) {
		$controller('CrudController', {$scope: $scope, $datasource: Clients});

		// Adds credit to existing Client
		$scope.addCredit = function (creditAmount, clientId) {
			var client = $scope.client;
			if(clientId) client = Clients.one(clientId);
			client
				.customGET('credit', {amount: creditAmount})
				.then(function (response) {
					$scope.findOne();
				}, function (err) {
					$scope.alerts.push({
						type: 'danger',
						msg: err.data.message
					});
				});
		};

		$scope.doDebit = function (creditAmount, clientId) {
			var client = $scope.client;
			if(clientId) client = Clients.one(clientId);
			client
				.customGET('debit', {amount: creditAmount})
				.then(function (response) {
					$scope.findOne();
				}, function (err) {
					$scope.alerts.push({
						type: 'danger',
						msg: err.data.message
					});
				});
		};

	}
]);