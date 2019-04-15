(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Label": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": ["versionLabel.name", "versionLabel.version"],
      "required": {
        "versionLabel.name": {
          "construct": true
        },
        "versionLabel.version": {
          "construct": true
        },
        "qx.revision": {
          "construct": true
        },
        "qx.version": {
          "construct": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.versionlabel.VersionLabel", {
    extend: qx.ui.basic.Label,

    construct: function construct(value, version) {
      if (value == undefined) {
        // if no parameter value given: use the environment variable
        value = qx.core.Environment.get("versionLabel.name");
      }

      if (version == undefined) {
        // if no parameter value given: use the environment variable
        version = qx.core.Environment.get("versionLabel.version");

        if (version == null) {
          // revision or version number as fallback
          version = qx.core.Environment.get("qx.revision");
          if (version == "") {
            version = qx.core.Environment.get("qx.version");
          }
        }
      }

      qx.ui.basic.Label.constructor.call(this, value + " " + version);
    },

    defer: function defer() {
      /**
       * The name of the version label which is shown in the upper right corner.
       * Defaults to 'qooxdoo'.
       */
      qx.core.Environment.add("versionLabel.name", "qooxdoo");

      /**
       * The version string of the version label which is shown in the upper right corner.
       * Defaults to 'null' to be able to fallback to 'qx.revision' or 'qx.version' easily.
       */
      qx.core.Environment.add("versionLabel.version", null);
    }
  });
  qxl.versionlabel.VersionLabel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VersionLabel.js.map?dt=1555325130441