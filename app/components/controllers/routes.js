// Create Main Angular Module
var DigitalFlash = angular.module('DigitalFlash', [
	'ngRoute',
	'ngAnimate',
	
	'DigitalFlashCtrls'
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
	
	// Manage
	.when('/manage', {
		templateUrl: 'views/manage.html',
		controller: 'manageCtrl'
	})
	
}]);