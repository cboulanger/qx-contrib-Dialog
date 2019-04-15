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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.tabbar.TabButton", {
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
        init: "tabButton"
      },

      /**
       * The associated view.
       */
      view: {
        check: "qx.ui.mobile.core.Widget",
        nullable: false,
        init: null,
        apply: "_applyView",
        event: "changeView"
      }
    },

    members: {
      // property apply
      _applyView: function _applyView(value, old) {
        value.exclude();
      }
    }
  });
  qx.ui.mobile.tabbar.TabButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TabButton.js.map?dt=1555325123391