var express = require('express');

module.exports = function(app) {
  var currentUserRouter = express.Router();
  currentUserRouter.get('/', function(req, res) {
    res.status(500).send({ error: 'login error' });
  });
  app.use('/api/current_user_error', currentUserRouter);
};
