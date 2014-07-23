'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var clients = require('../../app/controllers/clients');

	var requiresManageClients = users.hasAuthorization(['manageClients']);
	var requiresManageCredit = users.hasAuthorization(['manageCredit']);

	// Clients Routes
	app.route('/clients')
		.get(clients.list)
		.post(users.requiresLogin, clients.create);


	app.route('/clients/:clientId')
		.get(users.requiresLogin, clients.read)
		.put(users.requiresLogin, clients.update)
		.delete(requiresManageClients, clients.delete);

	app.route('/clients/:clientId/credit')
		.get(requiresManageCredit, clients.doCredit);
	app.route('/clients/:clientId/debit')
		.get(requiresManageCredit, clients.doDebit);
	// Finish by binding the Client middleware
	app.param('clientId', clients.clientByID);
};