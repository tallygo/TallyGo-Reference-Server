var WebSocket = require('ws');
var moment = require('moment');
var util = require('util');

const websockets = {
  
  server: null,
  
  init: function(httpServer) {
    this.server = new WebSocket.Server({ server: httpServer });
  },
  
  broadcastRaw: function(data) {
    var numClients = 0;
    
    /**
     * NOTE: In the real world, you would want to add some kind of user authentication.
     * Otherwise, any client who connects to this server using websockets (an open and publicly-documented protocol)
     * can receive all data that is broadcast, which may be private/sensitive data.
     */
    this.server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        numClients += 1;
      }
    });
    
    console.log(moment().format() + " - WebSockets broadcast to " + numClients + " clients: " + data.event_type);
  },
  
  broadcast: function(event_type, payload) {
    this.broadcastRaw({
      'event_type': event_type,
      'payload': payload,
    });
  },
  
};

module.exports = websockets;
