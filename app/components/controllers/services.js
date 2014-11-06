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

            if ( stackKey == "db_cus_dict") {
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
