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

};

/* ============================================
HTTP GET SERVICE
============================================ */

DigitalFlashServices.factory('DataRequest', ['$http',
function($http){
  return {
    quotes: function() {
      return $http.get('components/json/quotes.json')
        .then(function(result) {
          return result.data;
        });
    },
    dictionary: function() {
      return $http.get('components/json/test-dictionary.json')
        .then(function(result) {
          return result.data;
        });
    },
    basicDictionary: function() {
      return $http.get('components/json/basic_dictionary.json')
      .then(function(result) {
        return result.data;
      });
    }
  };
}]);
