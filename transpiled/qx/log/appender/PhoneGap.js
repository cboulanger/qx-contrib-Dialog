(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.log.appender.Util": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {
        "defer": "runtime"
      },
      "qx.bom.client.PhoneGap": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "phonegap": {
          "defer": true,
          "className": "qx.bom.client.PhoneGap"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.log.appender.PhoneGap", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Processes a single log entry
       * @param entry {Map} The entry to process
       */
      process: function process(entry) {
        var args = qx.log.appender.Util.toText(entry);
        var level = entry.level;
        if (level == "warn") {
          debug.warn(args);
        } else if (level == "error") {
          debug.error(args);
        } else {
          debug.log(args);
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */

    defer: function defer(statics) {
      function register() {
        if (window.debug) {
          qx.log.Logger.register(statics);
        } else {
          window.setTimeout(register, 200);
        }
      }

      if (qx.core.Environment.get("phonegap")) {
        register();
      }
    }
  });
  qx.log.appender.PhoneGap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PhoneGap.js.map?dt=1555325114433