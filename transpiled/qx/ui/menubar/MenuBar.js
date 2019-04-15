(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.toolbar.ToolBar": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.menubar.MenuBar", {
    extend: qx.ui.toolbar.ToolBar,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Appearance of the widget */
      appearance: {
        refine: true,
        init: "menubar"
      }
    }
  });
  qx.ui.menubar.MenuBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuBar.js.map?dt=1555325121535