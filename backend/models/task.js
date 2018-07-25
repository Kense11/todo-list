let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  name: String,
  action: String,
  status: Boolean,
  deskId: String
});

module.exports = mongoose.model('Task', schema);
