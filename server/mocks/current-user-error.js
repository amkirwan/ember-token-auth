module.exports = function(app) {
  var express = require('express');
  var currentUserRouter = express.Router();
  currentUserRouter.get('/', function(req, res) {
    res.status(500).send({error:{title: 'internal_service_error', detail: 'internal_service_error', status: '500'}});
  });
  app.use('/api/current_user_error', currentUserRouter);
};
