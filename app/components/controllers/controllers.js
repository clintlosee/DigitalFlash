// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', [
	'DigitalFlashServices',
	'LocalStorageModule'
]);

// Create Main Controller
DigitalFlashCtrls.controller('mainCtrl', function($scope, $http){

	$scope.message = 'home';

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});
	
});

// Create Create Controller
DigitalFlashCtrls.controller('createCtrl', function($scope, $window, displayStacks, localStorageService) {

	$scope.message = 'Create a new stack by entering a name and clicking go.';

    $scope.stacks = displayStacks();

    $scope.saveStack = function(key, val) {
        console.log(val);

        var lsLength = localStorageService.length();

        var saveStack = localStorageService.set(key + lsLength, val);
        var refresh = (function() {
            $window.location.reload();
        })();

        return [saveStack, refresh];
    }
	
});

// Create Manage Controller
DigitalFlashCtrls.controller('manageCtrl', function($scope){

	$scope.message = 'manage';
	
});