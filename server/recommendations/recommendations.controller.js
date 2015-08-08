/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */
 'use strict';

var _ = require('lodash');
var request = require('request');
var predictionio = require('predictionio-driver');
var engine = new predictionio.Engine({url: 'http://www.lunchletter.ch:8000'});

// Get list of recommendations
exports.index = function(req, res) {
  engine.sendQuery({
      user: req.query.userId,
      num: 5
  })
  .then(function (result) {
    console.log(result);
    res.json(result);
  });
};
