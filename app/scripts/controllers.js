/* ============================================
				CREATE MODULE
============================================ */
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', ['DigitalFlashServices']);

/* ============================================
				MAIN CONTROLLER
============================================ */
DigitalFlashCtrls.controller('mainCtrl', function($scope, $http, displayStacks){

	// ------------------- Spotlight Quotes
	$http.get('components/json/quotes.json').success(function(data){

		// Generate Random Index Number
		var number = Math.floor(Math.random() * data.length);

		// Store Data Objects into Scope Variables
		$scope.quote = data[number].quote;
		$scope.quote_by = data[number].by;

	});

	// ------------------- Display Stacks
	$scope.stacks = displayStacks();

	// ------------------- Display Levels
	levelSystem();

});

/* ============================================
				CREATE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('createCtrl', function($scope, $http, $window, $routeParams, displayStacks) {

	// ------------------- Header Messages
	$scope.header = 'Create Stacks';
	$scope.message = 'Create a new stack by entering a name and clicking on the stack type.';

	// ------------------- Display Levels
	levelSystem();

	// ------------------- Create Random Stack
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
				while(array.length < 20){

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

	// ------------------- Create Custom Stack
	$scope.createStack = function(stack_name){

		// Assign Stack Name
		var new_stack_name = stack_name.replace(/ /g, "_");

		// Create New Database
		var stack = new localStorageDB(new_stack_name, localStorage);

		// Only if Stack is New
		if(stack.isNew()){

			// Create Database Table
			stack.createTable("words", ["word", "definition"]);

			// Commit Table
			stack.commit();

		}

		// Window Refresh
        var refresh = (function() {
            $window.location.reload();
        })();  return refresh;

	}

	// ------------------- Create Basic Stack
	$scope.createBasicStack = function(input){

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
			$http.get('components/json/basic_dictionary.json').success(function(data) {

				// Put Data into Variable Scope
				$scope.data = data;

				// Create Number Array
				var array = [];

				// Push Random Index Numbers to Array
				while(array.length < 20){

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

});

/* ============================================
				MODE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('modeCtrl', function($scope, $routeParams, $window){

	// ------------------- Display Levels
	levelSystem();

	// ------------------- Assign Variables
	var stack_name = $routeParams.stack_name; $scope.stack_name = stack_name;

	// ------------------- Header Messages
	$scope.header = 'Choose Game Mode';
	$scope.message = 'Choose the game mode for ' + stack_name + ' to start playing!';

	// ------------------- Temp Add Points to Level
	var points = new localStorageDB("points", localStorage);

	// Create Variables
	var current_points = points.query("user_points", {ID: "1"});
	var current_points_json = JSON.stringify(current_points);
	var current_points_data = JSON.parse(current_points_json);
	var display_points = current_points_data[0].points;

	// Print Points to Console
	console.log(display_points);

	// Level Display
	$("#level").css("padding-right", display_points);
	$("#points").html(display_points);

	// Temp Button to Add Points
	$scope.addPoints = function() {

		// Update Table When Button is Pressed
		points.insertOrUpdate("user_points", {ID: "1"}, { ID: "1",
				points: display_points + 10,
		});

		// Commit Update
		points.commit();

		// Update Display
		$("#level").css("padding-right", display_points);
		$("#points").html(display_points);

		// ------------------- Page Refresh
		var refresh = (function() {
			$window.location.reload();
		})();

		// Return Refresh
		return refresh;

	}

});


/* ============================================
				MANAGE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('manageCtrl', function($scope, displayStacks){

	// ------------------- Header Messages
	$scope.message = 'Choose a stack to edit.';

	// ------------------- Display Levels
	levelSystem();

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

/* ============================================
				MANAGE STACK CONTROLLER
============================================ */
DigitalFlashCtrls.controller('manageStackCtrl', function($scope, $routeParams, $http, $window){

	// ------------------- Header Messages
	$scope.message = 'Add words to this stack below';

	// ------------------- Display Levels
	levelSystem();

	// ------------------- Manage Stacks
	var stack_slug = $routeParams.stack_slug; $scope.stack_name = stack_slug.replace(/_/g, " ");

	// Create Database
	var stackDB = localStorageDB(stack_slug, localStorage);

	// Add Word to Stack Function
	$scope.addWord = function(term) {

		// Insert Words
		stackDB.insert("words", {word: term.term, definition: term.definition});

		// Commit Insert
		stackDB.commit();

		// Refresh Window
		var refresh = (function() {
			$window.location.reload();
		})();  return refresh;

	}

	// Add Custom Word to Stack Function
    $scope.addCustomWord = function(term, definition) {

	    // Insert Words
        stackDB.insert("words", {word: term, definition: definition});

		// Commit Insert
        stackDB.commit();

		// Refresh Window
        var refresh = (function() {
            $window.location.reload();
        })(); return refresh;

    }

	// Get Words
	$scope.words = stackDB.query("words");

	// Fetch Dictionary
	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});

	// Delete Stack
	$scope.deleteStack = function() {

		// Confirm Dialog
		if (confirm("Are you sure you want to delete this stack?") == true) {

			// Drop Database
			stackDB.drop();

			// Replace URL
			window.location.replace("/app/#/");

		}

		// Return False
		else {return false;}

	}

	// Delete Word
	$scope.deleteWord = function(word) {

		// Print Word in Console
		console.log(word.word);

		// Delete Word from Database
		stackDB.deleteRows("words",{word:word.word});

		// Commit Delete.  Important!  Keep or App Will Break!
		stackDB.commit();

		// Refresh Window
		var refresh = (function() {
			$window.location.reload();
		})(); return refresh;

	}

	// ------------------- Create Custom Dictionary
    var custom = localStorageDB("cus_dict", localStorage);

    // Only Run if New
    if(custom.isNew()){

	    // Create Table
        custom.createTable("entry", ["term", "definition"]);

		// Commit Table.  Important!  Keep or App Will Break!
		custom.commit();
    }

	// Add Query to Scope
    $scope.entry = custom.query("entry");

});


