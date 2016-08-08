var gcStats = require('bindings')('gcstats.node');
var EventEmitter = require('events').EventEmitter;

var emitter = module.exports = new EventEmitter();

gcStats.afterGC(emitter.emit.bind(emitter, 'stats'));
