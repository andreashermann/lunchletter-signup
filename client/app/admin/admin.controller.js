'use strict';

angular.module('lunchletterSignupApp')
  .controller('AdminCtrl', function ($scope, $http) {
  
	$scope.users = [];
	
	function fetchUsers() {
		$http.get('/users').success(function(data){
			$scope.users = data;
		});
	}
    
    $scope.unsubscribeUser = function(user,e) {
        var url = '/unsubscribe?eventId=' + user.eventId;
        var request = $http.get(url);
        $scope.users.splice($scope.users.indexOf(user), 1);
	};
	
	fetchUsers();
  
  });
