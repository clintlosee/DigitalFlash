// Create Controllers Angular Module
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', [
	'DigitalFlashServices'
]);

// Create Main Controller
DigitalFlashCtrls.controller('mainCtrl', function($scope, $http, displayStacks){

	// Spotlight Quotes
	$http.get('components/json/quotes.json').success(function(data){

		// Generate Random Index Number
		var number = Math.floor(Math.random() * data.length);

		// Store Data Objects into Scope Variables
		$scope.quote = data[number].quote;
		$scope.quote_by = data[number].by;

	});

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});

	$scope.stacks = displayStacks();
});






/* ============================================
				CREATE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('createCtrl', function($scope, $http, $window, $routeParams, displayStacks) {

	// Header Message
	$scope.header = 'Create Stacks';
	$scope.message = 'Create a new stack by entering a name and clicking on the stack type.';

	// Create Random Stack
	$scope.createRandomStack = function(input){

		// Grab New Name
		var name = input.replace(/ /g, "_");

		// Create New Local Storage Database
		var stack = new localStorageDB(name, localStorage);

		// Only Apply if Stack is New
		if(stack.isNew()){

			// Create Table
			stack.createTable("words", ["word", "definition"]);

			// Commit Table
			stack.commit();

			// Populate Table With Random Words
			$http.get('components/json/test-dictionary.json').success(function(data) {

				// Put Data into Variable Scope
				$scope.data = data;

				// Create Number Array
				var array = [];

				// Push Random Index Numbers to Array
				while(array.length < 10){

					// Generate Random Number
					var number = Math.floor(Math.random() * data.length);

					// Only Push to Array if Number Doesn't Exist
					if($.inArray(number, array) == -1){array.push(number);}

				}

				// Add Words to Tables
				for(i = 0; i < array.length; i++){

					// Insert Random Term
					stack.insert("words", {word: data[array[i]].term, definition: data[array[i]].definition});

				}

				// Commit Table
				stack.commit();

			});

		}

	}

	// Create Custom Stack

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


/* ============================================
				MODE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('modeCtrl', function($scope, $routeParams, $window){

	// Grab Stack Information from Param
	var stack_name = $routeParams.stack_name;
	$scope.stack_name = stack_name;

	// Header Message
	$scope.header = 'Choose Game Mode';
	$scope.message = 'Choose the game mode for ' + stack_name + ' to start playing!';

	// create the user points database
	var points = new localStorageDB("points", localStorage);

	// if this is the first time the points database is being accessed, create the levels and user points tables
	if ( points.isNew() ) {
		// create a table for levels and populate with data
		var level_rows = [
			{level: "1", required_points: "100"},
			{level: "2", required_points: "200"},
			{level: "3", required_points: "300"},
			{level: "4", required_points: "400"},
			{level: "5", required_points: "500"},
		];

		points.createTableWithData("levels", level_rows);

		// create a table for current user points
		var user_point_rows = [
			{points: 0},
		];

		points.createTableWithData("user_points", user_point_rows);

		points.commit();
	}

	var current_points = points.query("user_points", {ID: "1"});
	var current_points_json = JSON.stringify(current_points);
	var current_points_data = JSON.parse(current_points_json);
	var display_points = current_points_data[0].points;

	console.log(display_points);

	$("#level").css("padding-right", display_points);
	$("#points").html(display_points);

	$scope.addPoints = function() {
		points.insertOrUpdate("user_points", {ID: "1"}, { ID: "1",
				points: display_points + 10,
		});

		points.commit();

		$("#level").css("padding-right", display_points);
		$("#points").html(display_points);

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}
});


/* ============================================
				CREATE-MANAGE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('manageCtrl', function($scope, displayStacks){

	$scope.message = 'Choose a stack to edit.';

	// Display saved stacks from localstorage database
	$scope.stacks = displayStacks();

	// Function to delete stacks
	$scope.deleteStack = function() {

		// Access stack slug name from object and save into variable
		var stack_slug = $scope.stacks[0].slug

		// Create variable to access localstorage database
		var stackDB = localStorageDB(stack_slug, localStorage);

		// Confirm deletion of stack or cancel
		if (confirm("Are you sure you want to delete this stack?") == true) {
			stackDB.drop();
			window.location.reload();
		}
		else {
			return false;
		}
	}

});

DigitalFlashCtrls.controller('manageStackCtrl', function($scope, $routeParams, $http, $window){

	$scope.message = 'Add words to this stack below';

	var stack_slug = $routeParams.stack_slug;

	$scope.stack_name = stack_slug.replace(/_/g, " ");

	var stackDB = localStorageDB(stack_slug, localStorage);

	$scope.addWord = function(term) {
		stackDB.insert("words", {word: term.term, definition: term.definition});

		stackDB.commit();

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}

    $scope.addCustomWord = function(term, definition) {
        stackDB.insert("words", {word: term, definition: definition});

        stackDB.commit();

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

		// Commit the changes to the database. Without this, the app will break.
		stackDB.commit();

		var refresh = (function() {
			$window.location.reload();
		})();

		return refresh;
	}

    var custom = localStorageDB("cus_dict", localStorage);
    if ( custom.isNew() ){
        custom.createTable("entry", ["term", "definition"]);

		// Commit the changes to the database. Without this, the app will break.
		custom.commit();
    }

    $scope.entry = custom.query("entry");
});

DigitalFlashCtrls.controller('addCustomCtrl', function($scope, $window, $http) {

    $scope.message = 'Add Words';
    $scope.message2 = 'Add your own words to the dictionary';

    $http.get('components/json/test-dictionary.json').success(function(data) {
        $scope.dictionary = data;
    });

    var custom;
    custom = new localStorageDB("cus_dict", localStorage);
    if ( custom.isNew() )  {
        custom.createTable("entry", ["term", "definition"]);
				custom.commit();
    }

    $scope.addToDict = function (cus_term, cus_def) {
        custom.insert("entry", {term: cus_term, definition: cus_def});
        custom.commit();
        //end if

        var refresh = (function() {
            $window.location.reload();
        })();

        return refresh;


    } // end add to dic


    $scope.entry = custom.query("entry");

}); // end addCustom controller

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

	.when('/manage/:stack_slug', {
        templateUrl: 'views/manage_stack.html',
        controller: 'manageStackCtrl'
    })

    .when('/mode/:stack_name', {
	    templateUrl: 'views/mode.html',
	    controller: 'modeCtrl'
    })

    .when('/addwords', {
            templateUrl: 'views/add_words.html',
            controller: 'addCustomCtrl'
        });

}]);

/* ============================================
			DigitalFlash Services
============================================ */

// Create the Module
var DigitalFlashServices = angular.module('DigitalFlashServices', ['ngResource']);

// Create Display Stacks
DigitalFlashServices.factory('displayStacks', function(){
    var stacks = [];

    return function() {
    var stacks = [];

    for(var i = 0; i < localStorage.length; i++) {
      var stackKey = localStorage.key(i);

            if ( stackKey == "db_cus_dict" || stackKey == "db_points"){
                continue;
            }
            else {
                var stack_name = stackKey.replace("db_", "").replace(/_/g, " ");
                var stack_slug = stackKey.replace("db_", "");

                stack_array = {"name": stack_name, "slug": stack_slug}

                stacks.push(stack_array);
            }
    }

    return stacks;
    };
});
