'use strict';

// Clients controller
angular.module('clients').controller('ShowClientController', ['$scope', '$stateParams', '$modal',
	function($scope, $stateParams, $modal ) {		
		$scope.showOne = function() {
			$scope.findOne($stateParams.clientId);
		};

		$scope.alerts = [];
		var amountModal = {
	      templateUrl: '/modules/clients/views/amount-modal.client.view.html',
	      controller: ['$scope', '$modalInstance', function (scope, $modalInstance) {
	      	scope.input = {};
	      	scope.ok = function () {
				$modalInstance.close(scope.input.creditAmount);
			};
			scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
	      }]
	    };

	    $scope.showAddCredit = function () {
			$modal.open(amountModal)
				.result
				.then(function (amount) {
			    	$scope.addCredit(amount);
			    });
		};

		$scope.showDoDebit = function () {
			$modal.open(amountModal)
				.result
				.then(function (amount) {
			    	$scope.doDebit(amount);
			    });
		};


		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
	}
]);