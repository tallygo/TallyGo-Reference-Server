var express = require('express');
var router = express.Router();
var util = require('util');
var _ = require('underscore');

var log = require('../lib/log');
var websockets = require('../lib/websockets');

function parseSession(req, res, next) {
  sessionID = req.get('x-temporary-id');
  if (typeof sessionID == 'undefined' || sessionID == '') {
    sessionID = 'anonymous';
  }
  
  req.sessionID = sessionID;
  next()
}

router.put('/current_location', parseSession, function(req, res) {
  if (req.body.latitude == null || req.body.longitude == null) {
    res.sendStatus(400);
    return;
  }
  
  log("Received driver current location from session " + req.sessionID + ": " + req.body.latitude + "," + req.body.longitude);
  
  websockets.broadcastEvent('current_location', req.body, req.sessionID);
  
  res.sendStatus(200);
});

router.put('/eta', parseSession, function(req, res) {
  if (req.body.ETA == null) {
    res.sendStatus(400);
    return;
  }
  
  log("Received driver ETA from session " + req.sessionID + ": " + req.body.ETA);
  
  websockets.broadcastEvent('eta', req.body, req.sessionID);
  
  res.sendStatus(200);
});

router.put('/route_segment', parseSession, function(req, res) {
  var routeSegment = req.body;
  
  if (routeSegment.points == null) {
    res.sendStatus(400);
    return;
  }
  
  var loggedInfo = util.inspect(_.extend(_.omit(routeSegment, 'points'), {'points': '(omitted for brevity)'}));
  
  log("Received driver route segment from session " + req.sessionID + ": " + loggedInfo);
  
  websockets.broadcastEvent('route_segment', req.body, req.sessionID);
  
  res.sendStatus(200);
});

module.exports = router;
