The Crew Telemetry
================

NPM module to read telemetry data from Ubisoft's The Crew

How To
======
First, make sure you follow the directions provided [here.](http://forums.ubi.com/showthread.php/966396-MOTION-RIG-GUIDE-Telemetry-Ouput-for-PC-VERSION?s=59b64a9b95b61c12566101189aac8154)

**If you don't do this, The Crew will not broadcast the data.**

>In the ‘my Documents\The Crew’ folder, create a file ExtraConfig.xml.
>
>In this file add those lines
>```xml
<ExtraConfig
  phys_out_sim="127.0.0.1:1337"
  phys_out_sim_rate="3"
  phys_out_nitro_lean="0.5"
  />
```

After that, you can access all the data as a Javascript object like so:

```javascript

var ct = require('crew-telemetry')(1337); //1337 is the default port. You can also do an array of multiple ports

ct.on('data', function(data){
  //do stuff
});


//you can also receive the raw Buffer, remote address information,
//and port and parse it with the parse method, or parse it yourself.
ct.on('message', function(msg, rInfo, port){
  ct.parse(msg, rInfo, port);
});

ct.on('error' function(err){
  //do stuff
});

//or you can get the latest data with
var data = ct.data()

//you can also directly access the dgram server with
var server = ct.server();
server.close();
```
Available Data
==============
Property        | Value                                                 | Unit
----------------|-------------------------------------------------------|--------------------
time            | Incremented every packet sent.                        | N/A
angularVelocity | Angular velocity [pitch, roll, yaw]                   | Radians per second
orientation     | Euleer angles [yaw, pitch, roll]                      | Radians
velocity        | Linear velocity [lateral, longitudinal, vertical]     | Meters per second
acceleration    | Linear acceleration [lateral, longitudinal, vertical] | Meters per second²
position        | Position in world [x, y, z]                           | Meter times 65536
gameID          |                                                       | N/A
