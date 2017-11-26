var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Piao = require('../models/piao');

var Utils = require('../modules/utils');

/* GET home page. */
router.post('/',
  createPiao,
  Utils.send
);


function createPiao(req, res, next) {
  var piao = new Piao(req.body);
  piao.save(Utils.returnSavedEntity(req,res,next,201));
}


module.exports = router;
