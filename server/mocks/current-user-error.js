module.exports = function(app) {
  var express = require('express');
  var currentUserRouter = express.Router();
  currentUserRouter.get('/', function(req, res) {
    res.status(500).send({"errors":[{"id":"1","status":"500","title":"internal_service_error","detail":"internal_service_error_detail"}]})
  });
  app.use('/api/current-user-error', currentUserRouter);
};
