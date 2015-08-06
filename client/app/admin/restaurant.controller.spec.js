'use strict';

describe('Controller: RestaurantCtrl', function () {

  // load the controller's module
  beforeEach(module('lunchletterSignupApp'));

  var RestaurantCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/restaurants')
      .respond([
      {"eventId":"1","event":"add_user","entityType":"user","entityId":"a@ergon.ch"},
      {"eventId":"2","event":"add_user","entityType":"user","entityId":"b@ergon.ch"}
      ]);

    scope = $rootScope.$new();
    RestaurantCtrl = $controller('RestaurantCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of restaurants to the scope', function () {
    $httpBackend.flush();
    expect(scope.restaurants.length).toBe(2);
  });
});
