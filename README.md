# yate

Yet Another Tiny Emitter
[![Build Status](https://travis-ci.org/pixcai/yate.svg?branch=master)](https://travis-ci.org/pixcai/yate)

## Install

Node and Browserify

```
npm install yate --save
```

```html
<script src="node_modules/dist/yate.min.js"></script>
``` 

## Usage

Node and Browserify

```js
var yate = require('yate');

yate.on('some-event', function (arg1, arg2, arg3) {
 // do something
});

yate.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
```

Browser

```js
yate.on('some-event', someCallback);
yate.emit('some-event');
```

## Instance Methods

### on(event, callback[, context])

Subscribe to an event

* `event` - the name of the event to subscribe to
* `callback` - the function to call when event is emitted
* `context` - (OPTIONAL) - the context to bind the event callback to

### once(event, callback[, context])

Subscribe to an event only **once**

* `event` - the name of the event to subscribe to
* `callback` - the function to call when event is emitted
* `context` - (OPTIONAL) - the context to bind the event callback to

### off(event)

Unsubscribe from an event.

* `event` - the name of the event to unsubscribe from or value return from yate.on() or yate.once()

### emit(event[, arguments...])

Trigger a named event

* `event` - the event name to emit
* `arguments...` - any number of arguments to pass to the event subscribers

## Test

```
npm install
npm test
```

## License

GPL-3.0