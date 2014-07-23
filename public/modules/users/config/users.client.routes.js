'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		
		$stateProvider
		// Users state routing
		.state('users', {
			abstract: true,
			templateUrl: 'modules/users/views/users-layout.client.view.html',
			controller: 'UsersController'
		})
			.state('users.list', {
				url: '/users',
				templateUrl: 'modules/users/views/list-users.client.view.html',
				controller: 'UsersListController'
			})
			.state('users.create', {
				url: '/users/create',
				templateUrl: 'modules/users/views/create-user.client.view.html',
				controller: 'CreateUserController'
			})
			.state('users.show', {
				url: '/user/:userId',
				templateUrl: 'modules/users/views/view-user.client.view.html',
				controller: 'ShowUserController'
			})
			
			
		// Auth state routing
		.state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		})
		.state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/signin.client.view.html'
		});
	}
]);