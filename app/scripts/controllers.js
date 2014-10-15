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



DigitalFlash.controller('MainController', function($scope, $http){
	$scope.message = 'home';

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});
});
DigitalFlash.controller('CreateController', function($scope){
	$scope.message = 'create';
});


DigitalFlash.controller('ManageController', function($scope){
	$scope.message = 'manage';
});