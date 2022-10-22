var mongoose = require("mongoose"); //invoke mongo's moduke
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt"); // encryption for password
var titilize = require("mongoose-title-case"); //change the name in case of all the latters are capital, save it as title case for database. Ex: DILAN TASKIN --> DB: Dilan Taskin
var validate = require("mongoose-validator");

var nameValidator = [
  validate({
    validator: "matches",
    arguments:
      /^(([a-zA-Z]{2,})+[ ]+([a-zA-Z]{2,})+)+$/
  }),
];

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
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
});

UserSchema.plugin(titilize, {
  paths: ["name"],
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
