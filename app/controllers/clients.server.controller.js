'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Client = mongoose.model('Client'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Client already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Client
 */
exports.create = function(req, res) {
	var client = new Client(req.body);
	client.user = req.user;

	client.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};

/**
 * Show the current Client
 */
exports.read = function(req, res) {
	res.jsonp(req.client);
};

/**
 * Update a Client
 */
exports.update = function(req, res) {
	var client = req.client ;

	client = _.extend(client , req.body);

	client.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};


/**
 * Delete an Client
 */
exports.delete = function(req, res) {
	var client = req.client ;

	client.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};

/**
 * List of Clients
 */
exports.list = function(req, res) { 
	Client.find().sort('-created').populate('user', 'displayName').exec(function(err, clients) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(clients);
		}
	});
};

/**
 * Client middleware
 */
exports.clientByID = function(req, res, next, id) { Client.findById(id).populate('user', 'displayName').exec(function(err, client) {
		if (err) return next(err);
		if (! client) return next(new Error('Failed to load Client ' + id));
		req.client = client ;
		next();
	});
};

/**
 * Adds * amount to the client account
 */
exports.doCredit = function (req, res) {
	if(parseFloat(req.query.amount) < 0){
		return res.send(400, {
			message: 'Amount must be a positive value.'
		});
	}
	req.client.doCredit(req.query.amount)
		.then(function (client) {
			res.jsonp(client);
		})
		.catch(function (err) {
			res.send(400, {
				message: err
			});
		});
};

/**
 * Debits * amount to the client account
 */
exports.doDebit = function (req, res) {
	if(parseFloat(req.query.amount) < 0){
		return res.send(400, {
			message: 'Amount must be a positive value.'
		});
	}
	req.client.doCredit(-req.query.amount)
		.then(function (client) {
			return res.jsonp(client);
		})
		.catch(function (err) {
			return res.send(400, {
				message: err
			});
		});
};

/**
 * Client authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.client.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};