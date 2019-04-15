(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.navigationbar.NavigationBar", {
    extend: qx.ui.mobile.container.Composite,

    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */

    construct: function construct(layout) {
      qx.ui.mobile.container.Composite.constructor.call(this, layout);
      if (!layout) {
        this.setLayout(new qx.ui.mobile.layout.HBox().set({
          alignY: "middle"
        }));
      }
    },

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigationbar"
      }
    }
  });
  qx.ui.mobile.navigationbar.NavigationBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NavigationBar.js.map?dt=1555325123241