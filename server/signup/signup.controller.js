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
var eventlog = require('../eventlog.js');

// Get list of things
exports.index = function(req, res) {
  eventlog('signUp', { 'userId': req.query.userId });

  var accessKey = process.env.ENGINE_ACCESS_KEY;
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey;
  var requestData = {
    event : "add_user",
    entityType : "user",
    entityId : req.query.userId
  };
  
  if (req.query.longitude !== undefined && req.query.latitude !== undefined) {
  	requestData.properties = {
    	longitude: req.query.longitude,
    	latitude: req.query.latitude
    };
  }
  
  var response = request({ url: url, 
	method: "POST",
	json: true,
	headers: {
        	"content-type": "application/json",
	},
	body: requestData },
        function(err, res2, body) {
		res.json(body);
	}
  );
};
