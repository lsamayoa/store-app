'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');

	// Setting up the Profile api
	app.route('/users/me')
		.get(users.me)
		.put(users.updateMe);
	app.route('/users/password').post(users.changePassword);

	var requiresOwn = users.hasAuthorization(['own']);
	
	// Setting up the AUTH api
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting up the Users api
	app.route('/users')
		.get(requiresOwn, users.list)
		.post( users.create);
	app.route('/users/:userId')
		.delete(requiresOwn, users.delete)
		.get(requiresOwn, users.read)
		.put(requiresOwn, users.update);

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};