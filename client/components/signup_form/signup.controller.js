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

      var ACCESS_KEY = 'I6lD68FVpqWjRv6wwINie5oRkazg207PtBcgJuJZLWwyUBSpjHzWZ3kq0ar1eqpc';

      var request = $http.get("http://46.101.237.209:7070/events.json?accessKey="+ACCESS_KEY, dataObj);
        request.error(function(data, status, headers, config) {
          $scope.requestMessage = "error: " + status.toString() +" "+ data;
        });
        request.success(function(data, status, headers, config) {
          $scope.requestMessage = "success: " + status.toString() +" "+ data;
        });
    }
  });
