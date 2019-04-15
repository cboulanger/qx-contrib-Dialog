(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {},
      "qx.log.Logger": {},
      "qx.bom.client.OperatingSystem": {},
      "qx.Bootstrap": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "qx.application": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.core.BaseInit", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      __application: null,

      /**
       * Returns the instantiated qooxdoo application.
       *
       * @return {qx.core.Object} The application instance.
       */
      getApplication: function getApplication() {
        return this.__application || null;
      },

      /**
       * Runs when the application is loaded. Automatically creates an instance
       * of the class defined by the setting <code>qx.application</code>.
       *
       */
      ready: function ready() {
        if (this.__application) {
          return;
        }

        if (qx.core.Environment.get("engine.name") == "") {
          qx.log.Logger.warn("Could not detect engine!");
        }
        if (qx.core.Environment.get("engine.version") == "") {
          qx.log.Logger.warn("Could not detect the version of the engine!");
        }
        if (qx.core.Environment.get("os.name") == "") {
          qx.log.Logger.warn("Could not detect operating system!");
        }

        qx.log.Logger.debug(this, "Load runtime: " + (new Date() - qx.Bootstrap.LOADSTART) + "ms");

        var app = qx.core.Environment.get("qx.application");
        var clazz = qx.Class.getByName(app);

        if (clazz) {
          this.__application = new clazz();

          var start = new Date();
          this.__application.main();
          qx.log.Logger.debug(this, "Main runtime: " + (new Date() - start) + "ms");

          var start = new Date();
          this.__application.finalize();
          qx.log.Logger.debug(this, "Finalize runtime: " + (new Date() - start) + "ms");
        } else {
          qx.log.Logger.warn("Missing application class: " + app);
        }
      },

      /**
       * Runs before the document is unloaded. Calls the application's close
       * method to check if the unload process should be stopped.
       *
       * @param e {qx.event.type.Native} Incoming beforeunload event.
       */
      __close: function __close(e) {
        var app = this.__application;
        if (app) {
          app.close();
        }
      },

      /**
       * Runs when the document is unloaded. Automatically terminates a previously
       * created application instance.
       *
       */
      __shutdown: function __shutdown() {
        var app = this.__application;

        if (app) {
          app.terminate();
        }
      }
    }
  });
  qx.core.BaseInit.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseInit.js.map?dt=1555325107794