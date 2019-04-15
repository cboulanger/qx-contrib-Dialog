(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Style": {},
      "qx.bom.Event": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["css.transition"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.client.CssTransition", {
    statics: {
      /**
       * Returns the (possibly vendor-prefixed) name of the CSS transition property
       * @return {String|null} transition property name or <code>null</code> if
       * not supported
       * @internal
       */
      getTransitionName: function getTransitionName() {
        return qx.bom.Style.getPropertyName("transition");
      },

      /**
       * Main check method which returns an object if CSS transitions are
       * supported. The object contains the following keys:
       * <ul>
       *  <li><code>name</code> The name of the CSS transition property</li>
       *  <li><code>end-event</code> The name of the end event</li>
       * </ul>
       *
       * @internal
       * @return {Object|null} The described object or <code>null</code> if
       * transitions are not supported.
       */
      getSupport: function getSupport() {
        var name = qx.bom.client.CssTransition.getTransitionName();
        if (!name) {
          return null;
        }

        var eventName = qx.bom.Event.getEventName(window, "transitionEnd");
        eventName = eventName == "transitionEnd" ? eventName.toLowerCase() : eventName;

        // Detecting the end event's name is not possible in some browsers,
        // so we deduce it from the property name instead.
        if (!eventName) {
          eventName = name + (name.indexOf("Trans") > 0 ? "E" : "e") + "nd";
        }

        return {
          name: name,
          "end-event": eventName
        };
      }
    },

    defer: function defer(statics) {
      qx.core.Environment.add("css.transition", statics.getSupport);
    }
  });
  qx.bom.client.CssTransition.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CssTransition.js.map?dt=1555325105844