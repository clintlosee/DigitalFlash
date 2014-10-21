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