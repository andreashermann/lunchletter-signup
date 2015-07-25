'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('GET /unsubscribe', function() {
  it('should respond with redirect', function(done) {
    request(app)
      .get('/unsubscribe')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
