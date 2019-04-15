(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "require": true
      },
      "qx.ui.core.MResizable": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.container.Resizer", {
    extend: qx.ui.container.Composite,
    include: qx.ui.core.MResizable,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "resizer"
      }
    }
  });
  qx.ui.container.Resizer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Resizer.js.map?dt=1555325116687