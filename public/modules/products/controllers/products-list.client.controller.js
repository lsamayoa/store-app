'use strict';

angular.module('products').controller('ProductsListController', ['$scope', '$modal', 'Products',
	function($scope, $modal, Products) {
		// Find a list of Products
		$scope.find = function() {
			Products.getList().then(function (products) {
				$scope.products = products;
			});
		};

		// Remove existing Client
		$scope.remove = function(product) {
			product.remove().then(function () {
				for (var i in $scope.products ) {
					if ($scope.products [i] === product ) {
						$scope.products.splice(i, 1);
					}
				}
			});
		};

		$scope.showRemove = function () {
			$modal
			.open({
				templateUrl: '/modules/products/views/remove-product-modal.product.view.html',
				controller: ['$scope', '$modalInstance', function (scope, $modalInstance) {
					scope.product = angular.copy($scope.product);
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
	}
]);