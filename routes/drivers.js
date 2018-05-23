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
  
  log("Received driver current location: " + req.body.latitude + "," + req.body.longitude);
  
  websockets.broadcastEvent('current_location', req.body);
  
  res.sendStatus(200);
});

router.put('/eta', function(req, res, next) {
  if (req.body.ETA == null) {
    res.sendStatus(400);
    return;
  }
  
  log("Received driver ETA: " + req.body.ETA);
  
  websockets.broadcastEvent('eta', req.body);
  
  res.sendStatus(200);
});

router.put('/route_segment', function(req, res, next) {
  var routeSegment = req.body;
  
  if (routeSegment.points == null) {
    res.sendStatus(400);
    return;
  }
  
  var loggedInfo = util.inspect(_.extend(_.omit(routeSegment, 'points'), {'points': '(omitted for brevity)'}));
  
  log("Received driver route segment: " + loggedInfo);
  
  websockets.broadcastEvent('route_segment', routeSegment);
  
  res.sendStatus(200);
});

router.post('/motion', function (req, res, next) {
  var motion = req.body;
  
  if (motion.id == null || motion.points == null || motion.timeInterval == null) {
    res.sendStatus(400);
    return;
  }
  
  motion.timestamp = new Date()
  
  log("Received driver motion: " + util.inspect(motion));
  
  websockets.broadcastEvent('motion', motion);
  
  res.sendStatus(200);
});

module.exports = router;
