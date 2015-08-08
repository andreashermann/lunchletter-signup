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

	$scope.saveRestaurant = function(r) {
	  $http.post('/restaurants', r)
    		.success(function(restaurants) {
    			console.log("saved", r);
    		})
    		.error(function(e) {
    		  console.log("saving failed", r);
    		});
	};

	$scope.deleteRestaurant = function(r) {
	  $http.delete('/restaurants/' + r.eventId)
    		.success(function(restaurants) {
    			console.log("deleted restaurant", r);
    			$scope.restaurants.splice($scope.restaurants.indexOf(r), 1);
    		})
    		.error(function(e) {
    		  console.log("delete restaurant failed", r);
    		});
	};

	fetchRestaurants();

  });
