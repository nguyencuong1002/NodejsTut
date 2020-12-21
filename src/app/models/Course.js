const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

//add plugin slug-generator
mongoose.plugin(slug);

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, require:true, maxLength: 255 },
  desc: { type: String, maxLength: 600},
  thumbnail: { type: String, maxLength: 255},
  videoID: { type: String, require:true, maxLength: 255},
  level: { type: String, maxLength: 255},
  slug: { type: String, slug: 'name', unique: true},
  }, {
  timestamps: true,
});

module.exports = mongoose.model('Course', Course);
