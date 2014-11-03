// Create Digital Flash Module
var DigitalFlash = angular.module('DigitalFlash', [
	'ngRoute',
	'ngAnimate',
	
	'DigitalFlashCtrls',
	'DigitalFlashServices'
]);

// Configure Routes
DigitalFlash.config(['$routeProvider', function($routeProvider){

	// Mention Route Provider
	$routeProvider

	// Home
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'mainCtrl'
	})

	// Create
	.when('/create', {
		templateUrl: 'views/create.html',
		controller: 'createCtrl'
	})
	
	// Mode
	.when('/mode', {
		templateUrl: 'views/mode.html',
		controller: 'modeCtrl'
	})

	// Manage
	.when('/manage', {
		templateUrl: 'views/manage.html',
		controller: 'manageCtrl'
	})

	.when('/manage/:stack_slug', {
        templateUrl: 'views/manage_stack.html',
        controller: 'manageStackCtrl'
    });

}]);
