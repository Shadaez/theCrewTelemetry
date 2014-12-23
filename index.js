module.exports = function(port){
  port = port || 1337;
  var dgram = require('dgram'),
  callbacks = {error: [], data: [], message: []},
  ports = Array.isArray(port) ? port : [port],
  returner;

  ports.forEach(function(port){
    server = dgram.createSocket('udp4')
    server.on('error', function (err) {
      callback('error', err);
    });

    server.on('message', function (msg, c) {
      callback('data', msg, c, port);
    });

    server.bind(port);
  });

  function callback(e, msg, c, port){
    try{
      if(e == 'data'){
        callbacks['message'].forEach(function(callback){
          callback(msg, c, port);
        });
        if (callbacks.data.length >= 1) {
          msg = parseData(msg, c, port);
          callbacks['data'].forEach(function(callback){
            callback(data);
          });
        }
      }
    } catch(err) {
      callback('error', err);
    }
  }

  function parseData(msg, c, port){
    return {
      time: msg.readUInt32LE(0),
      angularVelocity: [msg.readFloatLE(4), msg.readFloatLE(8), msg.readFloatLE(12)],
      orientation: [msg.readFloatLE(16), msg.readFloatLE(20), msg.readFloatLE(24)],
      acceleration: [msg.readFloatLE(28), msg.readFloatLE(32), msg.readFloatLE(36)],
      velocity: [msg.readFloatLE(40), msg.readFloatLE(44), msg.readFloatLE(48)],
      position: [msg.readUInt32LE(52), msg.readUInt32LE(56), msg.readUInt32LE(60)],
      gameID: msg.readUInt32LE(64),
      client: {ip: c.address, port: port}
    }
  }

  returner = {
    on: function(e, callback){
      callbacks[e] = callbacks[e] || [];
      callbacks[e].push(callback);
    },
    server: function(){
      return server;
    },
    parse: parseData
  };

  return returner;
};
