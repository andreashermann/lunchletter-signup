'use strict';

angular.module('lunchletterSignupApp')
  .controller('RatingCtrl', function ($scope, $http, $location, $q) {
  
	$scope.ratings = [];
	
	function joinRestaurants(ratings) {
		$http.get('/restaurants?limit=-1')
		.success(function(restaurants) {
			var restaurantsById = {};
			restaurants.forEach(function(e) {
				restaurantsById[e.entityId] = e;
			});
			
			ratings.forEach(function(e) {
				var r = restaurantsById[e.targetEntityId]
				if (r) {
					e.restaurant = r.properties;
				}
			});
		});
	}
	
	function fetchRatings(user) {
		$http.get('/ratings')
		.success(function(ratings){
			$scope.ratings = ratings;
    		joinRestaurants(ratings);
		})
		.error(function(e) {
			console.log(e);
		});
	}
    
    $scope.deleteRating = function(rating,e) {
        var url = '/ratings/' + rating.eventId;
        var request = $http.delete(url);
        $scope.ratings.splice($scope.ratings.indexOf(rating), 1);
	};
	
	fetchRatings();
  
  });
