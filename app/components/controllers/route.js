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

	// Manage
	.when('/manage', {
		templateUrl: 'views/manage.html',
		controller: 'manageCtrl'
	})

	// Manage individual stack
	.when('/manage/:stack_slug', {
        templateUrl: 'views/manage_stack.html',
        controller: 'manageStackCtrl'
    })

	// Game mode selection
    .when('/mode/:stack_name', {
	    templateUrl: 'views/mode.html',
	    controller: 'modeCtrl'
    })

	// Add words to user dictionary
    .when('/addwords', {
            templateUrl: 'views/add_words.html',
            controller: 'addCustomCtrl'
    })

	// Play Game
	.when('/game/:mode/:stack_name', {
		templateUrl: 'views/game.html',
		controller: 'gameCtrl'
	})

	// Game Results
	.when('/game_results/:stack_name', {
		templateUrl: 'views/game_results.html',
		controller: 'gameResultsCtrl'
	});
}]);
