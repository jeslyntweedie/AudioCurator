var mongoose = require('mongoose');


var postModel = new mongoose.Schema({
    body: {type: String},                 // Post body
    date: {type: String},                 // Date posted
    displaydate: {type: String},          // Date posted in human readble format
    trackInfo: {                          // --- Info pertaining to the track specifically ---
      artist: {type: String},             // Artist name
      title: {type: String},              // Track title
      streamURL: {type: String},          // URL to stream from
      apiURL: {type: String},             // In case we want more of SCs data later
      art: {type: String}                 // For displaying album art
    }
});

module.exports = mongoose.model('Posts', postModel);
