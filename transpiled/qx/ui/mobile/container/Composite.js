(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.core.MChildrenHandling": {
        "defer": "runtime",
        "require": true
      },
      "qx.ui.mobile.core.MLayoutHandling": {
        "defer": "runtime",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.container.Composite", {
    extend: qx.ui.mobile.core.Widget,
    include: [qx.ui.mobile.core.MChildrenHandling, qx.ui.mobile.core.MLayoutHandling],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param layout {qx.ui.mobile.layout.Abstract?null} The layout that should be used for this
     *     container
     */
    construct: function construct(layout) {
      qx.ui.mobile.core.Widget.constructor.call(this);
      if (layout) {
        this.setLayout(layout);
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */

    defer: function defer(statics, members) {
      qx.ui.mobile.core.MChildrenHandling.remap(members);
      qx.ui.mobile.core.MLayoutHandling.remap(members);
    }
  });
  qx.ui.mobile.container.Composite.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Composite.js.map?dt=1555325121708