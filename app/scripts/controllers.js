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
	var stack_name = $routeParams.stack_name;
	var name = stack_name.replace(/_/g, " ");
	$scope.stack_name = name;

	// ------------------- Header Messages
	$scope.header = 'Choose Game Mode';
	$scope.message = 'Choose the game mode for ' + name + ' to start playing!';

	// ------------------- Temp Add Points to Level
	var points = new localStorageDB("points", localStorage);

	// Create Variables
	var current_points = points.query("user_points", {ID: "1"});
	var display_points = current_points[0].points;

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
	var stack_slug = $routeParams.stack_slug;
	var db_name = stack_slug.replace(/ /g, "_");

	$scope.stack_name = stack_slug.replace(/_/g, " ");

	// Create Database
	var stackDB = localStorageDB(db_name, localStorage);

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
DigitalFlashCtrls.controller('gameCtrl', function($scope, $routeParams, $location, displayStacks, gameService) {

	// Display Overall Points
	levelSystem();

	// Get Stack Name
	$scope.stack_name = $routeParams.stack_name;

	// Spotlight Variables
	$scope.header = $scope.stack_name.replace("_", " ");

	gameSession = gameService.gameSession();

	// Get Stack Information
	var stackDB = localStorageDB($scope.stack_name, localStorage);

	// Query Database
	$scope.words = stackDB.query("words");

	// Get Random Definition
	$scope.randomItem = $scope.words[Math.floor(Math.random()*$scope.words.length)];


	// Create Random Words Array
	var randomWords = [];

	// Push Random Terms to Variables
	for(var i = 0; i < $scope.words.length; i++){

		// Generate Random Key
		randomWords[i] = $scope.words[Math.floor(Math.random()*$scope.words.length)];

		// Assign to Variables
		$scope.randomItem = randomWords[i];
		$scope.randomItem2 = randomWords[i - 1];
		$scope.randomItem3 = randomWords[i - 2];
		$scope.randomItem4 = randomWords[i - 3];

	}

	// Shuffled Terms
	function shuffle(nodes, switchableSelector) {

		// Get Node Length
		var length = nodes.length;

		// Create Array for Random Pick
		var shuffleable = nodes.filter("." + switchableSelector);
		var shuffleIndex = [];

		// For Each Term
		$.each(shuffleable, function(index, item) {
			shuffleIndex[index] = $(item).index();
		});

		// The Array Should Be Used for Packing up Random Elements
		var shuffleLength = shuffleIndex.length;
		var randomPick, randomSwap;

		// Loop Through Index
		for (var index = length; index > 0; index--) {

			// Get Random INdex That Contains a Shuffable Element
			randomPick = shuffleIndex[Math.floor(Math.random() * shuffleLength)];

			// Get the Next Element That Needs to be Swapped
			randomSwap = nodes[index - 1];

			// If the Element is 'Not Shuffable', Ignore and Continue
			if($(randomSwap).hasClass(switchableSelector)) {
				nodes[index - 1] = nodes[randomPick];
				nodes[randomPick] = randomSwap;
			}
		}

		// Return Nodes
		return nodes;
	}

	// Shuffle Terms Function
	var shuffleTerms = function() {

		// Declare Nodes
		var $nodes = $(".terms").find("li");

		// Use Shuffle Function
		shuffle($nodes, "sh");

		// Append Shuffled Terms
		$(".terms").append($nodes);

	}

	// Set TimeOut (Don't Remove!)
	setTimeout(shuffleTerms, 5);

	var guesses = 0;

	// Function to check if correct term was selected
	var termCheck = function(clicked) {

		// Get Current Stats
		var game_data = gameSession.query("game_data");
		var game_incorrect = parseInt(game_data[0].num_incorrect, 10);
		var game_correct = parseInt(game_data[0].num_correct, 10);
		var game_points = parseInt(game_data[0].points_earned, 10);

		if(clicked == false) {
			// Change Class for Error Message
			$scope.answerClass = 'showTime';
			$scope.guesses = 'hideAnswers';

			// Update to Database
			gameSession.update("game_data", {ID: 1}, function(row){

				// Add Incorrect
				row.num_incorrect = game_incorrect + 1;
				// Return Row
				return row;

			});

			// Commit Updates
			gameSession.commit();

			// Create Timer to Move to Next Card
			var timesUpTimer = function(){
				$('#timesUp strong').runner({
					autostart: true,
					countdown: true,
					milliseconds: false,
					startAt: 4*1000,
					stopAt: 0
				}).on('runnerFinish', function() {
					// Reload Document
					document.location.reload(true);
				});
			};

			// Start Timer
			timesUpTimer();
		}

		// Check To See if Term is Correct
		else if(clicked != $scope.randomItem.word){

			// Create Timer to Move to Next Card
			var guessedWrongTimer = function(){
				$('#wrongAnswer strong').runner({
					autostart: true,
					countdown: true,
					milliseconds: false,
					startAt: 3*1000,
					stopAt: 0
				}).on('runnerFinish', function() {
					// Reload Document
					document.location.reload(true);
				});
			};

			// Change Class for Error Message
			if (guesses != 1) {
				guesses++;
			}

			else if (guesses == 1) {
				$('#timer').runner('stop');
				$scope.guesses = 'hideAnswers';
				guessedWrongTimer();
			}

			$scope.answerClass = 'showWrong';


			// Update to Database
			gameSession.update("game_data", {ID: 1}, function(row){

				// Add Incorrect
				row.num_incorrect = game_incorrect + 1;

				// Return Row
				return row;

			});

			// Commit Updates
			gameSession.commit();
		}
		else {

			// Change Class for Error Message
			$('#timer').runner('stop');
			$scope.answerClass = 'showCorrect';
			$scope.guesses = 'hideAnswers';

			// Update to Database
			gameSession.update("game_data", {ID: 1}, function(row){

				if ($routeParams.mode == "hard") {
					row.points_earned = game_points + 2;
				}
				else {
					row.points_earned = game_points + 1;
				}

				// Add Correct
				row.num_correct = game_correct + 1;

				// Return Row
				return row;

			});

			// Commit Updates
			gameSession.commit();

			// Create Timer to Move to Next Card
			var correctTimer = function(){
				$('#correctAnswer strong').runner({
					autostart: true,
					countdown: true,
					milliseconds: false,
					startAt: 3*1000,
					stopAt: 0
				}).on('runnerFinish', function() {

					// Reload Document
					document.location.reload(true);

				});
			};

			// Start Timer
			correctTimer();
		}
	};

	$scope.termCheck = function(clicked){
		termCheck(clicked);
	};

	// Stop Game
	var stopGame = function(){

		gameService.stopGame();

		// New Location Path
		$location.path("/game_results/" + $routeParams.stack_name);

	};

	// Scope Function
	$scope.stopGame = function(){
		stopGame();
	};

	// Timer for Hard Mode
	if ($routeParams.mode == "hard") {
		// Start the timer
		var startTimer = function() {
			$('#timer').runner({
				autostart: true,
				countdown: true,
				milliseconds: false,
				startAt: 11*1000,
				stopAt: 0
			}).on('runnerFinish', function() {
				var time = false;
				termCheck(time);
			});
		}
		startTimer();
	}

});


