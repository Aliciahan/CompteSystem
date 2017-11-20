var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pendingUploadSchema = new Schema({
  date: { type: Date, default: Date.now(), required: true},
  contentType: { type: String, require: true},
  content: { type: Schema.Types.Mixed, require: true},
  toUpdate: { type: Boolean, default: false}
});

var PendingUpload = mongoose.model('PendingUpload', pendingUploadSchema);

module.exports = PendingUpload;

