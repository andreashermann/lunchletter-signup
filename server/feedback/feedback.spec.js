'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('GET /feedback', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/feedback')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
