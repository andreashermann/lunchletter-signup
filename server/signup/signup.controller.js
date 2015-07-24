/**

      var
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
  var accessKey = process.env['ENGINE_ACCESS_KEY'];
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey;
  var requestData = {
    event : "add_user",
    entityType : "user",
    entityId : req.query.userid,
    latitude : req.query.lat,
    longitude : req.query.long
  };
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