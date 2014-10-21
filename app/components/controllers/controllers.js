// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', []);

// Create Main Controller
DigitalFlashCtrls.controller('mainCtrl', function($scope){

	$scope.message = 'home';
	
});

// Create Create Controller
DigitalFlashCtrls.controller('createCtrl', function($scope){

	$scope.message = 'create';
	
});

// Create Manage Controller
DigitalFlashCtrls.controller('manageCtrl', function($scope){

	$scope.message = 'manage';
	
});