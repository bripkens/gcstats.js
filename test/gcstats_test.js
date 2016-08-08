var expect = require('chai').expect;
var semver = require('semver');

var gcStats = require('..');

var expectedDetailKeys = [
  'totalHeapSize',
  'usedHeapSize',
  'totalHeapExecutableSize',
  'heapSizeLimit'
];

// This v8 property became available with node 0.11+.
if (semver.gte(semver.clean(process.version), '0.11.0')) {
  expectedDetailKeys.push('totalPhysicalSize');
}

describe('gcstats.js', function() {
  afterEach(function() {
    gcStats.removeAllListeners('stats');
  });

  it('must define timing information', withGcStats(function(stats) {
    expect(stats.start).to.be.a('number');
    expect(stats.end).to.be.a('number');
  }));

  it('must define information aboute the GC type', withGcStats(function(stats) {
    expect(stats.gctype).to.be.a('number');
  }));

  it('must define details about heap sizes before and after GCs', withGcStats(function(stats) {
    ['before', 'after'].forEach(function(stage) {
      expectedDetailKeys.forEach(function(key) {
        expect(stats[stage][key]).to.be.a('number');
      });
    });
  }));
});


function withGcStats(fn) {
  return function(done) {
    gcStats.on('stats', function(stats) {
      fn(stats);
      done();
    });

    global.gc();
  };
}
