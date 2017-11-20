var fs =  require('fs');
var path = require('path');
var url = require('url');


function FileSaver(config){
  switch (config.method) {
    case 'local':
      this.save = function (fileName, content, callback){
        var filePath = path.join(config.options.uploadDir, fileName);

        fs.writeFile(filePath, content, function onFileSaved(error){
          if(error) return callback(error);

          var fileURL = url.resolve(config.options.fileServerURL, fileName);
          callback(null, fileURL);
        });
      };
      break;

    default:
      var err = new Error('FileSaver: Unknown Method ' + config.method);
      throw err;
  }
}

module.exports = FileSaver;

