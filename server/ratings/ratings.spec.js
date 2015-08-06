'use strict';

var should = require('should');
var app = require('../app');
var request = require('supertest');

/*
describe('GET /ratings', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/rating?eventId=a@b.coms')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('DELETE /rating', function() {

  it('should respond with 200', function(done) {
    request(app)
      .delete('/rating?eventId=123123')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

*/
