module.exports = function(app) {
  var express = require('express');
  var currentUserRouter = express.Router();
  currentUserRouter.get('/', function(req, res) {
    // res.status(200).send({user:{'id':'1', 'firstname': 'foo', 'lastname': 'bar'}});
    res.status(200).send({"data":{"type":"users","id":"1","attributes":{"firstname":"foo","lastname":"bar"}}});
  });
  app.use('/api/current_user', currentUserRouter);
};
