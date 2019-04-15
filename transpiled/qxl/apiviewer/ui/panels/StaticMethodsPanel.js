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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.panels.StaticMethodsPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,

    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Static Members", ["qxl/apiviewer/image/method_public18.gif", "qxl/apiviewer/image/overlay_static18.gif"]);
    },

    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && dao.isStatic();
      },

      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getStatics();
      }
    }
  });
  qxl.apiviewer.ui.panels.StaticMethodsPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StaticMethodsPanel.js.map?dt=1555325131290