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
      //console.log('we have errors');
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

    var imagePath,
        tmpPath,
        outputPath,
        gcpObj,
        gcpString = '',
        memoryLimit = '',
        transformOption = '', // auto -> , p1 -> -order 1, p2 -> -order 2, p3 -> -order 3, tps -> -tps, 
        resampleOption = '-rn', // near -> -rn, bilinear -> -rb, cubic -> -rc, cubicspline -> -rcs
        maskOption = '', // -srcnodata '17 17 17' and use masked file
        errors = [];

    // Set image and output paths
    if(req.files.image && req.files.image.path) {
      imagePath = req.files.image.path;
      tmpPath = imagePath + '.vrt';
      outputPath = imagePath + '.tif';
    } else {
      errors.push('image is required to be a file');
    }

    // Get gcp
    if(req.body.gcp) {
      try {
        gcpObj = JSON.parse(req.body.gcp);
      } catch(e) {
        errors.push('gcp must be a valid json object');
      }

      if(gcpObj) {
        errors = errors.concat(validateGCP(gcpObj));
      }

    } else {
      errors.push('gcp is required');
    }

    if(errors.length > 0) {
      console.log('we have errors');
      return res.send(api.format_return(400,errors));
    }

    // Create gcpString
    for(var x in gcpObj) {
      gcpString += '-gcp '+gcpObj[x].x+' '+gcpObj[x].y+' '+gcpObj[x].lat+' '+gcpObj[x].lon+' ';
    }

    // Define commands
    var translateCommand = util.format("gdal_translate -a_srs WGS84 -of VRT %s %s %s", imagePath, tmpPath, gcpString);
    
    // check for colorinterop=pal ? -disnodata 255 or -dstalpha
    var warpCommand = util.format("gdalwarp %s %s %s -dstalpha %s -s_srs WGS84 %s %s -co TILED=YES -co COMPRESS=JPEG -co JPEG_QUALITY=85",
          memoryLimit,
          transformOption,
          resampleOption,
          maskOption,
          tmpPath,
          outputPath);
    // We may not need this one?
    var addoCommand = util.format("gdaladdo -r average %s 2 4 8 16 32 64", outputPath);

    // Translate image to VRT format
    exec(translateCommand, function(error, stdout, stderr) {
      if(error) {
        // Error Out
        res.json(error);
      } else {

        exec(warpCommand, function(error, stdout, stderr) {
          if(error) {
            // Error Out
            res.json(error);
          } else {
            // Set headers and pipe image to output
            var stream = fs.createReadStream(outputPath);

            res.setHeader('content-type', 'image/tiff');
            stream.pipe(res);
          }
        }); // End warp
      }
    }); // End translate

  });

  function validateGCP(json) {
    var errors = [];
    // json must be an array
    if(!_.isArray(json)) {
      return ['gcp must be an array of gcp objects'];
    }

    // Each element must have the proper values
    for(var x in json) {
      var gcp = json[x];
      if(!_.isObject(gcp)) {
        errors.push('gcp['+x+'] is not an object');
        continue;
      }
      
      if(_.intersection(Object.keys(gcp),['lat','lon','x','y']).length != 4) {
        errors.push('gcp['+x+'] must contain x, y lat, and lon elements');
        continue;
      }
      if(!_.isFinite(gcp.x) || gcp.x < 0) {
        errors.push('gcp['+x+'].x must be a number >= 0');
      }
      if(!_.isFinite(gcp.y) || gcp.y < 0) {
        errors.push('gcp['+x+'].y must be a number >= 0');
      }
      if(!_.isFinite(gcp.lat) || gcp.lat < -90 || gcp.lat > 90) {
        errors.push('gcp['+x+'].lat must be a number between -90 and 90');
      }
      if(!_.isFinite(gcp.lon) || gcp.lon < -180 || gcp.lon > 180) {
        errors.push('gcp['+x+'].lon must be a number between -180 and 180');
      }

    }

    // Require at least 3 control points
    if(json.length < 3) {
      errors.push('You must specify at least 3 control points');
    }

    return errors;
  }

};