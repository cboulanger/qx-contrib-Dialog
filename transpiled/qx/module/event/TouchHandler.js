(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Event": {
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {},
      "qx.event.handler.TouchCore": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.event.TouchHandler", {

    statics: {
      /**
       * List of events that require a touch handler
       */
      TYPES: ["touchstart", "touchend", "touchmove", "touchcancel"],

      /**
       * Creates a touch handler for the given element when a touch event listener
       * is attached to it
       *
       * @param element {Element} DOM element
       */
      register: function register(element) {
        if (!element.__touchHandler) {
          if (!element.$$emitter) {
            element.$$emitter = new qx.event.Emitter();
          }
          element.__touchHandler = new qx.event.handler.TouchCore(element, element.$$emitter);
        }
      },

      /**
       * Removes the touch event handler from the element if there are no more
       * touch event listeners attached to it
       * @param element {Element} DOM element
       */
      unregister: function unregister(element) {
        if (element.__touchHandler) {
          if (!element.$$emitter) {
            element.__touchHandler = null;
          } else {
            var hasTouchListener = false;
            var listeners = element.$$emitter.getListeners();
            qx.module.event.TouchHandler.TYPES.forEach(function (type) {
              if (type in listeners && listeners[type].length > 0) {
                hasTouchListener = true;
              }
            });
            if (!hasTouchListener) {
              element.__touchHandler = null;
            }
          }
        }
      }
    },

    defer: function defer(statics) {
      qxWeb.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
    }
  });
  qx.module.event.TouchHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TouchHandler.js.map?dt=1555325115142