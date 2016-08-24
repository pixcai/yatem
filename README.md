# yatem

Yet Another Tiny Event Emitter

[![Build Status](https://travis-ci.org/pixcai/yatem.svg?branch=master)](https://travis-ci.org/pixcai/yatem)
[![npm](https://img.shields.io/npm/v/yatem.svg?style=flat-square)](https://www.npmjs.com/package/yatem)
[![npm](https://img.shields.io/npm/dt/yatem.svg?style=flat-square)](https://www.npmjs.com/package/yatem)
[![npm](https://img.shields.io/npm/l/yatem.svg?style=flat-square)](https://www.npmjs.com/package/yatem)

## Install

Node
```
npm install yatem --save
```

Browser
```html
<script src="node_modules/dist/yatem.min.js"></script>
``` 

## Usage

Node

```js
var yatem = require('yatem');

var e1 = yatem.on('my-event1', function () {
	console.log('This is event: my-event1');
});
var e2 = yatem.on('my-event1', function (args) {
  console.log('This is also event: my-event1, and args is: ', args);
});
var e3 = yatem.once('my-event3', function () {
	console.log('This is event: my-event3');
});

yatem.emit('my-event1', 'hello, world');
// output:
// > This is event: my-event1
// > This is also event: my-event1, and args is: hello, world

yatem.off(e2);
yatem.emit('my-event1'); // or yatem.emit(e1)
// output:
// > This is event: my-event1

yatem.emit('my-event3');
// output:
// > This is event: my-event3

yatem.emit('my-event3'); // again, it will do nothing
```

Browser

```js
yatem.on('my-event', function () {
	console.log('This is event: my-event');
});

yatem.emit('my-event');
// output:
// > This is event: my-event
```

## Instance Methods

### on(event, callback[, context])

Subscribe to an event

* `event` - the name of the event to subscribe
* `callback` - the function to call when event is emitted
* `context` - (OPTIONAL) - the context to bind the event callback

If subscribe successful, return an object, that can use for yatem.off() and yatem.emit(). Otherwise return false.

```js
var e1 = yatem.once('my-event', callback);	// typeof e1 === 'object'
var e2 = yatem.on('my-event', callback);	// e2 === false

yatem.emit(e1); // Ok
yatem.emit(e2); // Do nothing
```

### once(event, callback[, context])

Subscribe to an event only **once**

* `event` - the name of the event to subscribe
* `callback` - the function to call when event is emitted
* `context` - (OPTIONAL) - the context to bind the event callback

If subscribe successful, return an object, that can use for yatem.off() and yatem.emit(). Otherwise return false.

### off(event)

Unsubscribe from an event.

* `event` - the name of the event to unsubscribe or value that return from yate.on() or yate.once()

If event is null or undefined, and not boolean type, it will unsubscribe all events.

```js
var e1 = yatem.on('my-event', callback1);
var e2 = yatem.on('my-event', callback2);

yatem.off(); // Unsubscribe all events, or use yatem.off(null)
// Notice: yatem.off(false) WILL NOT unsubscribe all events, it will do nothing

yatem.emit(e1); // Do nothing
yatem.emit(e2); // Do nothing
```

### emit(event[, arguments...])

Trigger a named event or all events

* `event` - the event name to emit
* `arguments...` - any number of arguments to pass to the event subscribers

If event is null or undefined, and not boolean type, it will emit all events.

```js
var e1 = yatem.on('my-event', callback1);
var e2 = yatem.on('my-event', callback2);

yatem.emit(); // Emit all events, or use yatem.emit(null[, arguments...])
// Notice: yatem.emit(false) WILL NOT emit any events, it will do nothing
```

## Test

```
npm install
npm test
```

## License

GPL-3.0