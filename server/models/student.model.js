const mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
  name: String,
  dob: String,
  phone: String
});

module.exports = mongoose.model('StudentObject', studentSchema);
