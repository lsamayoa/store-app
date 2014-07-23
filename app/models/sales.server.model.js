'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var SaleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	client: {
		type: Schema.ObjectId,
		ref: 'Client'
	},
	details: []

});

mongoose.model('Sale', SaleSchema);