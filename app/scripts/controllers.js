// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', [
	'DigitalFlashServices',
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

			stack.commit();
		}

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}
});

// Create Manage Controller
DigitalFlashCtrls.controller('manageCtrl', function($scope, displayStacks){

	$scope.message = 'Choose a stack to edit.';

	$scope.stacks = displayStacks();

});

DigitalFlashCtrls.controller('manageStackCtrl', function($scope, $routeParams, $http, $window){

	$scope.message = 'Add words to this stack below';

	var stack_slug = $routeParams.stack_slug;

	$scope.stack_name = stack_slug.replace(/_/g, " ");

	var stackDB = localStorageDB(stack_slug, localStorage);

	$scope.addWord = function(term) {
		stackDB.insert("words", {word: term.term, definition: term.definition});

		stackDB.commit();

	$scope.message = 'manage';


		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}

	$scope.words = stackDB.query("words");

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});

	$scope.deleteStack = function() {
		if (confirm("Are you sure you want to delete this stack?") == true) {
			stackDB.drop();
			window.location.replace("/app/#/");
		}
		else {
			return false;
		}
	}

	$scope.deleteWord = function(word) {
		console.log(word.word);

		stackDB.deleteRows("words",{word:word.word});

		stackDB.commit();

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}
});

DigitalFlashCtrls.controller('addCustomCtrl', function($scope, $window) {

//    var dictionary = new customDictionary("dictionary", localStorage);


    $scope.addToDic = function (cus_term, cus_definition) {
        var new_cus_term = cus_term.replace(/ /g, "_");
        var new_cus_definition = cus_definition.replace(/ /g,"_");

        var term = new localStorageDB(new_cus_term, new_cus_definition, localStorage);

        if (term.isNew()) {
            term.createTable("terms", ["term", "definition"]);
            term.commit();
        }

        var refresh = (function () {
            $window.location.reload();
        })();

        return refresh;
    }
});
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

	.when('/manage/:stack_slug', {
        templateUrl: 'views/manage_stack.html',
        controller: 'manageStackCtrl'
    });

}]);
