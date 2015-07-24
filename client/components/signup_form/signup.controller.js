'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.submit = function() {
      $scope.user.location = $location;

      var dataObj = {
        "event" : "add_user",
        "entityType" : "user",
        "entityId" : $scope.user.email
      }

      var ACCESS_KEY = '9cbltUkuf5jJzhuT4kHimRhGeqzKNIhP5Z1nhxaH6az8XZWioUqd8bUv4nzM2EQD';

      var req = {
            method: 'POST',
            url: '/be/events.json?accessKey='+ACCESS_KEY,
            headers: {
                  'Content-Type': 'application/json'
            },
            data: dataObj
      };

      var request = $http(req)
	.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
	.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
        });
    }
  });
