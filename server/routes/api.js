var express = require('express');
var router = express.Router();
var fs        = require('fs');
router.post('/upload-file', function(req, res, next) {
  var fstream;
  if (req.busboy) {

    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      fstream = fs.createWriteStream(__dirname + '/../../public/my-files/' + filename);
      file.pipe(fstream);
      fstream.on('close', function(){
        console.log('file ' + filename + ' uploaded');
      });
    });
    req.busboy.on('finish', function(){
      console.log('finish, files uploaded ');
      res.json({ success : true});
    });
    req.pipe(req.busboy);
  }
});

module.exports = router;
