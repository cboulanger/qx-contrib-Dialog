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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.event.Pinch", {
    statics: {
      /**
       * List of event types to be normalized
       */
      TYPES: ["pinch"],

      BIND_METHODS: ["getScale"],

      /**
       * Returns the calculated scale of this event.
       *
       * @return {Float} the scale value of this event.
       */
      getScale: function getScale() {
        return this._original.scale;
      },

      /**
       * Manipulates the native event object, adding methods if they're not
       * already present
       *
       * @param event {Event} Native event object
       * @param element {Element} DOM element the listener was attached to
       * @return {Event} Normalized event object
       * @internal
       */
      normalize: function normalize(event, element) {
        if (!event) {
          return event;
        }
        // apply mouse event normalizations
        var bindMethods = qx.module.event.Pinch.BIND_METHODS;
        for (var i = 0, l = bindMethods.length; i < l; i++) {
          if (typeof event[bindMethods[i]] != "function") {
            event[bindMethods[i]] = qx.module.event.Pinch[bindMethods[i]].bind(event);
          }
        }

        return event;
      }
    },

    defer: function defer(statics) {
      qxWeb.$registerEventNormalization(qx.module.event.Pinch.TYPES, statics.normalize);
    }
  });
  qx.module.event.Pinch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pinch.js.map?dt=1555325115087