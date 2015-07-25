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

// Get list of things
exports.index = function(req, res) {
  var accessKey = process.env.ENGINE_ACCESS_KEY;
  var eventId = 0;
  
  var url = "http://lunchletter.ch:7070/events/"+eventId+".json?accessKey=" + accessKey;
  var requestData = {
    event : "add_user",
    entityType : "user",
    entityId : req.query.userid
  };
  
  var response = request({ url: url, 
	method: "DELETE",
	json: true,
	headers: {
        	"content-type": "application/json",
	},
  }, function(err, res2, body) {
		if(_.isEmpty(err)){
			res.redirect("/unsubscribe.html");
		} else {
			res.status(404).send("Not found");
		}
	}
  );
};
