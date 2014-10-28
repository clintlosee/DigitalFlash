// Create Main Angular Module
var DigitalFlash = angular.module('DigitalFlash', [
	'ngAnimate',
	'DigitalFlashCtrls',
	'DigitalFlashServices',
]);

DigitalFlash.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('digitalFlash');
});

var DigitalFlashServices = angular.module('DigitalFlashServices', []);

DigitalFlashServices.factory('displayStacks', function(){
    var stacks = [];

    return function() {
		var stacks = [];

		for(var i = 0; i < localStorage.length; i++) {  // Length gives the # of pairs
			var stackKey = localStorage.key(i);
			var stack = stackKey.replace("db_", "").replace(/_/g, " ");             // Get the name of pair i
			stacks.push(stack);
		}

		console.log(stacks);

		return stacks;
    };
});


/* Configure Routing
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

}]);
*/
