'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http) {
  
  	$scope.signedUp = false;
	$scope.restaurants = [];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      $scope.user.latitude = position.coords.latitude;
      $scope.user.longitude = position.coords.longitude;
    }
	
	function fetchRestaurants() {
		var url = '/restaurants?';
		if ($scope.user.latitude !== undefined) {
			url += '&latitude=' + $scope.user.latitude;
		}
		if ($scope.user.longitude !== undefined) {
			url += '&longitude=' + $scope.user.longitude;
		}
		$http.get(url).success(function(data){
			$scope.restaurants = data.splice(0,10);
		});
	}
    
    $scope.rate = function(restaurant,rating,e) {
    	$scope.restaurants.splice($scope.restaurants.indexOf(restaurant), 1);
    	var request = $http.get('/feedback?'
    		+ 'userId=' + $scope.user.email
    		+ '&restaurantId=' + restaurant.eventId
    		+ '&rating=' + rating);
	};

    $scope.submit = function() {
      var url = '/signup?'+ 'userId=' + $scope.user.email;
      if ($scope.user.latitude !== undefined) {
      	url += '&latitude=' + $scope.user.latitude;
      }
      if ($scope.user.longitude !== undefined) {
      	url += '&longitude=' + $scope.user.longitude;
      }
      
      $scope.signedUp = true;
      var request = $http.get(url)
		.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
		.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
      		fetchRestaurants();
        });

    };
    
  });
