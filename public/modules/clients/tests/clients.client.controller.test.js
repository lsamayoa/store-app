'use strict';

(function() {
	// Clients Controller Spec
	describe('Clients Controller Tests', function() {
		// Initialize global variables
		var ClientsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Clients controller.
			ClientsController = $controller('ClientsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Client object fetched from XHR', inject(function(Clients) {
			// Create sample Client using the Clients service
			var sampleClient = new Clients({
				name: 'New Client'
			});

			// Create a sample Clients array that includes the new Client
			var sampleClients = [sampleClient];

			// Set GET response
			$httpBackend.expectGET('clients').respond(sampleClients);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.clients).toEqualData(sampleClients);
		}));

		it('$scope.findOne() should create an array with one Client object fetched from XHR using a clientId URL parameter', inject(function(Clients) {
			// Define a sample Client object
			var sampleClient = new Clients({
				name: 'New Client'
			});

			// Set the URL parameter
			$stateParams.clientId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/clients\/([0-9a-fA-F]{24})$/).respond(sampleClient);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.client).toEqualData(sampleClient);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Clients) {
			// Create a sample Client object
			var sampleClientPostData = new Clients({
				name: 'New Client'
			});

			// Create a sample Client response
			var sampleClientResponse = new Clients({
				_id: '525cf20451979dea2c000001',
				name: 'New Client'
			});

			// Fixture mock form input values
			scope.name = 'New Client';

			// Set POST response
			$httpBackend.expectPOST('clients', sampleClientPostData).respond(sampleClientResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Client was created
			expect($location.path()).toBe('/clients/' + sampleClientResponse._id);
		}));

		it('$scope.update() should update a valid Client', inject(function(Clients) {
			// Define a sample Client put data
			var sampleClientPutData = new Clients({
				_id: '525cf20451979dea2c000001',
				name: 'New Client'
			});

			// Mock Client in scope
			scope.client = sampleClientPutData;

			// Set PUT response
			$httpBackend.expectPUT(/clients\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/clients/' + sampleClientPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid clientId and remove the Client from the scope', inject(function(Clients) {
			// Create new Client object
			var sampleClient = new Clients({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Clients array and include the Client
			scope.clients = [sampleClient];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/clients\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleClient);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.clients.length).toBe(0);
		}));
	});
}());