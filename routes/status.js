module.exports = function(server, settings) {

  server.get('/v0/status', function(req, res, next) {
    res.json(true);
  });

};