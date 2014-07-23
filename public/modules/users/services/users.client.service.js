'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['Restangular',
	function(Restangular) {
		return Restangular.all('users');
		/*return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});*/
	}
]);