var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var events = require('events');
var eventEmitter = new events.EventEmitter();
var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

server.listen(8080);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (socket) {
  socket.on('mykeypress', function (data) {
    if (data === 32) {
        // Space: stop all activities and simply hover
        client.stop();
    } else if (data === 37) {
        // Arrow left: rotate counterclockwise
        client.counterClockwise();
    } else if (data === 39) {
        // Arrow right: rotate clockwise
        client.clockwise();
    } else if (data === 27) {
        // Escape: land the drone
        client.land();
    } else if (data === 13) {
        // Return: take off
        client.takeoff();
    } else if (data === 70 || data === 102) {
        client.animateLeds('snakeGreenRed', 3, 10);
    }
  });
});
~                      

//client.config('general:navdata_demo', 'FALSE');

function blink(client) {
    client.animateLeds('snakeGreenRed', 3, 10);
}

function setRotateSpeed(client, speed){
    client.clockwise(speed);
}
