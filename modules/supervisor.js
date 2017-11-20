var mongoose = require('mongoose');

var PendingUpload = require('../models/pending_upload');

function Supervisor(config){
  cleanPendingUploads = function(){
    var  now = new Date();
    var minDate = new Date(now);
    minDate.setSeconds(now.getSeconds() + config.pendingUploadsValidity);

    var condition = { date: {$lt: minDate}};

    PendingUpload.remove(condition, function onPendingUploadsRemoved(error){
      if(error) console.log(error);
    });
  };

  setInterval(cleanPendingUploads, config.pendingUploadsValidity * 1000);
}

module.exports = Supervisor;