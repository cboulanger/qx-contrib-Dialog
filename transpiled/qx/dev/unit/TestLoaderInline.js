(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Inline": {
        "require": true
      },
      "qx.dev.unit.MTestLoader": {
        "require": true
      },
      "qx.log.appender.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestLoaderInline", {
    extend: qx.application.Inline,

    include: [qx.dev.unit.MTestLoader],

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      main: function main() {
        qx.dev.unit.TestLoaderInline.prototype.main.base.call(this);

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
  qx.dev.unit.TestLoaderInline.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderInline.js.map?dt=1555325110409