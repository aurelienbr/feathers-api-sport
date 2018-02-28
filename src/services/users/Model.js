const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});
const Model = mongoose.model('Message', UsersSchema);

module.exports = Model;