/* ============================================
				Game Results
============================================ */
DigitalFlashCtrls.controller('gameResultsCtrl', function($scope, $routeParams, gameService) {

	// Display Level
	levelSystem();

	// Get Stack Name
	$scope.stack_name = $routeParams.stack_name;

	// Store Game Session Into Scope Variable
	$scope.game_session_data = gameService.gameResults();

	gameService.clearGameSession();

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

	// Manage individual stack
	.when('/manage/:stack_slug', {
        templateUrl: 'views/manage_stack.html',
        controller: 'manageStackCtrl'
    })

	// Game mode selection
    .when('/mode/:stack_name', {
	    templateUrl: 'views/mode.html',
	    controller: 'modeCtrl'
    })

	// Add words to user dictionary
    .when('/addwords', {
      templateUrl: 'views/add_words.html',
      controller: 'addCustomCtrl'
    })

	// Study Mode
		.when('/study/:stack_slug', {
			templateUrl: 'views/study.html',
			controller: 'studyCtrl'
		})


	// Play Game
	.when('/game/:mode/:stack_name', {
		templateUrl: 'views/game.html',
		controller: 'gameCtrl'
	})

	// Game Results
	.when('/game_results/:stack_name', {
		templateUrl: 'views/game_results.html',
		controller: 'gameResultsCtrl'
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
	                var stack_qname = stackKey.replace("db_", "");

	                 // Get Stack Length
					var stack_db = localStorageDB(stack_qname, localStorage);
					var stack_length = stack_db.query("words").length;

					// Assign Variables to Array
	                stack_array = {"name": stack_name, "slug": stack_slug, "length": stack_length, "link": stack_qname}

					// Push to Stacks Array
	                stacks.push(stack_array);
	            }
	    }

		// Return Stacks
		return stacks;

    };

})

.factory('gameService', function() {
    return {
        gameSession: function() {
            // Create Game Session Database
            var gameSession = new localStorageDB("gameSession", sessionStorage);

            // If Database Is New
            if(gameSession.isNew()){

                // Create Table
                gameSession.createTable("game_data", ["num_correct", "num_incorrect", "points_earned"]);

                // Insert Value
                gameSession.insert("game_data", {num_correct: 0, num_incorrect: 0, points_earned: 0});

                // Commit Table
                gameSession.commit();
            }

            return gameSession;
        },
        stopGame: function() {
            // Get Current Stats
            var game_data = gameSession.query("game_data");
            var game_points = parseInt(game_data[0].points_earned, 10);

            // Query Point System
            var points = new localStorageDB("points", localStorage);

            // Get Points
            console.log(game_points);

            // Update Table
            points.update("user_points", {ID: 1}, function(row){

                // Assign Points
                row.points = parseInt(row.points, 10) + game_points;

                // Return Row
                return row;

            });

            // Commit Update
            points.commit();
        },
        gameResults: function() {
            // Get Game Session Data
            var gameSession = localStorageDB("gameSession", sessionStorage);

            // Get the game session data
            game_session_data = gameSession.query("game_data");

            return game_session_data;
        },
        clearGameSession: function() {
            var gameSession = localStorageDB("gameSession", sessionStorage);

            // Drop Database
            gameSession.update("game_data", {ID: 1}, function(row){

                // Reset Values
                row.num_incorrect = 0;
                row.num_correct = 0;
                row.points_earned = 0;

                // Return Row
                return row;

            });

            // Commit Changes
            gameSession.commit();
        }
    }
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
	var display_points = current_points[0].points;

	// Level Display
	$("#level").css("padding-right", display_points);
	$("#points").html(display_points);

}
