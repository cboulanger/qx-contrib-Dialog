(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.AbstractMethodPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Method": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.panels.MethodPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,

    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Members", "qxl/apiviewer/image/method_public18.gif");
    },

    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && !dao.isStatic();
      }
    }

  });
  qxl.apiviewer.ui.panels.MethodPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MethodPanel.js.map?dt=1555325131352