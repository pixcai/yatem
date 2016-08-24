(function(root, yatem) {
  if (typeof define === 'function' && define.amd) {
    define(['yatem'], yatem);
  } else if (typeof exports === 'object') {
    module.exports = yatem;
  } else {
    root.yatem = yatem;
  }
})(this, function(__events) {
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
    if (typeof event === 'string') {
      if (hasOwnProperty(event)) {
        delete __events[event];
        return true;
      }
    }
    if (event && typeof event === 'object' && event.name && hasOwnProperty(event.name)) {
      var handlers = __events[event.name].handlers;
      var handler = handlers[event.handler];

      if (typeof handler === 'function') {
        handlers[event.handler] = null;
        var validHandlers = handlers.filter(function(handler) {
          return handler !== null;
        });
        if (!validHandlers.length) {
          this.off(event.name);
        }
        return handler;
      }
    }
    if (typeof event !== 'boolean' && !event) {
      var self = this;
      Object.keys(__events).forEach(function(event) {
        self.off(event);
      });
      return true;
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
    var event = args[0];
    if (typeof event === 'string') {
      if (hasOwnProperty(event)) {
        var handlers = __events[event].handlers;
        for (var i = 0, length = handlers.length; i < length; i++) {
          handlers[i] && handlers[i].apply(null, args.slice(1));
        }
        if (__events[event].onlyOnce) {
          this.off(event);
        }
      }
    }
    if (typeof event === 'object' && event.name && hasOwnProperty(event.name)) {
      var handler = __events[event.name].handlers[event.handler];
      handler && handler.apply(null, args.slice(1));
      if (__events[event.name].onlyOnce) {
        this.off(event);
      }
    }
  }
  return {
    on: on,
    off: off,
    once: once,
    emit: emit
  };
}({}));
