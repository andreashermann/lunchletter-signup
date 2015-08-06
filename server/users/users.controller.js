'use strict';

var _ = require('lodash');
var request = require('request');
var accessKey = process.env.ENGINE_ACCESS_KEY;

// Get list of things
exports.index = function(req, res) {
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey + "&event=add_user&limit=1000";
  var response = request(
  	{ 
  		url: url, 
		method: "GET",
		json: true,
		headers: {
        	"content-type": "application/json",
		},
	},
    function(err, res2, users) {
		res.json(users);
	}
  );
};

exports.show = function(req, res) {
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey + "&event=add_user&limit=1&entityId=" + req.params.id;
  var response = request(
  	{ 
  		url: url, 
		method: "GET",
		json: true,
		headers: {
        	"content-type": "application/json",
		},
	},
    function(err, res2, users) {
		res.json(users);
	}
  );
};

exports.destroy = function(req, res) {
  var url = "http://lunchletter.ch:7070/events/" + req.params.id + ".json?accessKey=" + accessKey + "&limit=1";
  var response = request(
  	{ 
  		url: url, 
		method: "GET",
		json: true,
		headers: {
        	"content-type": "application/json",
		},
	},
    function(err, res2, users) {
		res.json(users);
	}
  );
};
