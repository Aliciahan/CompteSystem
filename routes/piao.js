var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Piao = require('../models/piao');

var Utils = require('../modules/utils');



//进行汇票录入
router.post('/',
  createPiao,
  Utils.send
);

//查看所有汇票
router.get('/',getPiaos);
//查看某一个汇票 使用汇票的票号
router.get('/piaoid',getPiaoByPiaohao);
//查看某个汇票, 使用汇票系统分配的ID
router.get('/:id', getPiaoById );
router.put('/:id', updatePiao);
router.delete('/:id', deletePiaoById);


function getPiaoById(req,res,next){
  Piao.findById(req.params.id,function(err, piao){
    if(err) next(err);
    res.json(piao);
  })
}


function deletePiaoById(req,res,next) {
  Piao.findByIdAndRemove(req.params.id, function(err, piao){
    if(err) next(err);
    res.json(piao);
  })
}

function updatePiao(req,res,next){

  var changes = req.body;

  delete changes._id;
  delete changes.__v;
  delete changes.addDate;


  Piao.findByIdAndUpdate({_id:req.params.id},changes,{new:true, upsert:false, runValidators:true}, function onChangementTaken(err, piao){
    if(err) next(err);
    res.json(piao);
  });
}


function getPiaoByPiaohao(req,res,next){
  Piao.findOne({'idNum': req.query.idNum}).exec(function onPiaoFound(error, piao){
    if (error) return next(error);
    if (!piao) {
      var err = new Error ('Not found');
      err.status= 404;
      return next(err);
    }
    res.json(piao);
  })
}



function createPiao(req, res, next) {
  var piao = new Piao(req.body);
  piao.save(Utils.returnSavedEntity(req,res,next,201));
}


function getPiaos(req,res,next) {
  var order = 'addDate';
  var page = 1;
  var n = 0;

  if (req.query.order) {
    switch (req.query.order) {
      case 'add-date-desc': //  Date d'ajout Descendant
        break;
      case 'add-date-ace':
        order = '-addDate';
        break;
      case 'idNum-desc':
        order = "idNum";
        break;
      case 'idNum-ace':
        order = "-idNum";
        break;
      case 'endDate-desc':
        order = 'endDate';
        break;
      case 'endDate-ace':
        order = '-endDate';
        break;
      default:
        var err = new Error('Bad Request: order shoud in [add-date-desc, add-date-ace, idNum-desc, idNum-ace, endDate-desc, endDate-ace]');
        err.status = 400;
        return next(err);
    }
  }


  // Split Pages
  if (req.query.page) {
    page = parseInt(req.query.page);
    if (isNaN(page)) {
      var err = new Error('Page should be strictly be integer');
      err.status = 400;
      return next(err);
    }
    if (page <= 0) {
      var err = new Error('Page should be strictly be positive');
      err.status = 400;
      return next(err);
    }
    n = 25;
  }

  // Check Page Number
  if (req.query.n) {
    n = parseInt(req.query.n);
    if (isNaN(page)) {
      var err = new Error('N should be strictly be integer');
      err.status = 400;
      return next(err);
    }
    if (page <= 0) {
      var err = new Error('N should be strictly be positive');
      err.status = 400;
      return next(err);
    }
  }

  Piao.find({}, {idNum: true, bank: true, type: true, amount: true, endDate: true, addDate:true})
    .sort(order)
    .skip((page-1)*n)
    .limit(n)
    .exec(function returnPiaos(error, users){
      if (error) return next(error);
      res.json(users)
    });
}




module.exports = router;
