'use strict';

//Clients service used to communicate Clients REST endpoints
angular.module('clients').factory('Clients', ['Restangular',
	function(Restangular) {
		return Restangular.all('clients');
	}
]);