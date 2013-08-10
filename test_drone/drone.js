var arDrone = require('ar-drone');
var client  = arDrone.createClient();

function blink() {
    client.animateLeds("blinkGreenRed", 3, 20);
}

client.takeoff(blink);

client
  .after(5000, function() {
    this.clockwise(0.1);
  })
  .after(3000, function() {
    this.stop();
    this.front(0.1);
  })
  .after(2000, function() {
    this.stop();
    this.land();
  });
