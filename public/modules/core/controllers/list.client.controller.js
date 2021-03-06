/*global _:false */
'use strict';

angular.module('core').controller('ListController', ['$scope', '$q', '$modal', 'toaster',
	function ($scope, $q, $modal, toaster) {
		$scope.alerts = [];
		$scope.filter = null;
		$scope.selection = {};
		$scope.selection.items = [];
		$scope.allSelected = false;

		var modal = {
			templateUrl: '/modules/core/views/list/remove-selection-modal.client.view.html',
			controller: ['$scope', '$modalInstance', function (scope, $modalInstance) {
				scope.modelName = $scope.$datasource.baseName;
		      	scope.ok = function () {
					$modalInstance.close(true);
				};
				scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
      		}]
		};

		$scope.selectAll = function ($event) {
			var checkbox = $event.target;
  			if (checkbox.checked) {
  				$scope.selection.items = _.pluck($scope[$scope.$datasource.baseName], '_id');
  			}else{
  				$scope.selection.items = [];
  			}
  		};

  		$scope.showRemoveSelection = function () {
  			if($scope.selection.items.length > 0){
				$modal
				.open(modal)
				.result
				.then(function (sure) {
					if(sure) $scope.removeSelection();
				});
			}
		};

		$scope.removeSelection = function () {
			var removePromises = _.map(angular.copy($scope.selection.items), function (itemId) {
				return $scope.remove(itemId);
			});

			$q.all(removePromises).then(function (values) {
				toaster.pop('success', $scope.$datasource.baseName + ' Deleted', 'Deleted ' + values.length + ' in total.', 5000);
			});
		};
	}
]);