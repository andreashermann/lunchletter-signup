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

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}

// code from: http://www.giangrandi.ch/soft/swissgrid/swissgrid.shtml
function ch1903_wgs84(east, north, hgt)
{
    // Convert origin to "civil" system, where Bern has coordinates 0,0.
    east -= 600000;                          
    north -= 200000;

	// Express distances in 1000km units.
    east /= 1E6;
    north /= 1E6;

	// Calculate longitude in 10000" units.
    var lon = 2.6779094;
    lon += 4.728982 * east;
    lon += 0.791484 * east * north;
    lon += 0.1306 * east * north * north;
    lon -= 0.0436 * east * east * east;
	                      
    // Calculate latitude in 10000" units.
    var lat = 16.9023892;
    lat += 3.238272 * north;
    lat -= 0.270978 * east * east;
    lat -= 0.002528 * north * north;
    lat -= 0.0447 * east * east * north;
    lat -= 0.0140 * north * north * north;
                                      
    // Convert height [m].
    hgt += 49.55;
    hgt -= 12.60 * east;
    hgt -= 22.64 * north;
        
    // Convert longitude and latitude back in degrees.
    lon *= 100 / 36;                                    
    lat *= 100 / 36;
    
    return { latitude: lat, longitude: lon, height: hgt};
}

function manhattanDistance(c1,c2) {
	return Math.abs(c1.latitude - c2.latitude) + Math.abs(c1.longitude - c2.longitude);
}

function twoNormDistance(c1,c2) {
	var x = Math.abs(c1.latitude - c2.latitude);
	var y = Math.abs(c1.longitude - c2.longitude);
	return Math.sqrt(x*x + y*y);
}

/** Converts numeric degrees to radians */
function toRadians(num) {
	return num * Math.PI / 180;
}

//http://www.movable-type.co.uk/scripts/latlong.html
// haversine formula
function dist(lat1,lon1,lat2,lon2) {
	var R = 6371000; // metres
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians(lat2-lat1);
	var Δλ = toRadians(lon2-lon1);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d;
}

// Get list of things
exports.index = function(req, res) {
  var accessKey = process.env['ENGINE_ACCESS_KEY'];
  var url = "http://lunchletter.ch:7070/events.json?accessKey=" + accessKey + "&event=add_restaurant&limit=1000";
  var response = request(
  	{ 
  		url: url, 
		method: "GET",
		json: true,
		headers: {
        	"content-type": "application/json",
		},
	},
    function(err, res2, restaurants) {
    	//console.log(restaurants);
    	if (req.query.latitude && req.query.longitude) {
    		// Merkurstrasse 43: 47.3673455,8.5543996
    		var userCoord = { latitude: req.query.latitude, longitude: req.query.longitude };
    		console.log("query with coordinate: " + userCoord.latitude + "," + userCoord.longitude);
    	
    		restaurants.forEach(function(r) {
    			var c = ch1903_wgs84(r.properties.coordinate_x, r.properties.coordinate_y, 0);
    			//r.properties.distance = twoNormDistance(userCoord, c);
    			r.properties.distance = dist(userCoord.latitude, userCoord.longitude, c.latitude, c.longitude);
    			//console.log(r.properties.name + ":" + c.latitude + "," + c.longitude + " " + r.properties.distance);
    		});
    		restaurants.sort(function(a,b) {
    			return a.properties.distance - b.properties.distance;
    		});
    	} else {
    		shuffle(restaurants);
    	}
    	
    	// return at most 20 restaurants
		res.json(restaurants.splice(0,20));
	}
  );
};
