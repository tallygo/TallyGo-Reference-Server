var moment = require('moment');

function log(message) {
  console.log(moment().format() + " - " + message);
}

module.exports = log;
