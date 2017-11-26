var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var piaoSchema = new Schema({
  idNum: {type: String , required: true, unique: true},
  bank: {type: String, required: true},
  type: {
    type: String,
    enum: ['dianpiao', 'guogu'],
    required: true,
  },
  amount: {type: Number, required: true},
  endDate: {type: Date, required: true},
  addDate: {type: Date, default: Date.now(), required: true}
  //addEmployee: {type: Schema.Types.ObjectId, required: true}
});

var Piao = mongoose.model('Piao', piaoSchema);

module.exports = Piao;
