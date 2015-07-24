'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.submit = function() {
      $scope.user.location = $location;

      var request = $http.get('/signup?userid=' + $scope.user.email)
	.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
	.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
        });
    }
  });
