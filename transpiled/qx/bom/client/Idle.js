(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["client.idle"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.client.Idle", {
    statics: {
      /**
       * Whether the client supports cooperative scheduling of background tasks.
       *
       * @internal
       * @return {Boolean} <code>true</code> if API is supported
       */
      getSupport: function getSupport() {
        return window.requestIdleCallback !== undefined;
      }
    },

    defer: function defer(statics) {
      qx.core.Environment.add("client.idle", statics.getSupport);
    }
  });
  qx.bom.client.Idle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Idle.js.map?dt=1555325106065