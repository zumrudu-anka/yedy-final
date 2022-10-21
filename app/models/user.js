var mongoose = require("mongoose"); //invoke mongo's moduke
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
});

//encryption password
UserSchema.pre("save", function (next) {
  //before saving do this
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    console.log(hash);
    next();
  });

  // bcrypt.genSalt(saltRounds, function(err,salt){
  //     bcrypt.hash(user.password, salt, function(err, hash){
  //         user.password = hash;
  //         console.log(hash);
  //     });
  // });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
