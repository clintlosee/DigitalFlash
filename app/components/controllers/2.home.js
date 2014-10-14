

DigitalFlash.controller('MainController', function($scope, $http){
	$scope.message = 'home';

	$http.get('components/json/test-dictionary.json').success(function(data) {
		$scope.dictionary = data;
	});
});