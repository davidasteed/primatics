const mongoose = require('mongoose');

let crudObjectSchema = mongoose.Schema({
  crudObjectName: String
});

module.exports = mongoose.model('CrudObject', crudObjectSchema);
