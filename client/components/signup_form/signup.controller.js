'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http) {
  
  	$scope.signedUp = false;
	$scope.restaurants = [];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      	$scope.user.latitude = position.coords.latitude;
      	$scope.user.longitude = position.coords.longitude;
      });
    }
    
    var hour = new Date().getHours();
    if (hour < 9) {
    	$('#banner').addClass('morning');
    } else if (hour < 18) {
    	$('#banner').addClass('noon');
    } else {
    	$('#banner').addClass('evening');
    }
    
	// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
	function shuffle(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	function fetchRestaurants(latitude, longitude) {
		var url = '/restaurants?limit=1000';
		if (latitude) {
			url += '&latitude=' + latitude;
		}
		if (longitude) {
			url += '&longitude=' + longitude;
		}
		$http.get(url).success(function(restaurants){
			// TODO: remove already rated restaurants
    		shuffle(restaurants);
			$scope.restaurants = restaurants.splice(0,20);
		});
	}
    
    $scope.rate = function(restaurant,rating,e) {
    	$scope.remove(restaurant);
    	var request = $http.get('/feedback?'
    		+ 'userId=' + $scope.user.email
    		+ '&restaurantId=' + restaurant.entityId
    		+ '&rating=' + rating);
	};
	
	$scope.remove = function(restaurant) {
    	$scope.restaurants.splice($scope.restaurants.indexOf(restaurant), 1);
    	if ($scope.restaurants.length == 0) {
    		fetchRestaurants();
    	}
	};

    $scope.signup = function() {
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
      		fetchRestaurants($scope.user.latitude, $scope.user.longitude);
        });

    };
    
    $scope.more = function() {
    	$scope.restaurants = [];
    	fetchRestaurants();
    };
    
  });
