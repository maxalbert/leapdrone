var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var events = require('events');
var eventEmitter = new events.EventEmitter();

client.config('general:navdata_demo', 'FALSE');

function blink() {
    client.animateLeds('snakeGreenRed', 3, 10);
}

eventEmitter.on('someOccurence', function() {
    blink();
});

client.takeoff();
client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  .after(5000, function() {
    eventEmitter.emit('someOccurence');
    this.stop();
  })
  .after(5000, function() {
    this.stop();
    this.land();
  });

