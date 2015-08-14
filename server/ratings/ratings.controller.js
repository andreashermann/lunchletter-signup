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
var accessKey = process.env.ENGINE_ACCESS_KEY;

// Get list of ratings
exports.index = function(req, res) {
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey + "&event=rate&limit=-1";

  if (req.query.entityId) {
  	url += "&entityId=" + req.query.entityId;
  }
  
  console.log("get ratings", url);
  var response = request(
  	{
  		url: url,
		method: "GET",
		json: true,
		headers: {
        	"content-type": "application/json",
		},
	},
  	function(err, res2, ratings) {
		res.status(200).json(ratings);
	}
  );
};

// delete rating
exports.destroy = function(req, res) {
  var eventId = req.params.id;
  console.log("delete rating " + eventId);
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
		res.status(200).send();
	} else {
		res.status(404).send("Not found");
	}
  });
};
