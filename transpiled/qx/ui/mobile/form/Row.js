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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.Row", {
    extend: qx.ui.mobile.container.Composite,

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
      qx.ui.mobile.container.Composite.constructor.call(this, layout);
      this.initSelectable();
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
        init: "form-row"
      },

      /**
       * Whether the widget is selectable or not.
       */
      selectable: {
        check: "Boolean",
        init: false,
        apply: "_applyAttribute"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "li";
      }
    }
  });
  qx.ui.mobile.form.Row.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Row.js.map?dt=1555325122710