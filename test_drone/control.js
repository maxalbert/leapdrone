var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var events = require('events');
var eventEmitter = new events.EventEmitter();
var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

client.disableEmergency();

server.listen(8080);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (socket) {
  socket.on('mykeypress', function (data) {
    if (data === ) {
        // Space: stop all activities and simply hover
        client.stop();
    } else if (data === 37) {
        // Arrow left: rotate counterclockwise
        client.counterClockwise(0.5);
    } else if (data === 39) {
        // Arrow right: rotate clockwise
        client.clockwise(0.5);
    } else if (data === 76 || data === 108) {
        // Escape: land the drone
        client.land();
    } else if (data === 13) {
        // Return: take off
        client.takeoff();
    } else if (data === 70 || data === 102) {
        client.animateLeds('snakeGreenRed', 3, 10);
    } else {
        client.animateLeds('blinkOrange', 3, 5);
    }
  });
});
~                      

//client.config('general:navdata_demo', 'FALSE');
