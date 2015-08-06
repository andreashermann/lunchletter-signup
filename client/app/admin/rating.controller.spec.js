'use strict';

describe('Controller: RatingCtrl', function () {

  // load the controller's module
  beforeEach(module('lunchletterSignupApp'));

  var RatingCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/ratings')
      .respond([
      {"eventId":"1","event":"rate","entityType":"user","entityId":"a@ergon.ch"},
      {"eventId":"2","event":"rate","entityType":"user","entityId":"b@ergon.ch"}
      ]);

    scope = $rootScope.$new();
    RatingCtrl = $controller('RatingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of ratings to the scope', function () {
    $httpBackend.flush();
    expect(scope.ratings.length).toBe(2);
  });
});
