var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var events = require('events');
var eventEmitter = new events.EventEmitter();

//client.config('general:navdata_demo', 'FALSE');

function blink(client) {
    client.animateLeds('snakeGreenRed', 3, 10);
}

function setRotateSpeed(client, speed){
    client.clockwise(speed);
}

eventEmitter.on('crazyBlink', blink);
eventEmitter.on('setRotateSpeed', setRotateSpeed);

client.takeoff();
client
  .after(5000, function() {
    eventEmitter.emit('setRotateSpeed', client, 0.5);
	eventEmitter.emit('crazyBlink', client);
  })
  .after(5000, function() {
    this.stop();
    this.land();
  });

