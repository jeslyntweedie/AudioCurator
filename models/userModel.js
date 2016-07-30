var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');//encrypts the password

var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    displayName: {type: String, unique: true}
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);//encrypts password and does so 8 times. Default is 10. More encryptions means more time to process
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);//compares the given password with the encrypted stored password
};

module.exports = mongoose.model('User', userSchema);
