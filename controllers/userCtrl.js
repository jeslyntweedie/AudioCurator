var userModel = require('./../models/userModel.js'); //Create user model

module.exports = {
  login: function(req, res, next){ //passport does most of this. We just have to send back the response
      res.send();
  },

  getMe: function(req,res) {      //Find current user
    if(!req.user){                // Check that a user is logged in. (passport middleware creates req.user for logged in users)
      console.log("no req.user!");
      return res.send();
    }
    userModel
    .findById(req.user._id)       //req.user is a passport functionality
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },

  logout: function(req,res) {     // Logs out the current user
    req.logout();                 // req.logout is a method created by passport middleware
    console.log(req + " has been logged out");
    res.send();
  },

  create: function(req, res) {
    var user = new userModel(req.body);
    user.save(function(err, result){
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },

  read: function(req, res) {
    userModel
    .findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);

      }
      res.send(result);
    });
  },

  getall: function(req, res) {
    userModel
    .find(req.query)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },

  update: function(req, res){
    userModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },

  delete: function(req, res){
    console.log(req.user._id, req.params.id);
      userModel
      .findByIdAndRemove(req.params.id, req.body, function(err, result){
        if (err) {
          res.send(err);
        }
        res.send(result);
      });
  }
};
