'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('lunchletterSignupApp'));

  var AdminCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/users')
      .respond([
      {"eventId":"1","event":"add_user","entityType":"user","entityId":"a@ergon.ch"},
      {"eventId":"2","event":"add_user","entityType":"user","entityId":"b@ergon.ch"}
      ]);

    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of users to the scope', function () {
    $httpBackend.flush();
    expect(scope.users.length).toBe(2);
  });
});
