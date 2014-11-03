// Create Digital Flash Module
var DigitalFlashServices = angular.module('DigitalFlashServices', []);

DigitalFlashServices.factory('displayStacks', function(){
    var stacks = [];

    return function() {
		var stacks = [];

		for(var i = 0; i < localStorage.length; i++) {
			var stackKey = localStorage.key(i);
			var stack_name = stackKey.replace("db_", "").replace(/_/g, " ");
			var stack_slug = stackKey.replace("db_", "");

			stack_array = {"name": stack_name, "slug": stack_slug}

			stacks.push(stack_array);
		}

		return stacks;
    };
});