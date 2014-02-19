module.exports = function(server, settings) {

  var util = require('util');

  server.post('/v0/tools/convert', function(req, res, next) {
    var widthHeight = '',
        imagePath = req.files.image.path,
        outputPath = req.files.image.path + '.tif';
    //console.log(req.body);
    console.log(req.files.image.path);
    var command = util.format('gdal_translate %s %s -co PHOTOMETRIC=RGB -co PROFILE=BASELINE %s',imagePath, widthHeight, outputPath);
    console.log(command)

    res.json(true);
  });

  server.post('/v0/tools/warp', function(req, res, next) {
    res.json(true);
  });

};