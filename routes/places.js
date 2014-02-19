module.exports = function(server, settings) {

  server.get('/v0/places/:id', function(req, res, next) {
    res.json(true);
  });

  server.post('/v0/places/:id', function(req, res, next) {
    res.json(true);
  });

  server.post('/v0/places/', function(req, res, next) {
    res.json(true);
  });

  server.delete('/v0/places/:id', function(req, res, next) {
    res.json(true);
  });

};