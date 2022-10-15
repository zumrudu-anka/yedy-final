var mongoose    = require("mongoose"); //invokes mongo's module
var Schema      = mongoose.Schema;
var bcrypt      = require("bcrypt");

var formSchema = new Schema({
  area: { type: String, lowercase: true, required: true },
  responsive: { type: String, lowercase: true, required: true },
  name: { type: String, required: true },
  tema: { type: String, lowercase: true, required: true },
});

module.exports = mongoose.model('Form', formSchema);


// var mongoose = require('mongoose');

// var Form = mongoose.model('Form1', {
//   area: { type: String, lowercase: true, required: true },
//   responsive: { type: String, lowercase: true, required: true },
//   name: { type: String, required: true },
//   tema: { type: String, lowercase: true, required: true }
// });

// module.exports = { Form }
