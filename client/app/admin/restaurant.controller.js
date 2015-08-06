'use strict';

angular.module('lunchletterSignupApp')
  .controller('RestaurantCtrl', function ($scope, $http) {
  
	$scope.restaurants = [];
	
	function fetchRestaurants() {
		$http.get('/restaurants?limit=-1')
		.success(function(restaurants) {
			restaurants.sort(function(a,b) {
    			return a.properties.name.localeCompare(b.properties.name)
    		});
			$scope.restaurants = restaurants;
		});
	}
	
	fetchRestaurants();
	
  });
