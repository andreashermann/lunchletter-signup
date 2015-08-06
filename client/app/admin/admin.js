'use strict';

angular.module('lunchletterSignupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/users', {
      	templateUrl: 'app/admin/users.html',
      	controller: 'UserCtrl'
      })
      .when('/admin/ratings', {
      	templateUrl: 'app/admin/ratings.html',
      	controller: 'RatingCtrl'
      })
      .when('/admin/restaurants', {
      	templateUrl: 'app/admin/restaurants.html',
      	controller: 'RestaurantCtrl'
      });
  });
