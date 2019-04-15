(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Native": {
        "require": true
      },
      "qx.log.appender.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestLoaderNative", {
    extend: qx.application.Native,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      main: function main() {
        qx.dev.unit.TestLoaderNative.prototype.main.base.call(this);

        // Dependencies to loggers
        qx.log.appender.Console;

        this.setTestNamespace(this._getClassNameFromUrl());

        if (window.top.jsUnitTestSuite) {
          this.runJsUnit();
          return;
        }

        if (window == window.top) {
          this.runStandAlone();
          return;
        }
      }
    }
  });
  qx.dev.unit.TestLoaderNative.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderNative.js.map?dt=1555325110421