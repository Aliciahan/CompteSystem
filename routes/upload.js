var express =require('express');
var mongoose = require('mongoose');
var fileType = require('file-type');
var uuid = require('uuid');

var Checks = require('../modules/checks');
var Utils = require('../modules/utils');

// Models data
var PendingUpload = require('../models/pending_upload');
var Piao = require('../models/piao');
var Picture = require('../models/picture');


// Function modules
var FileSaver = require('../modules/filesaver');


// Personal configurations
var config = require('../config.json');


var router = express.Router();

router.param('id', getPendingUpload);


function getPendingUpload(req, res, next, id){
  PendingUpload.findById(id, {}, function onPendingFound(error, pendingUpload){
    if (error) next(error);

    if(!pendingUpload) {
      var err = new Error('Not Found!');
      err.status = 404;
      return next(err);
    }

    req.pendingUpload = pendingUpload;

    next();
  });
}


router.put('/:id', upload, Utils.send);

function upload(req, res, next) {
  var pendingUpload = req.pendingUpload;
  var contentType = pendingUpload.contentType;
  var mimeType = fileType(req.body).mime;

  pendingUpload.remove(function onPendingUpdateRemoved(error) {
    if (error) return next(error);
  });

  var fileSaver = new FileSaver(config.fileUpload);

  switch (req.get('Content-Type')) {
    case 'image/jpeg':
      if (mimeType !== 'image/jpeg')
        return badContentType();

      if (!(contentType === 'piao' || contentType === 'picture'))
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.jpg';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    case 'image/png':
      if (mimeType !== 'image/png')
        return badContentType();

      if (!(contentType === 'piao' || contentType === 'picture'))
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.png';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    case 'text/plain':
      if (mimeType !== 'text/plain')
        return badContentType();

      if (contentType !== 'document')
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.txt';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    case 'application/pdf':
      if (mimeType !== 'application/pdf')
        return badContentType();

      if (contentType !== 'document')
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.pdf';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    case 'application/msword':
      if (mimeType !== 'application/msword')
        return badContentType();

      if (contentType !== 'document')
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.doc';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    case 'application/vnd.oasis.opendocument.text':
      if (mimeType !== 'application/vnd.oasis.opendocument.text')
        return badContentType();

      if (contentType !== 'document')
        return unsupportedMediaType();

      var fileName = uuid.v4() + '.odt';
      fileSaver.save(fileName, req.body, onFileSaved);
      break;

    default:
      return unsupportedMediaType();
  }

  function badContentType() {
    var err = new Error('Bad Request: Content-Type does not correspond');
    err.status = 400;
    return next(err);
  }

  function unsupportedMediaType() {
    var err = new Error('Unsupported Media Type');
    err.status = 415;
    return next(err);
  }

  function onFileSaved(error, url) {
    if (error) return next(error);

    switch (contentType) {
      case 'piao':
        var piao = new Piao(pendingUpload.content);
        piao.headerPhoto = url;

        if (pendingUpload.toUpdate) {
          piao.isNew = false;
          var onPiaoSaved = Utils.returnSavedEntity(req, res, next);
        }
        else {
          var onPiaoSaved = Utils.returnSavedEntity(req, res, next, 201);
        }

        piao.save(onPiaoSaved);
        break;

      case 'picture':
        var picture = new Picture(pendingUpload.content);
        picture.url = url;

        var onPictureSaved = Utils.returnSavedEntity(req, res, next, 201);
        picture.save(onPictureSaved);
        break;

      case 'document':
        var document = new Document(pendingUpload.content);
        document.type = mimeType;
        document.url = url;

        var onDocumentSaved = Utils.returnSavedEntity(req, res, next, 201);
        document.save(onDocumentSaved);
        break;
    }
  }
}


module.exports = router;



