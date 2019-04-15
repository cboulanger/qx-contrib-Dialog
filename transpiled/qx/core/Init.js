(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Application": {
        "require": true
      },
      "qx.event.handler.Window": {
        "require": true
      },
      "qx.event.dispatch.Direct": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.BaseInit": {
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.core.Init", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Returns the instantiated qooxdoo application.
       *
       * @return {qx.core.Object} The application instance.
       */
      getApplication: qx.core.BaseInit.getApplication,

      /**
       * Runs when the application is loaded. Automatically creates an instance
       * of the class defined by the setting <code>qx.application</code>.
       *
       */
      ready: qx.core.BaseInit.ready,

      /**
       * Runs before the document is unloaded. Calls the application's close
       * method to check if the unload process should be stopped.
       *
       * @param e {qx.event.type.Native} Incoming beforeunload event.
       */
      __close: function __close(e) {
        var app = this.getApplication();
        if (app) {
          e.setReturnValue(app.close());
        }
      },

      /**
       * Runs when the document is unloaded. Automatically terminates a previously
       * created application instance.
       *
       */
      __shutdown: function __shutdown() {
        var app = this.getApplication();

        if (app) {
          app.terminate();
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */

    defer: function defer(statics) {
      qx.event.Registration.addListener(window, "ready", statics.ready, statics);
      qx.event.Registration.addListener(window, "shutdown", statics.__shutdown, statics);
      qx.event.Registration.addListener(window, "beforeunload", statics.__close, statics);
    }
  });
  qx.core.Init.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Init.js.map?dt=1555325107879