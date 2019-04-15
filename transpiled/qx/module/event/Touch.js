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
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.event.Touch", {
    statics: {
      /**
       * List of event types to be normalized
       */
      TYPES: ["tap", "longtap", "swipe", "dbltap"],

      /**
       * Manipulates the native event object, adding methods if they're not
       * already present
       *
       * @param event {Event} Native event object
       * @param element {Element} DOM element the listener was attached to
       * @param type {String} Event type
       * @return {Event} Normalized event object
       * @internal
       */
      normalize: function normalize(event, element, type) {
        if (!event) {
          return event;
        }
        event._type = type;
        return event;
      }
    },

    defer: function defer(statics) {
      qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
    }
  });
  qx.module.event.Touch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Touch.js.map?dt=1555325115134