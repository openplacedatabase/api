module.exports = function(server, settings) {

  server.get('/v0/changes', function(req, res, next) {
    res.json(true);
  });
  
};