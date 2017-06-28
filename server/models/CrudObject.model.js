const mongoose = require('mongoose');

let CrudObjectSchema = mongoose.Schema({
  crudObjectName: String
});

module.exports = mongoose.model('CrudObject', CrudObjectSchema);
