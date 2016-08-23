(function(global, yate) {
  if (typeof module === 'object' && module.exports) {
    module.exports = yate;
  } else {
    global.yate = yate;
  }
})(this, function(__events) {
  var hasOwnProperty = Object.hasOwnProperty.bind(__events);

  function on(event, callback, context) {
    if (!hasOwnProperty(event)) {
      __events[event] = { handlers: [] };
    }
    __events[event].onlyOnce = false;

    return this.once(event, callback, context);
  }

  function off(event) {
    if (typeof event === 'string') {
      if (hasOwnProperty(event)) {
        return delete __events[event];
      }
    }
    if (event && typeof event === 'object') {
      var handlers = __events[event.event].handlers;

      return handlers.splice(event.handler, 1)[0].callback;
    }

    return false;
  }

  function once(event, callback, context) {
    if (!hasOwnProperty(event)) {
      __events[event] = { handlers: [], onlyOnce: true };
    }

    var handlerIndex = __events[event].handlers.findIndex(function(handler) {
      return (handler.callback === callback && handler.context === context);
    });

    if (handlerIndex === -1) {
      var length = __events[event].handlers.push({
        callback: callback,
        context: context
      });

      return { event: event, handler: length - 1 };
    }

    return { event: event, handler: handlerIndex };
  }

  function emit() {
    var arguments = Array.from(arguments);

    if (!arguments.length) return;

    var event = arguments[0];
    var args = arguments.slice(1);

    if (typeof event === 'string') {
      if (hasOwnProperty(event)) {
        var handlers = __events[event].handlers;

        for (var i = 0, length = handlers.length; i < length; i++) {
          handlers[i].callback.apply(handlers[i].context, args);
        }
        if (__events[event].onlyOnce) this.off(event);
      }
    }
    if (event && typeof event === 'object') {
      var handler = __events[event.event].handlers[event.handler];

      handler.callback.apply(handler.context, args);
      if (__events[event.event].onlyOnce) this.off(event);
    }
  }

  return { on: on, off: off, once: once, emit: emit };
}({}));
