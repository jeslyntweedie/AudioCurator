var mongoose = require('mongoose');


var postModel = new mongoose.Schema({
    body: {type: String},
    date: {type: String},
    displaydate: {type: String}
});

module.exports = mongoose.model('Posts', postModel);
