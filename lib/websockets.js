var WebSocket = require('ws');
var util = require('util');

var log = require('../lib/log');

const websockets = {
  
  server: null,
  
  init: function(httpServer) {
    var server = new WebSocket.Server({ server: httpServer });
    
    server.on('connection', function(socket, request) {
      /**
       * NOTE: In the real world, you would want to add some kind of user authentication here.
       * Otherwise, any client who connects to this server using websockets (an open and publicly-documented protocol)
       * can receive all data that is broadcast, which may be private/sensitive data.
       */
      log("WebSockets client connected (" + server.clients.size + " total)");
      
      socket.on('close', function(code, reason) {
        log("WebSockets client disconnected (" + server.clients.size + " total)");
      });
    });
    
    this.server = server;
  },
  
  broadcastJSON: function(data) {
    var json = JSON.stringify(data);
    var numClients = 0;
    
    this.server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(json);
        numClients += 1;
      }
    });
    
    log("WebSockets broadcast to " + numClients + " clients: " + data.event_type);
  },
  
  broadcastEvent: function(event_type, payload) {
    this.broadcastJSON({
      'event_type': event_type,
      'payload': payload,
    });
  },
  
};

module.exports = websockets;
