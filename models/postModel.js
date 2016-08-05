var mongoose = require('mongoose');


var postModel = new mongoose.Schema({
    body: {type: String},                 // Post body
    date: {type: String},                 // Date posted
    displaydate: {type: String},          // Date posted in human readble format
    postedBy: {type: String},             // Who posted this track? In case there are multiple posters on the site
    trackInfo: {                          // --- Info pertaining to the track specifically ---
      title: {type: String},              // Track title. Soundcloud Often includes Artist
      streamURL: {type: String},          // URL to stream from
      apiURL: {type: String},             // In case we want more of SCs data later
      art: {type: String},                // For displaying album art
      soundcloudId: {type: String}
    }
});

module.exports = mongoose.model('Posts', postModel);
