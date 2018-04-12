var express = require('express');
var router = express.Router();
var moment = require('moment');

router.put('/current_location', function(req, res, next) {
  if (req.body.latitude == null || req.body.longitude == null) {
    res.sendStatus(400);
    return;
  }
  
  console.log(moment().format() + " - Received driver current location: " + req.body.latitude + "," + req.body.longitude);
  res.sendStatus(200);
});

router.put('/eta', function(req, res, next) {
  if (req.body.ETA == null) {
    res.sendStatus(400);
    return;
  }
  
  console.log(moment().format() + " - Received driver ETA: " + req.body.ETA);
  res.sendStatus(200);
});

module.exports = router;
