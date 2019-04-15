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
      "qx.dom.Node": {},
      "qx.event.Emitter": {},
      "qx.event.handler.OrientationCore": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.event.OrientationHandler", {

    statics: {
      /**
       * List of events that require an orientation handler
       */
      TYPES: ["orientationchange"],

      /**
       * Creates an orientation handler for the given window when an
       * orientationchange event listener is attached to it
       *
       * @param element {Window} DOM Window
       */
      register: function register(element) {
        if (!qx.dom.Node.isWindow(element)) {
          throw new Error("The 'orientationchange' event is only available on window objects!");
        }

        if (!element.__orientationHandler) {
          if (!element.$$emitter) {
            element.$$emitter = new qx.event.Emitter();
          }

          element.__orientationHandler = new qx.event.handler.OrientationCore(element, element.$$emitter);
        }
      },

      /**
       * Removes the orientation event handler from the element if there are no more
       * orientationchange event listeners attached to it
       * @param element {Element} DOM element
       */
      unregister: function unregister(element) {
        if (element.__orientationHandler) {
          if (!element.$$emitter) {
            element.__orientationHandler = null;
          } else {
            var hasListener = false;
            var listeners = element.$$emitter.getListeners();
            qx.module.event.OrientationHandler.TYPES.forEach(function (type) {
              if (type in listeners && listeners[type].length > 0) {
                hasListener = true;
              }
            });
            if (!hasListener) {
              element.__orientationHandler = null;
            }
          }
        }
      }
    },

    defer: function defer(statics) {
      qxWeb.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
    }
  });
  qx.module.event.OrientationHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OrientationHandler.js.map?dt=1555325115071