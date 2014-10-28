// Create Main Angular Module
var DigitalFlash = angular.module('DigitalFlash', [
	'ngAnimate',
	'DigitalFlashCtrls',
	'DigitalFlashServices',
	'LocalStorageModule',
]);

DigitalFlash.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('digitalFlash');
});

var DigitalFlashServices = angular.module('DigitalFlashServices', []);

DigitalFlashServices.factory('displayStacks', function(localStorageService){
    var stacks = [];

    return function() {
        var lskeys = localStorageService.keys();

        var arrayLength = lskeys.length;

        for (var i = 0; i < arrayLength; i++) {
            var stackKey = localStorageService.get(lskeys[i]);
            stacks.push(stackKey);
        }

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
