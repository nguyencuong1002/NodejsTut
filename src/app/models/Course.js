const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, maxLength: 255 },
  desc: { type: String, maxLength: 600},
  thumnail: { type: String, maxLength: 255},
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
