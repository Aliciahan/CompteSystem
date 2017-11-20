var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureSchema = new Schema({
  huipiao: { type: Schema.Types.ObjectId, required: true},
  author: { type: Schema.Types.ObjectId, required: true},
  date: { type: Date, default: Date.now, required: true},
  url: { type: String, required: true}
});

var Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;


