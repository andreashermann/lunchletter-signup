'use strict';

var _ = require('lodash');
var request = require('request');
var fs = require('fs');
var eventlog = require('../eventlog.js');

// view email image
exports.view = function(req, res) {
  if (req.query.userId) {
  	eventlog('viewEmail', { 'userId': req.query.userId });
  }
  
  var img = fs.readFileSync(__dirname + '/pix.png');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img);
};
