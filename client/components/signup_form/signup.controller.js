'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http, $location, $q) {

  	$scope.user = {};
  	$scope.signedUp = false;
	  $scope.restaurants = [];
	  $scope.ratings = [];

	  function init() {
	    setBackground();

      var params = $location.search();

      if (params.userId) {
        $scope.user.email = params.userId;
        $scope.signedUp = true;
      }

      determineUserLocation().then(function(location) {
        fetchRatings().then(function() {
          fetchRestaurants(location.latitude, location.longitude);
        });
      });
	  }

    function determineUserLocation() {
      var deferred = $q.defer();

      var params = $location.search();
      if (params.latitude && params.longitude) {
        $scope.user.latitude = params.latitude;
        $scope.user.longitude = params.longitude;
        deferred.resolve({latitude:params.latitude, longitude:params.longitude});
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.user.latitude = position.coords.latitude;
          $scope.user.longitude = position.coords.longitude;
          deferred.resolve({ latitude:position.coords.latitude, longitude:position.coords.longitude });
        });
      }

      return deferred.promise;
    }

    function reverseGeocode(latitude,longitude) {
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude;
      $http.get(url).success(function(response){
        console.log(response);
        if (response.results.length > 0) {
          $scope.user.address = response.results[0].formatted_address;
        }
      });
    }

    function setBackground() {
      var hour = new Date().getHours();
      if (hour < 9) {
        $('#banner').addClass('morning');
      } else if (hour < 18) {
        $('#banner').addClass('noon');
      } else {
        $('#banner').addClass('evening');
      }
    }

    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    }

    function fetchRatings() {
      var deferred = $q.defer();

      if (!$scope.user.email) {
        deferred.resolve({});
        return deferred.promise;
      }

      var url = '/ratings?limit=1000&entityId=' + $scope.user.email;
      $http.get(url).success(function(ratings) {
        var ratingsById = {};
        if (typeof ratings === 'object') {
       	 ratings.forEach(function(e) {
        	  ratingsById[e.targetEntityId] = e.properties.rating;
         });
        }
        $scope.ratings = ratingsById;
        deferred.resolve(ratingsById);
      });

      return deferred.promise;
    }

    function fetchRestaurants(latitude, longitude) {
      var url = '/restaurants?limit=-1';
      if (latitude) {
        url += '&latitude=' + latitude;
      }
      if (longitude) {
        url += '&longitude=' + longitude;
      }
      $http.get(url).success(function(restaurants) {

        var unratedRestaurants = [];

        // remove already rated restaurants
        restaurants.forEach(function(r) {
          if (!$scope.ratings[r.entityId]) {
            unratedRestaurants.push(r);
          }
        });

        // show nearest restaurants for geolocated users
        // show random restaurants for users
        // without position
        if (!latitude || !longitude) {
          shuffle(unratedRestaurants);
        }
        $scope.restaurants = unratedRestaurants.splice(0,20);
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

    init();

  });
