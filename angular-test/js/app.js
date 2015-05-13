var app = angular.module('app', []);

app.controller('IndexCtrl', function($scope) {
	// $scope.sex = "男";
	$scope.submit = function() {
		$scope.v = 'Hello ' + $scope.sex;
	}
	$scope.$watch('n', function(value) {
		console.log('message');
		var items = [];
		value = +value;
		for(var i = 0; i < value; i++) {
			items.push(i + 1);
		}
		$scope.items = items;
	});
});