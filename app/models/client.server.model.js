'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Q = require('q'),
	Schema = mongoose.Schema;

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
 * Client Schema
 */
var ClientSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Client first name',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		required: 'Please fill Client last name',
		trim: true
	},
	emails: [{
		type: String,
		trim: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	}],
	account: {
		balance: {
			type: Number,
			default: 0
		},
		transactions: [
			{
				beforeBalance: Number,
				amount: Number,
				afterBalance: Number,
				created: {
					type: Date,
					default: Date.now
				}
			}
		]
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	},
	phones: [{
		type: String,
		trim: true
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

ClientSchema.methods.doCredit = function (amount) {
	var defered = Q.defer();

	if(isNaN(amount)){
		defered.reject('Amount has to be a number.');
	}

	amount = parseFloat(amount); 
	if (amount === 0) {
		defered.reject('Amount has to be a non zero value.');
	}

	var afterBalance = this.account.balance + amount;
	this.account.transactions.push({
		beforeBalance: this.account.balance,
		amount: amount,
		afterBalance: afterBalance
	});
	this.account.balance = afterBalance;
	
	var me = this;
	this.save(function (err) {
		if (err) {
			defered.reject(getErrorMessage(err));
		} else {
			defered.resolve(me);
		}
	});

	return defered.promise;
};

ClientSchema.pre('save', function(next) {
	if(this.isNew){
		this.account = {
			balance: 0,
			transactions:[{
				beforeBalance: 0,
				afterBalance: 0,
				amount: 0
			}]
		};
	}
	if(this.isModified()){
		this.updated = Date.now();
	}

	next();
});

mongoose.model('Client', ClientSchema);