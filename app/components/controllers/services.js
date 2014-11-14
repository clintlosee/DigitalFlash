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