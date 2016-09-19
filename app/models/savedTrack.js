var mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var SavedTrackSchema = new Schema ({
	songType: String,
	songUrl: String	
});

module.exports = mongoose.model("SavedTrack", SavedTrackSchema);