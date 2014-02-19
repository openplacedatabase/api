module.exports = function(server, settings) {

  server.post('/v0/tools/convert', function(req, res, next) {
    res.json(true);
  });

  server.post('/v0/tools/warp', function(req, res, next) {
    res.json(true);
  });

};