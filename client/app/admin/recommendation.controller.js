'use strict';

angular.module('lunchletterSignupApp')
  .controller('RecommendationCtrl', function ($scope, $http) {

  $scope.userId = null;
	$scope.recommendations = [];

  $scope.recommend = function() {
    var url = '/recommendations?limit=3&userId=' + $scope.userId;
    $http.get(url).success(function(recommendations){
      getRestaurants(recommendations.itemScores);
    });
  };

  function getRestaurants(recommendations) {
    $http.get('/restaurants?limit=-1')
    .success(function(restaurants) {
      var restaurantsById = {};
      restaurants.forEach(function(e) {
        restaurantsById[e.entityId] = e;
      });

      $scope.recommendations = [];
      recommendations.forEach(function(e) {
        var r = restaurantsById[e.item]
        if (r) {
          $scope.recommendations.push(r);
        }
      });
    });
  }

  });
