'use strict';

angular.module('lunchletterSignupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
      	templateUrl: 'app/admin/admin.html',
      	controller: 'AdminCtrl'
      });
  });
