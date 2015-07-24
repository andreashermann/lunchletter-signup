'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http, $q) {
  
  	//[{'properties': {'name': 'Nooba'}}];

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      $scope.user.latitude = position.coords.latitude;
      $scope.user.longitude = position.coords.longitude;
    }
    
    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    function shuffle(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	function getRestaurants() {
    	var defer = $q.defer();
    	$http.get('/restaurants').success(function(data){
    		var restaurants = shuffle(data);
            defer.resolve(restaurants.splice(0,5));
    	});
    	return defer.promise;
	}
	
  	getRestaurants().then(function(r) {
  		$scope.restaurants = r;
  	}); 
    
    $scope.rate = function(restaurantid,rating) {
    	var request = $http.get('/feedback?'
    		+ 'userid=' + $scope.user.email
    		+ ',restaurantid=' + restaurantid
    		+ ',rating=' + rating);
	};

    $scope.submit = function() {
      var url = '/signup?'+ 'userid=' + $scope.user.email;
      if ($scope.user.latitude !== undefined) {
      	url += '&latitude=' + $scope.user.latitude;
      }
      if ($scope.user.longitude !== undefined) {
      	url += '&longitude=' + $scope.user.longitude;
      }
      
      var request = $http.get(url)
		.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
		.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
          $scope.signedUp = true;
          $scope.restaurants = getRestaurants();
        });

    };
    
  });
