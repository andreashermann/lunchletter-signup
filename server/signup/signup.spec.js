'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('GET /signup', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/signup')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
