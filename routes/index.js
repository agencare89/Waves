var express = require("express"); 
var mongoose = require("mongoose");

var configDB = require("../config/database.js");
mongoose.connect(configDB.url);

var SavedTrack = require("../app/models/savedTrack.js");
var router = express.Router(); 

router.get("/", function(req, res, next) { 
	res.render("index");
});

router.get("/playlist", function(req, res, next) {
	SavedTrack.find(function(err, tracks) {
		if (err) console.log(err);
		res.send(tracks);
	});
});

router.post("/playlist", function(req, res, next) {
	var savedTrack = new SavedTrack();
	savedTrack.songUrl = req.body.songUrl;
	savedTrack.songType = req.body.songType;
	
	var upsertData = savedTrack.toObject();
	delete upsertData._id;
	
	SavedTrack.update( {songUrl: savedTrack.songUrl}, upsertData, {upsert:true}, function(err) {
		if(err) console.log(err);
	});
	
	res.end();
});

router.delete("/playlist", function(req, res, next) {
	SavedTrack.remove({songUrl: req.body.songUrl}, function(err, data) {
		if (err) console.log(err);
		res.end();		
	});
});

module.exports = router; 