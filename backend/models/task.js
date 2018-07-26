let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  action: String,
  status: Boolean,
  deskId: String
});

module.exports = mongoose.model('Task', schema);
