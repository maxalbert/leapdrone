var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.config('general:navdata_demo', 'FALSE');

function blink() {
    client.animateLeds('snakeGreenRed', 3, 10);
}

function reportLanded() {
   console.log("Yay! I have landed safely!");
}

client.on('landed', blink);
client.on('landed', reportLanded);

client.takeoff();
client
  .after(5000, function() {
    this.clockwise(0.1);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });

