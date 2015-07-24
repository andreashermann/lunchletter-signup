'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      $scope.user.lat = position.coords.latitude;
      $scope.user.long = position.coords.longitude;
    }

    $scope.submit = function() {

      var request = $http.get('/signup?'
        + 'userid=' + $scope.user.email
        + ',lat=' + $scope.user.lat
        + ',long=' + $scope.user.long)
	.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
	.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
        });

    }
  });
