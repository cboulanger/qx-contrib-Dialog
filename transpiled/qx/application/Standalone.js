(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Init": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.AbstractGui": {
        "require": true
      },
      "qx.ui.root.Application": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.application.Standalone", {
    extend: qx.application.AbstractGui,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _createRootWidget: function _createRootWidget() {
        return new qx.ui.root.Application(document);
      }
    }
  });
  qx.application.Standalone.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Standalone.js.map?dt=1555325104257