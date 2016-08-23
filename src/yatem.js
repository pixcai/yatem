(function(yate) {
  if (typeof module === "object" && module.exports) {
    module.exports = yate;
  } else {
    this.yate = yate;
  }
})(function(__events) {
  var hasOwnProperty = Object.hasOwnProperty.bind(__events);

  function on(event, callback, context) {
    if (!hasOwnProperty(event)) {
      __events[event] = {
        onlyOnce: false,
        handlers: []
      };
    }
    if (__events[event].onlyOnce) {
      return false;
    }
    var handler = __events[event].handlers.push(callback.bind(context)) - 1;
    return {
      name: event,
      handler: handler
    };
  }

  function off(event) {
    if (typeof event === "string") {
      if (hasOwnProperty(event)) {
        return delete __events[event];
      }
    }
    if (event && typeof event === "object" && hasOwnProperty(event.name)) {
      var handler = __events[event.name].handlers[event.handler];
      __events[event.name].handlers[event.handler] = null;
      return handler;
    }
    if (typeof event !== "boolean" && !event) {
      var self = this;
      return Object.keys(__events).reduce(function(result, event) {
        return self.off(event);
      }, false);
    }
    return false;
  }

  function once(event, callback, context) {
    if (!hasOwnProperty(event)) {
      __events[event] = {
        onlyOnce: true,
        handlers: []
      };
    }
    if (!__events[event].onlyOnce) {
      return false;
    }
    var handler = __events[event].handlers.push(callback.bind(context)) - 1;
    return {
      name: event,
      handler: handler
    };
  }

  function emit() {
    var args = Array.from(arguments);
    if (!args.length || args[0] === null) {
      var self = this;
      Object.keys(__events).forEach(function(event) {
        emit.apply(self, [].concat(event, args.slice(1)));
      });
      return;
    }
    if (typeof args[0] === "string") {
      if (hasOwnProperty(args[0])) {
        var handlers = __events[args[0]].handlers;
        for (var i = 0, length = handlers.length; i < length; i++) {
          handlers[i] && handlers[i].apply(null, args.slice(1));
        }
        if (__events[args[0]].onlyOnce) this.off(args[0]);
      }
    }
    if (typeof args[0] === "object") {
      var handler = __events[args[0].name].handlers[args[0].handler];
      handler && handler.apply(null, args.slice(1));
      if (__events[args[0].name].onlyOnce) this.off(args[0]);
    }
  }
  return {
    on: on,
    off: off,
    once: once,
    emit: emit
  };
}({}));
