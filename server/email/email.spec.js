'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('GET /email/pix.png', function() {
  it('should respond with image', function(done) {
    request(app)
      .get('/email/pix.png')
      .expect(200)
      .expect('Content-Type', /image/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
