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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.panels.ConstructorPanel", {
    extend: qxl.apiviewer.ui.panels.AbstractMethodPanel,

    construct: function construct() {
      qxl.apiviewer.ui.panels.AbstractMethodPanel.constructor.call(this, "Constructor", "qxl/apiviewer/image/constructor18.gif");
    },

    members: {
      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.Method && dao.getName() == "construct";
      },

      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getConstructor();
      }

    }
  });
  qxl.apiviewer.ui.panels.ConstructorPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConstructorPanel.js.map?dt=1555325131275