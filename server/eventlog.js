var config = require('./config/environment');
var Keen = require("keen-js");

var client = new Keen(config.keen);

module.exports = function(eventName, properties){
	if (!config.keen.writeKey) {
		console.log("event not logged (config.[env].keen.writeKey not set): " + eventName, properties);
		return;
	}

  	client.addEvent(eventName, properties, function(err, res) {
    	if (err) {
        	console.log("event logger failed: " + eventName, properties);
    	} else {
    		console.log("event logged: " + eventName, properties);
    	}
	});
}

