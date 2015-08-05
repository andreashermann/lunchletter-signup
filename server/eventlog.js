var Keen = require("keen-js");

var client = new Keen({
    projectId: "55c249e459949a551c0d4bac",
    writeKey: "1e00c1890b98ea29dd5ed06b62fdc54f6f774093e98275a60e0e1e33fa97f9ee01bfdbc43279bf2ef8c5a8d008c54ecf82c48cf1e02f69507695f12fcc6ec2387a015beb195ccdca34db8efe3a6a1c028801c9a95c8be178cad4cc385d1ea77a06aff0d457b871509113e753d9f9832b"
});

module.exports = function(eventName, properties){
  	client.addEvent(eventName, properties, function(err, res) {
    	if (err) {
        	console.log("event logger failed: " + eventName, properties);
    	} else {
    		console.log("event logged: " + eventName, properties);
    	}
	});
}

