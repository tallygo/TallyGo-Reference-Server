var express = require('express');
var router = express.Router();
var util = require('util');
var _ = require('underscore');

var log = require('../lib/log');
var websockets = require('../lib/websockets');

router.put('/current_location', function(req, res, next) {
  if (req.body.latitude == null || req.body.longitude == null) {
    res.sendStatus(400);
    return;
  }
  
  session_id = req.get('x-temporary-id');
  log("Received driver current location from session " + session_id + ": " + req.body.latitude + "," + req.body.longitude);
  
  websockets.broadcastEvent('current_location', req.body, session_id);
  
  res.sendStatus(200);
});

router.put('/eta', function(req, res, next) {
  if (req.body.ETA == null) {
    res.sendStatus(400);
    return;
  }
  
  session_id = req.get('x-temporary-id');
  log("Received driver ETA from session " + session_id + ": " + req.body.ETA);
  
  websockets.broadcastEvent('eta', req.body, session_id);
  
  res.sendStatus(200);
});

router.put('/route_segment', function(req, res, next) {
  var routeSegment = req.body;
  
  if (routeSegment.points == null) {
    res.sendStatus(400);
    return;
  }
  
  var loggedInfo = util.inspect(_.extend(_.omit(routeSegment, 'points'), {'points': '(omitted for brevity)'}));
  
  session_id = req.get('x-temporary-id');
  log("Received driver route segment from session " + session_id + ": " + loggedInfo);
  
  websockets.broadcastEvent('route_segment', req.body, session_id);
  
  res.sendStatus(200);
});

module.exports = router;