/* ============================================
				ADD CUSTOM CONTROLLER
============================================ */
DigitalFlashCtrls.controller('addCustomCtrl', function($scope, $window, $http) {

	// ------------------- Header Messages
    $scope.message = 'Add Words';  $scope.message2 = 'Add your own words to the dictionary';

    // ------------------- Display Levels
	levelSystem();

	// Fetch Dictionary
    $http.get('components/json/test-dictionary.json').success(function(data) {
        $scope.dictionary = data;
    });

	// Create Custom Variable
    var custom = new localStorageDB("cus_dict", localStorage);

    // Only Run if New
    if(custom.isNew()) {

	    // Create Table
        custom.createTable("entry", ["term", "definition"]);

        // Commit Table
		custom.commit();

    }

	// Add Word to Dictionary
    $scope.addToDict = function (cus_term, cus_def) {

	    // Insert into Table
        custom.insert("entry", {term: cus_term, definition: cus_def});

        // Commit Insert
        custom.commit();

		// Window Refresh
        var refresh = (function() {
            $window.location.reload();
        })();  return refresh;

    }

	// Add Query to Scope
    $scope.entry = custom.query("entry");


});

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
				CREATE MODULE
============================================ */
var DigitalFlashServices = angular.module('DigitalFlashServices', ['ngResource']);

/* ============================================
				DISPLAY STACKS
============================================ */
DigitalFlashServices.factory('displayStacks', function(){
	
	// Create Array
    var stacks = [];

	// Function For Displaying Stacks
    return function() {
	    
	    // Assign Stacks Blank.  Important!  Display Will Duplicate if Deleted.
	    var stacks = [];

		// Loop Through Local Storage
	    for(var i = 0; i < localStorage.length; i++){
		    
		  // Get Stack Key
	      var stackKey = localStorage.key(i);
	
		  		// If Database Object is Not a Stack, Don't Display
	            if (stackKey == "db_cus_dict" || stackKey == "db_points"){continue;}
	            
	            // If Database Object is a Stack
	            else {
		            
		            // Get Stack Name & Slug
	                var stack_name = stackKey.replace("db_", "").replace(/_/g, " ");
	                var stack_slug = stackKey.replace("db_", "");
	
					// Assign Variables to Array
	                stack_array = {"name": stack_name, "slug": stack_slug}
					
					// Push to Stacks Array
	                stacks.push(stack_array);
	            }
	    }

		// Return Stacks
		return stacks;
    
    };
    
});

/* ============================================
				LEVEL SYSTEM
============================================ */
var levelSystem = function(){
	
	// Create Points Table
	var points = new localStorageDB("points", localStorage);
	
	// Only Run if Database is New
	if(points.isNew()){
		
		// Create Array: Creating a Table for Levels & Populate With Data
		var level_rows = [
			{level: "1", required_points: "100"},
			{level: "2", required_points: "200"},
			{level: "3", required_points: "300"},
			{level: "4", required_points: "400"},
			{level: "5", required_points: "500"},
		];

		// Create Table With Data
		points.createTableWithData("levels", level_rows);

		// Create Table With Current User Points
		var user_point_rows = [
			{points: 0},
		];

		// Create Table With Data
		points.createTableWithData("user_points", user_point_rows);

		// Commit Table
		points.commit();
		
	}
	
	// Create Variables
	var current_points = points.query("user_points", {ID: "1"});
	var current_points_json = JSON.stringify(current_points);
	var current_points_data = JSON.parse(current_points_json);
	var display_points = current_points_data[0].points;

	// Print Points to Console
	console.log(display_points);

	// Level Display
	$("#level").css("padding-right", display_points);
	$("#points").html(display_points);
	
}