'use strict';

var _ = require('lodash');
var request = require('request');
var accessKey = process.env.ENGINE_ACCESS_KEY;
var eventlog = require('../eventlog.js');

function findUser(userId, callback) {
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey + "&event=add_user&limit=1&entityId=" + userId;
  var response = request({ url: url, 
	method: "GET",
	json: true,
	headers: {
			"content-type": "application/json",
	},
  }, function(err, res, users) {
  	if(_.isEmpty(err)){
  		callback(users[0]);
  	} else {
  		callback(err, null);
  	}
  });
}

function deleteEvent(eventId, callback) {
  var url = "http://lunchletter.ch:7070/events/"+eventId+".json?accessKey=" + accessKey;
  var response = request({ url: url, 
	method: "DELETE",
	json: true,
	headers: {
			"content-type": "application/json",
	},
  }, callback);
}

// Get list of things
exports.index = function(req, res) {
  if (req.query.userId) {
  	eventlog('rate', { 'userId': req.query.userId });
  }
  
  findUser(req.query.userId, function(user) {
	deleteEvent(user.eventId, function(err2, res2) {
		if(_.isEmpty(err2)){
			res.redirect("/unsubscribe.html");
		} else {
			res.status(500).send("unsubscribe failed.");
		}
	});
  });
  
};
