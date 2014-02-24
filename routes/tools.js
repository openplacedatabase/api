module.exports = function(server, settings) {

  var util = require('util'),
      exec = require('child_process').exec,
      _ = require('underscore')._,
      api = require(__dirname + '/../lib/api.js');

  server.post('/v0/tools/convert', function(req, res, next) {
    var imagePath,
        outputPath,
        widthHeight = '',
        errors = [];

    // Set image and output path
    if(req.files.image && req.files.image.path) {
      imagePath = req.files.image.path;
      outputPath = imagePath + '.tif';
    } else {
      errors.push('image is required to be a file');
    }

    // If both width and height are set, use them
    if(req.query.width && req.query.height) {
      
      if(!_.isFinite(req.query.width) || req.query.width < 1 || req.query.width > 5000) {
        errors.push('width must be a number between 1 (inclusive) and 5000(inclusive)');
      }
      if(!_.isFinite(req.query.height) || req.query.height < 1 || req.query.height > 5000) {
        errors.push('width must be a number between 1 (inclusive) and 5000(inclusive)');
      }

      widthHeight = '-outsize '+req.query.width+' '+req.query.height;
    } else if(req.query.width || req.query.height) {
      errors.push('both width and height must be set ');
    }
    
    if(errors.length > 0) {
      console.log('we have errors');
      return res.send(api.format_return(400,errors));
    }

    // -expand rgb needed for pngs
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

    var imagePath = req.files.image.path,
        tmpPath = imagePath + '.vrt',
        outputPath = tmpPath + '.tif',
        gcpString = '';

    var command = util.format("gdal_translate -a_srs WGS84 -of VRT %s %s %s", imagePath, tmpPath, gcpString);

    var command = util.format("gdalwarp %s %s %s -dstalpha %s -s_srs WGS84 %s %s -co TILED=YES -co COMPRESS=LZW", memoryLimit, transformOption, resampleOption, maskOption, tmpPath, outputPath);

    // We may not need this one?
    var command = util.format("gdaladdo -r average %s 2 4 8 16 32 64", outputPath);

    res.json(true);
  });

};