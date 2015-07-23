'use strict';

angular.module('lunchletterSignupApp')
  .controller('SignupCtrl', function ($scope, $http, $location) {
    $scope.submit = function() {
      $scope.user.location = $location;

      var dataObj = {
        "event" : "$set",
        "entityType" : "user",
        "entityId" : $scope.user.email
      }

      var ACCESS_KEY = 123;

      var request = $http.post("http://localhost:9000?accessKey="+ACCESS_KEY, dataObj)
        .error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        })
        .success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
        });
    }
  });
