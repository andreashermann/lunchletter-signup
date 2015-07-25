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
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey;
  var requestData = {
    event : "rate",
    entityType : "user",
    entityId : req.query.userid,
    targetEntityType: "restaurant",
    targetEntityId : req.query.restaurantid,
    properties : {
      rating: req.query.rating
    }
  };
  var response = request({ url: url, 
	method: "POST",
	json: true,
	headers: {
        	"content-type": "application/json",
	},
	body: requestData },
        function(err, res2, body) {
		if(_.isEmpty(err)){
			res.redirect("/rating_success.html");
		} else {
			res.status(404).send("Not found");
		}
	}
  );
};
