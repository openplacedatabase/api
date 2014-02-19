module.exports = function(server, settings) {

  server.get('/v0/maps/:id', function(req, res, next) {
    res.json(true);
  });

  server.post('/v0/maps/:id', function(req, res, next) {
    res.json(true);
  });

};