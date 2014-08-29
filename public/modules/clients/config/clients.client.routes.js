'use strict';

//Setting up route
angular.module('clients').config(['$stateProvider', 'RestangularProvider',
	function($stateProvider, RestangularProvider) {
		// Clients state routing
		$stateProvider
		.state('clients', {
			templateUrl: 'modules/clients/views/clients-layout.client.view.html',
			controller: 'ClientsController'
		})
			.state('clients.list', {
				url: '/clients',
				templateUrl: 'modules/clients/views/list-clients.client.view.html',
				controller: 'ClientsListController'
			})
			.state('clients.show', {
				url: '/client/:clientId',
				templateUrl: 'modules/clients/views/view-client.client.view.html',
				controller: 'ShowClientController'
			})
			.state('clients.create', {
				url: '/clients/create',
				templateUrl: 'modules/clients/views/create-client.client.view.html',
				controller: 'CreateClientController'
			});

		RestangularProvider.setRestangularFields({
		  id: '_id'
		});
	}
]);