'use strict';

angular.module('lunchletterSignupApp')
  .controller('UserCtrl', function ($scope, $http) {
  
	$scope.users = [];
	
	function fetchUsers() {
		$http.get('/users').success(function(data){
			$scope.users = data;
		});
	}
    
    $scope.unsubscribeUser = function(user,e) {
        var url = '/unsubscribe?admin=true&eventId=' + user.eventId + '&userId=' + user.entityId;
        var request = $http.get(url);
        $scope.users.splice($scope.users.indexOf(user), 1);
	};
	
	fetchUsers();
  
  });
