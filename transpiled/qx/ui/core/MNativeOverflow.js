(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qx.ui.core.MNativeOverflow", {
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether the widget should have horizontal scrollbars.
       */
      overflowX: {
        check: ["hidden", "visible", "scroll", "auto"],
        nullable: true,
        apply: "_applyOverflowX"
      },

      /**
       * Whether the widget should have vertical scrollbars.
       */
      overflowY: {
        check: ["hidden", "visible", "scroll", "auto"],
        nullable: true,
        apply: "_applyOverflowY"
      },

      /**
       * Overflow group property
       */
      overflow: {
        group: ["overflowX", "overflowY"]
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // property apply
      _applyOverflowX: function _applyOverflowX(value) {
        this.getContentElement().setStyle("overflowX", value);
      },

      // property apply
      _applyOverflowY: function _applyOverflowY(value) {
        this.getContentElement().setStyle("overflowY", value);
      }
    }
  });
  qx.ui.core.MNativeOverflow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MNativeOverflow.js.map?dt=1555325117493