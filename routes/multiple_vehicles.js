const express = require('express');
const router = express.Router();
const _ = require('underscore');
const log = require('../lib/log');
const websockets = require('../lib/websockets');

const eventBroadcastInterval = 1000;
const vehicle1Events = require("../demo_data/vehicle1Events.json");
const vehicle2Events = require("../demo_data/vehicle2Events.json");
const vehicle3Events = require("../demo_data/vehicle3Events.json");
const merged = vehicle1Events.reduce(function(arr, v, i) {
  return arr.concat(v, vehicle2Events[i], vehicle3Events[i])
}, [])

function slowEach(array, interval, callback) {
  if(!array.length) return;
  let i = 0;
  next();
  function next() {
    if (callback( array[i], i) !== false) {
      if (++i < array.length) { setTimeout(next, interval); }
    }
  }
}

router.get('/send_events', function(req, res, next) {
  slowEach(merged, eventBroadcastInterval, function(received_msg, index) {
    log(
      "Received driver current location for session " +
      received_msg.session_id + ": " +
      received_msg.payload.latitude + "," +
      received_msg.payload.longitude
    );
    websockets.broadcastEvent('current_location', received_msg.payload, received_msg.session_id);
  });
  res.sendStatus(200);
});

module.exports = router;
