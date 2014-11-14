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
