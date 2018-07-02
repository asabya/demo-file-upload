var express = require('express');
var router = express.Router();
var fs        = require('fs');
router.post('/upload-file', function(req, res, next) {
  var fstream;
  if (req.busboy) {


    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('file upload function');
      // Validate file mimetype
      if(mimetype != 'image/png'){
        console.log('mime not satisfied');
        file.resume();
        res.status(500).send('Invalid file format');
      }
      else {
        console.log('mime satisfied');
        fstream = fs.createWriteStream(__dirname + '/../../public/my-files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function(){
          console.log('file ' + filename + ' uploaded');
          return res.json({
            success: true
          });
        });
      }

    });
    req.pipe(req.busboy);
  }
});

module.exports = router;
