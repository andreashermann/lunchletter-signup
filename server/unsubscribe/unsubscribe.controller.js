'use strict';

var _ = require('lodash');
var request = require('request');
var accessKey = process.env.ENGINE_ACCESS_KEY;

function deleteEvent(eventId, callback) {
  var url = "http://lunchletter.ch:7070/events/"+eventId+".json?accessKey=" + accessKey;
  var response = request({ url: url, 
	method: "DELETE",
	json: true,
	headers: {
			"content-type": "application/json",
	},
  }, 
  function(err, res2, body) {
	if(_.isEmpty(err)){
		res.redirect("/unsubscribe.html");
	} else {
		res.status(404).send("Not found");
	}
  });
}

// Get list of things
exports.index = function(req, res) {
  
  // TODO: fetch eventId from entityId
  // entityId : req.query.userid
  var eventId = req.query.eventId;
  
  if (req.query.eventId) {
  	deleteEvent(req.query.eventId);
  }
  
};
