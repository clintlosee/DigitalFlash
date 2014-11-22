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
	var display_points = current_points[0].points;

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


/* ============================================
					Play Game
============================================ */
DigitalFlashCtrls.controller('gameCtrl', function($scope, $routeParams, $location, displayStacks) {
	// Display overall points
	levelSystem();

	// Stack Name
	$scope.stack_name = $routeParams.stack_name;

	// Create a temporary database to hold game session data
	var gameSession = new localStorageDB("gameSession", sessionStorage);

	if ( gameSession.isNew() ) {
		// Create table that records time spent, number correct, number incorrect, and the number of points earned
		gameSession.createTable("game_data", ["num_correct", "num_incorrect", "points_earned"]);
		gameSession.commit();
	}

	var stopGame = function() {
		// erase previous game data
		gameSession.deleteRows("game_data");

		// insert new game data
		gameSession.insert("game_data", {num_correct: "6", num_incorrect: "2", points_earned: "12"});
		gameSession.commit();

		$location.path("/game_results/" + $routeParams.stack_name);
	}

	if ($routeParams.mode == "hard") {
		// Start the timer
		var startTimer = function() {
			$('#timer').runner({
				autostart: true,
				countdown: true,
				milliseconds: false,
				startAt: 16*1000,
				stopAt: 0
			}).on('runnerFinish', function() {
				console.log("Time's Up");

				// Code to advance cards here
			});
		}
		startTimer();
	}

	$scope.stopGame = function() {
		stopGame();
	};



	// Code to display terms for game here



		//$scope.stacks = displayStacks();

		//var stack_slug = $routeParams.stack_slug;

		//$scope.stack_name = stack_slug.replace(/_/g, " ");

		// Access the local storage database of the stack
		var stackDB = localStorageDB($scope.stack_name, localStorage);
		$scope.words = stackDB.query("words");




		//$scope.randomItem = $scope.words[Math.floor(Math.random()*$scope.words.length)];

		// Create an array for the random words
		var randomWords = [];

		// Add random terms to variables
		for (var i = 0; i < $scope.words.length; i++) {
			randomWords[i] = $scope.words[Math.floor(Math.random()*$scope.words.length)];

			$scope.randomItem = randomWords[i];
			$scope.randomItem2 = randomWords[i - 1];
			$scope.randomItem3 = randomWords[i - 2];
			$scope.randomItem4 = randomWords[i - 3];

		}

		$scope.limit = 4;


		//Function that will shuffle only your switchable elements.
		function shuffle(nodes, switchableSelector) {
			var length = nodes.length;

			//Create the array for the random pick.
			var switchable = nodes.filter("." + switchableSelector);
			var switchIndex = [];

			$.each(switchable, function(index, item) {
				switchIndex[index] = $(item).index();
			});

			//The array should be used for picking up random elements.
			var switchLength = switchIndex.length;
			var randomPick, randomSwap;

			for (var index = length; index > 0; index--) {
				//Get a random index that contains a switchable element.
				randomPick = switchIndex[Math.floor(Math.random() * switchLength)];

				//Get the next element that needs to be swapped.
				randomSwap = nodes[index - 1];

				//If the element is 'not switchable', ignore and continue;
				if($(randomSwap).hasClass(switchableSelector)) {
					nodes[index - 1] = nodes[randomPick];
					nodes[randomPick] = randomSwap;
				}
			}

			return nodes;
		}

		// Create shuffleTerms fuction
		var shuffleTerms = function () {
			var $nodes = $("#terms").find("li");
			shuffle($nodes, "sw");
			$("#terms").append($nodes);
		};

		// Set a delay to shuffle terms to accomodate for Angular rendering
		setTimeout(shuffleTerms, 5);


});


/* ============================================
				Game Results
============================================ */
DigitalFlashCtrls.controller('gameResultsCtrl', function($scope, $routeParams) {
	// Display the overall points
	levelSystem();

	$scope.stack_name = $routeParams.stack_name;

	// Get the game session data
	var gameSession = new localStorageDB("gameSession", sessionStorage);

	$scope.game_session_data = gameSession.query("game_data");
});
