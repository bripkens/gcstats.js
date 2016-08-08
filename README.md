# gcstats.js &nbsp; [![Build Status](https://travis-ci.org/bripkens/gcstats.js.svg?branch=master)](https://travis-ci.org/bripkens/gcstats.js) [![Dependency Status](https://david-dm.org/bripkens/gcstats.js/master.svg)](https://david-dm.org/bripkens/gcstats.js/master) [![npm version](https://badge.fury.io/js/gcstats.js.svg)](https://badge.fury.io/js/gcstats.js)

Exposes statistics about V8 garbage collections (GCs) after they have been executed.

---

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
- [Usage](#usage)
- [Property insights](#property-insights)
- [Node version compatibility](#node-version-compatibility)
- [Credits](#credits)

<!-- /TOC -->


## Installation

```
npm install --save gcstats.js
```


## Usage
Require the module and subscribe to the `stats` event:

```javascript
var gcStats = require('gcstats.js');

gcStats.on('stats', function(stats) {
  console.log(stats);
});
```

This will print blobs like this whenever a GC happens:

```json
{
  "start": 271925068593439,
  "end": 271925070343402,
  "gctype": 1,
  "before": {
    "totalHeapSize": 10481664,
    "totalHeapExecutableSize": 5242880,
    "usedHeapSize": 5761048,
    "heapSizeLimit": 1535115264,
    "totalPhysicalSize": 10481664
  },
  "after": {
    "totalHeapSize": 11530240,
    "totalHeapExecutableSize": 5242880,
    "usedHeapSize": 5512464,
    "heapSizeLimit": 1535115264,
    "totalPhysicalSize": 11530240
  }
}
```

## Property Insights
 * `start`: Start time of the GC measured using [uv_hrtime](http://docs.libuv.org/en/v1.x/misc.html#c.uv_hrtime) (nanoseconds).
 * `end`: End time of the GC measured using [uv_hrtime](http://docs.libuv.org/en/v1.x/misc.html#c.uv_hrtime) (nanoseconds).
 * `totalHeapSize`: Number of bytes V8 has allocated for the heap. This can grow if usedHeap needs more.
 * `usedHeapSize`: Number of bytes in use by application data
 * `totalHeapExecutableSize`: Number of bytes for compiled bytecode and JITed code
 * `heapSizeLimit`: The absolute limit the heap cannot exceed
 * `totalPhysicalSize`: Commited size (node 0.11+)
 * `gctype`: What kind of GC was executed. Refer to the v8 docs of the [`GCType`](https://github.com/nodejs/node/blob/eb172feebf994c904c5f940498f491c9bc64e7a8/deps/v8/include/v8.h#L5165-L5172) enum for a list of possible values.


## Node Vversion Compatibility
GC stats depend on C++ extensions which are compiled when the `gcstats.js` module is installed. Compatibility information can be inspected via the [Travis-CI build jobs](https://travis-ci.org/bripkens/gcstats.js/).


## Credits
`node-gcstats` was written by @dainis and later adapted by @bripkens and renamed to `gcstats.js`.
