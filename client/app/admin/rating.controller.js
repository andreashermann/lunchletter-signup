'use strict';

angular.module('lunchletterSignupApp')
  .controller('RatingCtrl', function ($scope, $http, $location, $q) {
  
  	$scope.user = null;
	$scope.ratings = [];
	$scope.restaurants = [];
	$scope.userId = $location.search()['entityId'];
	
	function fetchUser(entityId) {
		var deferred = $q.defer();
		$http.get('/users/' + entityId)
		.success(function(users){
			deferred.resolve(users[0]);
		});
		return deferred.promise;
	}
	
	function joinRestaurants(user, ratings) {
		$http.get('/restaurants?limit=-1&latitude=' + user.properties.latitude + '&longitude=' + user.properties.longitude)
		.success(function(restaurants) {
			restaurants.sort(function(a,b) {
    			return a.properties.name.localeCompare(b.properties.name)
    		});
			$scope.restaurants = restaurants;
			
			var restaurantsById = {};
			restaurants.forEach(function(e) {
				restaurantsById[e.eventId] = e;
			});
			
			ratings.forEach(function(e) {
				var r = restaurantsById[e.targetEntityId]
				e.restaurant = r.properties;
				
				// remove from not rate restaurants
				$scope.restaurants.splice($scope.restaurants.indexOf(r), 1);
			});
		});
	}
	
	function fetchRatings(user) {
		$http.get('/ratings?entityId=' + user.entityId)
		.success(function(ratings){
			$scope.ratings = ratings;
    		joinRestaurants(user, ratings);
		});
	}
    
    $scope.deleteRating = function(rating,e) {
        var url = '/ratings/' + rating.eventId;
        var request = $http.delete(url);
        $scope.ratings.splice($scope.ratings.indexOf(rating), 1);
	};
    
    $scope.rate = function(restaurant,rating,e) {
    	var request = $http.get('/feedback?'
    		+ 'userid=' + $scope.userId
    		+ '&restaurantid=' + restaurant.eventId
    		+ '&rating=' + rating);
    	$scope.restaurants.splice($scope.restaurants.indexOf(restaurant), 1);
	};
	
	fetchUser($scope.userId).then(function(user) {
		fetchRatings(user);
	});
  
  });
