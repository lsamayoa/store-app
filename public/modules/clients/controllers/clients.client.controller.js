'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Clients',
	function($scope, $stateParams, $location, Clients ) {
		// Create new Client
		$scope.create = function() {
			// Create new Client object
			var clientData = {
				firstName: this.firstName,
				lastName: this.lastName,
				emails: this.emails
			};

			// Redirect after save
			Clients.post(clientData).then(function(response) {
				$location.path('client/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.firstName = '';
			this.lastName = '';
		};

		// Remove existing Client
		$scope.remove = function(client) {
			if ( client ) { 
				client.remove().then(function () {
					for (var i in $scope.clients ) {
						if ($scope.clients [i] === client ) {
							$scope.clients.splice(i, 1);
						}
					}
				});
			} else {
				$scope.client.remove().then(function() {
					$location.path('clients');
				});
			}
		};

		// Update existing Client
		$scope.update = function() {
			var client = $scope.client ;

			client.put().then(function() {
				$location.path('client/' + client._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Find existing Client
		$scope.findOne = function() {
			Clients.get($stateParams.clientId).then(function (client) {
				$scope.client = client;	
			});
		};

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