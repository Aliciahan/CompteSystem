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








