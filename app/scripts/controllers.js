// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', []);

// Create Main Controller
DigitalFlashCtrls.controller('mainCtrl', function($scope, $http){

	$scope.message = 'home';

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});
	
});

// Create Create Controller
DigitalFlashCtrls.controller('createCtrl', function($scope){

	$scope.message = 'create';
	
});

// Create Manage Controller
DigitalFlashCtrls.controller('manageCtrl', function($scope){

	$scope.message = 'manage';
	
});
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