const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Course = new Schema(
  {
    name: { type: String, require:true, maxLength: 255 },
    desc: { type: String, maxLength: 600},
    thumbnail: { type: String, maxLength: 255},
    videoID: { type: String, require:true, maxLength: 255},
    level: { type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true},
  }, 
  {
    timestamps: true,
  },
);

//add plugin slug-generator
mongoose.plugin(slug);

//add plugin mongoose delete
Course.plugin(mongooseDelete, { 
  deletedAt:true, 
  overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', Course);
