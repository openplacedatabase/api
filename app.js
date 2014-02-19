var restify = require('restify');
    server = restify.createServer(),
    fs = require('fs'),
    path = require('path');

var settings = {
  backing: process.env.OPD_BACKING ? process.env.OPD_BACKING : 'fs', // Options are s3 or fs
  backing_fs_directory: process.env.OPD_BACKING_FS_DIR ? process.env.OPD_BACKING : path.join(__dirname,'data'),
  backing_s3_bucket: process.env.OPD_BACKING_S3_BUCKET ? process.env.OPD_BACKING_S3_BUCKET : '',
  backing_s3_prefix: process.env.OPD_BACKING_S3_PREFIX ? process.env.OPD_BACKING_S3_PREFIX : '',
  logging: process.env.OPD_LOGGING ? process.env.OPD_LOGGING : 'fs', // Options are s3 or fs
  logging_fs_file: process.env.OPD_LOGGING_FS_FILE ? process.env.OPD_LOGGING_FS_FILE : path.join(__dirname,'changes.log'),
  logging_s3_bucket: process.env.OPD_LOGGING_S3_BUCKET ? process.env.OPD_LOGGING_S3_BUCKET : '',
  logging_s3_prefix: process.env.OPD_LOGGING_S3_PREFIX ? process.env.OPD_LOGGING_S3_PREFIX : '',
  elasticsearch_host: process.env.OPD_ES_HOST ? process.env.OPD_ES_HOST : 'localhost',
  elasticsearch_port: process.env.OPD_ES_PORT ? process.env.OPD_ES_PORT : 9200,
  elasticsearch_index: process.env.OPD_ES_INDEX ? process.env.OPD_ES_INDEX : 'places',
  credentials_file: process.env.OPD_CRED_FILE ? process.env.OPD_CRED_FILE : path.join(__dirname,'.credentials.json')
};



// Require all routes
require("fs").readdirSync(__dirname+"/routes").forEach(function(file) {
  require(__dirname+"/routes/" + file)(server, settings);
});

server.listen(8080, function() {
  console.log('listening at %s', server.url);
});