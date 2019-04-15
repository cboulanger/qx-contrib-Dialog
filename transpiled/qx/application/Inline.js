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
      "qx.ui.root.Page": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.application.Inline", {
    extend: qx.application.AbstractGui,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _createRootWidget: function _createRootWidget() {
        return new qx.ui.root.Page(document);
      }
    }
  });
  qx.application.Inline.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Inline.js.map?dt=1555325104196