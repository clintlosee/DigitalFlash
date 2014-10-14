// Create Angular Module
var DigitalFlash = angular.module('DigitalFlash', ['ngRoute']);

// Configure Routes
DigitalFlash.config(function($routeProvider){
	
	$routeProvider
	
	// Homepage
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'MainController'
	})	
	
	// Create
	.when('/create', {
		templateUrl: 'views/create.html',
		controller: 'CreateController'
	})
	
	// Manage
	.when('/manage', {
		templateUrl: 'views/manage.html',
		controller: 'ManageController'
	})
	
});
