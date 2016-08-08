var gcStats = require('.');

gcStats.on('stats', function(stats) {
  console.log(JSON.stringify(stats, 0, 2));
});

var t = [];

setInterval(function(){
  for (var i = 0; i < 1000; i++) {
    t.push(new Date());
    t.push(new Date());
  }
}, 100);
