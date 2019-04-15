(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Mobile": {
        "require": true
      },
      "qx.dev.unit.MTestLoader": {
        "require": true
      },
      "qx.log.appender.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestLoaderMobile", {
    extend: qx.application.Mobile,

    include: [qx.dev.unit.MTestLoader],

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      main: function main() {
        qx.dev.unit.TestLoaderMobile.prototype.main.base.call(this);

        // Dependencies to loggers
        qx.log.appender.Console;

        var url = this._getClassNameFromUrl();
        if (url !== "__unknown_class__") {
          this.setTestNamespace(this._getClassNameFromUrl());
        }

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
  qx.dev.unit.TestLoaderMobile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderMobile.js.map?dt=1555325110416