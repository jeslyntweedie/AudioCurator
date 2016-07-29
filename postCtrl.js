var postModel = require('./postModel.js');

module.exports = {
  create: function(req, res) {
    var post = new postModel(req.body);
    post.save(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  read: function(req, res) {
    postModel
    .find(
      // req.query
      )
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      console.log(result);
      res.send(result);
    });
  },
  getPost: function(req, res) {
    postModel
    .findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  update: function(req, res){
    postModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  delete: function(req, res){
    postModel
    .findByIdAndRemove(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  }


};