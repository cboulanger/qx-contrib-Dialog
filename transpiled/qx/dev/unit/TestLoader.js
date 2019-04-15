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
      "qx.application.Standalone": {
        "require": true
      },
      "qx.dev.unit.MTestLoader": {
        "require": true
      },
      "qx.log.appender.Console": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.testNameSpace": {},
        "qx.standaloneAutorun": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestLoader", {
    extend: qx.application.Standalone,

    include: [qx.dev.unit.MTestLoader],

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      main: function main() {
        qx.dev.unit.TestLoader.prototype.main.base.call(this);

        // Dependencies to loggers
        qx.log.appender.Console;

        var url = this._getClassNameFromUrl();
        if (url !== "__unknown_class__") {
          this.setTestNamespace(this._getClassNameFromUrl());
        } else {
          var namespace = qx.core.Environment.get("qx.testNameSpace");
          if (namespace) {
            this.setTestNamespace(namespace);
          }
        }

        if (window.top.jsUnitTestSuite) {
          this.runJsUnit();
          return;
        }

        if (window == window.top && qx.core.Environment.get("qx.standaloneAutorun")) {
          this.runStandAlone();
        }
      }
    }
  });
  qx.dev.unit.TestLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoader.js.map?dt=1555325110395