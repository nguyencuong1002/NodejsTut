const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const courseSchema = new Schema(
  {
    _id:{ type: Number, },
    name: { type: String, require:true, maxLength: 255},
    desc: { type: String, maxLength: 600},
    thumbnail: { type: String},
    videoID: { type: String, require:true, maxLength: 255},
    level: { type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true},
  }, 
  {
    timestamps: true,
  },
);

//Custom query helper
courseSchema.query.sortable = function (req) {
  if(req.query.hasOwnProperty('_sort')){
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidType ? req.query.type : 'desc',
    });
  }
  return this;
}

//add plugin slug-generator
mongoose.plugin(slug);

courseSchema.plugin(AutoIncrement);
//add plugin mongoose delete
courseSchema.plugin(mongooseDelete, { 
  deletedAt:true, 
  overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', courseSchema);
