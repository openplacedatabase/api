module.exports = function(server, settings) {

  server.get('/v0/search/places', function(req, res, next) {
    res.json(true);
  });

  server.get('/v0/search/maps', function(req, res, next) {
    res.json(true);
  });
  
};