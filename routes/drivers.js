var express = require('express');
var router = express.Router();
var moment = require('moment');

router.put('/current_location', function(req, res, next) {
  console.log(moment().format() + " - Received driver current location: " + req.body.latitude + "," + req.body.longitude);
  res.sendStatus(200);
});

module.exports = router;
