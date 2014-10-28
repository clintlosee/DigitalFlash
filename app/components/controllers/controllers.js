// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', [
	'DigitalFlashServices',
	'LocalStorageModule',
]);

// Create Main Controller
DigitalFlashCtrls.controller('mainCtrl', function($scope, $http){

	$scope.message = 'home';

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});

});

// Create Create Controller
DigitalFlashCtrls.controller('createCtrl', function($scope, $window, displayStacks) {

	$scope.message = 'Create a new stack by entering a name and clicking go.';

	$scope.stacks = displayStacks();

	$scope.createStack = function(stack_name) {
		var new_stack_name = stack_name.replace(/ /g, "_");

		var stack = new localStorageDB(new_stack_name, localStorage);

		if ( stack.isNew() ) {
			stack.createTable("words", ["word", "definition"]);
			stack.insert("words", {word: "test", definition: "to evaluate knowledge of a subject"});

			stack.commit();
		}

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}

    // $scope.stacks = displayStacks();
	//
    // $scope.saveStack = function(key, val) {
    //     console.log(val);
	//
    //     var lsLength = localStorageService.length();
	//
    //     var saveStack = localStorageService.set(key + lsLength, val);
    //     var refresh = (function() {
    //         $window.location.reload();
    //     })();
	//
    //     return [saveStack, refresh];
    // }

});

// Create Manage Controller
DigitalFlashCtrls.controller('manageCtrl', function($scope){

	$scope.message = 'manage';

});
