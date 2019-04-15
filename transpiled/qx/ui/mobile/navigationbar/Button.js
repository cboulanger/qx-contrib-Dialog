(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.Button": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.navigationbar.Button", {
    extend: qx.ui.mobile.form.Button,

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigationbar-button"
      }
    }
  });
  qx.ui.mobile.navigationbar.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1555325123235