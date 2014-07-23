'use strict';

module.exports = {
	app: {
		title: 'store-app',
		description: 'Simple store app',
		keywords: 'Store, SaaS'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/fontawesome/css/font-awesome.css',
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/angular-xeditable/dist/css/xeditable.css',
				'public/lib/angular-dialog-service/dialogs.css',
				'public/lib/animate.css/animate.css',
				'public/lib/angular-tags/dist/angular-tags-0.2.10.css',
				'public/lib/AngularJS-Toaster/toaster.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/restangular/dist/restangular.js',
				'public/lib/lodash/dist/lodash.js',
				'public/lib/angular-xeditable/dist/js/xeditable.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-dialog-service/dialogs.js',
				'public/lib/angular-tags/dist/angular-tags-0.2.10-tpls.js',
				'public/lib/angular-tags/dist/angular-tags-0.2.10.js',
				'public/lib/checklist-model/checklist-model.js',
				'public/lib/inflection/inflection.min.js',
				'public/lib/AngularJS-Toaster/toaster.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	},
	roles: [{
		name: 'owners',
		permisions: ['own']
	},{
		name: 'managers',
		permisions: [
			'addSalesman',
			'manageCredit', 
			'sell', 
			'addClient'
		]
	},{
		name: 'sales', // Sales department
		permisions: ['sell', 'addClient']
	}]
};