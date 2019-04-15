(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.navigationbar.Button": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.navigationbar.BackButton", {
    extend: qx.ui.mobile.navigationbar.Button,

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigationbar-backbutton"
      }
    }
  });
  qx.ui.mobile.navigationbar.BackButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BackButton.js.map?dt=1555325123221