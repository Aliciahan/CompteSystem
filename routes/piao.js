var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Piao = require('../models/piao');
var url = require('url');
var exec = require('child_process').exec;
var Checks = require('../modules/checks');

var Utils = require('../modules/utils');

var PendingUpload = require('../models/pending_upload');

var config = require('../config.json');

//进行汇票录入
router.post('/',
    Checks.auth('admin'),
    createPiao,
    Utils.cleanEntityToSend(),
    Utils.send);

//查看所有汇票

router.get('/', getPiaos);
//查看所有有效的
router.get('/currentpiaos', getCurrentPiaos);
router.get('/check', checkPiao);

//查看某一个汇票 使用汇票的票号
router.get('/piaoid', getPiaoByPiaohao);

//查看某个汇票, 使用汇票系统分配的ID
router.get('/:id', getPiaoById);
router.put('/:id',
    Checks.auth('admin'),
    updatePiao);
router.delete('/:id',
    Checks.auth('admin'),
    deletePiaoById);


function checkPiao(req, res, next) {
    var cmdStr = 'curl -s http://rmfygg.court.gov.cn/psca/lgnot/bulletin/' + req.query.idNum + '_0_0.html | grep "公示催告\\|裁判文书"';
    exec(cmdStr, function(err, stdout, stderr) {
        if (err) {
            // 此处是当命令没有找到相关的问题的时候
            if (stderr === "") {
                res.send("");
            } else {
                //此处是当命令运行出错时候
                console.log("stderr:" + stderr);
                console.log("err:" + err);
                res.send('errserver');
            }

        } else {
            var result = stdout.toString();
            res.send(result);
        }
    })
}

function getPiaoById(req, res, next) {
    Piao.findById(req.params.id, function(err, piao) {
        if (err) next(err);
        res.json(piao);
    })
}

function deletePiaoById(req, res, next) {
    Piao.findByIdAndRemove(req.params.id, function(err, piao) {
        if (err) next(err);
        res.json(piao);
    })
}

function updatePiao(req, res, next) {

    var changes = req.body;

    delete changes._id;
    delete changes.__v;


    Piao.findByIdAndUpdate({ _id: req.params.id }, changes, { new: true, upsert: false, runValidators: true }, function onChangementTaken(err, piao) {
        if (err) next(err);
        res.json(piao);
    });
}

function getPiaoByPiaohao(req, res, next) {
    Piao.findOne({ 'idNum': req.query.idNum }).exec(function onPiaoFound(error, piao) {
        if (error) return next(error);
        if (!piao) {
            var err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
        res.json(piao);
    })
}

function createPiao(req, res, next) {
    var piao = new Piao(req.body);
    if (!req.body.setHeaderPhoto) {
        piao.save(Utils.returnSavedEntity(req, res, next, 201));
    } else {
        piao.validate(function onPiaoValidated(err) {
            if (err) return next(err);

            var pendingUpload = new PendingUpload({
                contentType: "piao",
                content: piao
            });
            pendingUpload.save(sendUploadURL);
        });
    }

    function sendUploadURL(error, pendingUpload) {
        if (error) next(error);

        var uploadPath = '/upload/' + pendingUpload._id;
        var uploadURL = url.resolve(config.serverURL, uploadPath);
        console.log('uploadURL:' + uploadURL.toString());
        res.redirect(204, uploadURL);
    }
}


function getPiaos(req, res, next) {
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
            case 'amount-ace':
                order = '-amount';
                break;
            case 'amount-desc':
                order = 'amount';
                break;
            case 'bank-desc':
                order = 'bank';
                break;
            case 'bank-ace':
                order = '-bank';
                break;
            case 'type-ace':
                order = '-type';
                break;
            case 'type-desc':
                order = 'type';
                break;
            default:
                var err = new Error('Bad Request: order shoud in [add-date-desc, add-date-ace, idNum-desc, idNum-ace, endDate-desc, endDate-ace]');
                err.status = 400;
                return next(err);
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
    }

    Piao.find({}, { idNum: true, bank: true, type: true, amount: true, endDate: true, addDate: true, isSold: true, soldDate: true })
        .sort(order)
        .skip((page - 1) * n)
        .limit(n)
        .exec(function returnPiaos(error, users) {
            if (error) return next(error);
            res.json(users)
        });
}

function getCurrentPiaos(req, res, next) {
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
            case 'amount-ace':
                order = '-amount';
                break;
            case 'amount-desc':
                order = 'amount';
                break;
            case 'bank-desc':
                order = 'bank';
                break;
            case 'bank-ace':
                order = '-bank';
                break;
            case 'type-ace':
                order = '-type';
                break;
            case 'type-desc':
                order = 'type';
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

    Piao.find({ 'isSold': { "$in": ["false", false] } }, { idNum: true, bank: true, type: true, amount: true, endDate: true, addDate: true, isSold: true, soldDate: true })
        .sort(order)
        .skip((page - 1) * n)
        .limit(n)
        .exec(function returnPiaos(error, users) {
            if (error) return next(error);
            res.json(users)
        });
}

module.exports = router;