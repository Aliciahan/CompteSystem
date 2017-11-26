var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var piaoSchema = new Schema({
  idNum: {type: String , required: true, unique: true},
  bank: {type: String, required: true}
});

var Piao = mongoose.model('Piao', piaoSchema);

module.exports = Piao;
