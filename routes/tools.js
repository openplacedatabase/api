module.exports = function(server, settings) {

  var util = require('util'),
      exec = require('child_process').exec;

  server.post('/v0/tools/convert', function(req, res, next) {
    var widthHeight = '',
        imagePath = req.files.image.path,
        outputPath = req.files.image.path + '.tif';
    
    var command = util.format('gdal_translate %s %s -co PHOTOMETRIC=RGB -co PROFILE=BASELINE %s',imagePath, widthHeight, outputPath);
    //console.log(command)

    // Call command using exec
    exec(command, function(error, stdout, stderr) {
      // Clean up original image
      
      if(error) {
        // Error Out
        res.json(error);
      } else {
        // Set headers and pipe image to output
        var stream = fs.createReadStream(outputPath);

        res.setHeader('content-type', 'image/tiff');
        stream.pipe(res);
      }
    });
  });

  server.post('/v0/tools/warp', function(req, res, next) {
    res.json(true);
  });

};