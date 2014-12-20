module.exports = function(port){
  var dgram = require('dgram'),
  server = dgram.createSocket('udp4'),
  data = {
    time : 0,
    angularVelocity: [0,0,0],
    orientation: [0,0,0],
    acceleration: [0,0,0],
    velocity: [0,0,0],
    position: [0,0,0],
    gameid: 0
  },
  callbacks = {error: [],
               data: []};

  server.on('error', function (err) {
    callback('error', err);
  });

  server.on('message', function (msg) {
      data = {
        time: msg.readUInt32LE(0),
        angularVelocity: [msg.readFloatLE(4), msg.readFloatLE(8), msg.readFloatLE(12)],
        orientation: [msg.readFloatLE(16), msg.readFloatLE(20), msg.readFloatLE(24)],
        acceleration: [msg.readFloatLE(28), msg.readFloatLE(32), msg.readFloatLE(36)],
        velocity: [msg.readFloatLE(40), msg.readFloatLE(44), msg.readFloatLE(48)],
        position: [msg.readUInt32LE(52), msg.readUInt32LE(56), msg.readUInt32LE(60)],
        gameID: msg.readUInt32LE(64)
      };
      callback('data', data);
  });

  server.bind(port || 1337);

  function callback(message, data){
    var array = callbacks[message] || [];
    arr.forEach(function(callback){
      callback(data);
    });
  }

  return {
    on: function(message, callback){
      callbacks.message = callbacks.message || [];
      callbacks.message.push(callback);
    },
    data: function(){
      return data;
    },
    server: function(){
      return server;
    }
  };
}
