/* ============================================
				CREATE MODULE
============================================ */
var DigitalFlashCtrls = angular.module('DigitalFlashCtrls', ['DigitalFlashServices']);

/* ============================================
				MAIN CONTROLLER
============================================ */
DigitalFlashCtrls.controller('mainCtrl', function($scope, displayStacks, DataRequest){

	// ------------------- Spotlight Quotes
	DataRequest.quotes().then(function(data) {
		$scope.data = data;

		//Generate Random Index Number
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
DigitalFlashCtrls.controller('createCtrl', function($scope, $window, $routeParams, displayStacks, DataRequest) {

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
			// Dictionary DataRequest
			DataRequest.dictionary().then(function(data) {
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

	};

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

	};

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
			// Basic Dictionary DataRequest
			DataRequest.basicDictionary().then(function(data) {
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

	};

});

/* ============================================
				MODE CONTROLLER
============================================ */
DigitalFlashCtrls.controller('modeCtrl', function($scope, $routeParams, $window){

	// ------------------- Display Levels
	levelSystem();

	// ------------------- Assign Variables
	$scope.stack_name = $routeParams.stack_name;

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
		var stack_slug = $scope.stacks[0].slug;

		// Create variable to access localstorage database
		var stackDB = localStorageDB(stack_slug, localStorage);

		// Confirm deletion of stack or cancel
		if (confirm("Are you sure you want to delete this stack?") === true) {
			stackDB.drop();
			window.location.reload();
		}
		else {
			return false;
		}
	};

});

/* ============================================
				MANAGE STACK CONTROLLER
============================================ */
DigitalFlashCtrls.controller('manageStackCtrl', function($scope, $routeParams, $window, DataRequest){

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

	// Get Words
	$scope.words = stackDB.query("words");

	// Add Word to Stack Function
	$scope.addWord = function(term) {

		// Insert Words
		stackDB.insert("words", {word: term.term, definition: term.definition});

		// Commit Insert
		stackDB.commit();

		// Get Words
		$scope.words = stackDB.query("words");

	};

	// Add Custom Word to Stack Function
    $scope.addCustomWord = function(term, definition) {

	    // Insert Words
        stackDB.insert("words", {word: term, definition: definition});

		// Commit Insert
        stackDB.commit();

		// Get Words
		$scope.words = stackDB.query("words");
    };

	// Fetch Dictionary
	DataRequest.dictionary().then(function(data) {
		// Put Data into Variable Scope
		$scope.dictionary = data;
	});


	// Delete Stack
	$scope.deleteStack = function() {

		// Confirm Dialog
		if (confirm("Are you sure you want to delete this stack?") === true) {

			// Drop Database
			stackDB.drop();

			// Replace URL
			window.location.replace("/app/#/");

		}

		// Return False
		else {return false;}

	};

	// Delete Word
	$scope.deleteWord = function(word) {

		// Print Word in Console
		console.log(word.word);

		// Delete Word from Database
		stackDB.deleteRows("words",{word:word.word});

		// Commit Delete.  Important!  Keep or App Will Break!
		stackDB.commit();

		// Get Words
		$scope.words = stackDB.query("words");

	};

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
DigitalFlashCtrls.controller('addCustomCtrl', function($scope, $window, DataRequest) {

	// ------------------- Header Messages
    $scope.message = 'Add Words';  $scope.message2 = 'Add your own words to the dictionary';

    // ------------------- Display Levels
	levelSystem();

	// Fetch Dictionary
	DataRequest.dictionary().then(function(data) {
		// Put Data into Variable Scope
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

    };

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

	};

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
			if ($routeParams.mode == "hard") {
				$('#timer').runner('stop');
				$scope.guesses = 'hideAnswers';
				guessedWrongTimer();
			}

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
		};
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
