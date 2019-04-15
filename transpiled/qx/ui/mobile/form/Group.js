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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.Group", {
    extend: qx.ui.mobile.container.Composite,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param widgets {qx.ui.mobile.core.Widget[]}
     * @param showBorder {Boolean?} initial value of the property showBorder.
     */
    construct: function construct(widgets, showBorder) {
      qx.ui.mobile.container.Composite.constructor.call(this);

      this.addCssClass("bordered");

      if (showBorder != null) {
        this.setShowBorder(showBorder);
      }

      // Convenience: Add all widgets of array to group.
      if (widgets) {
        for (var i = 0; i < widgets.length; i++) {
          this.add(widgets[i]);
        }
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
        init: "group"
      },

      /**
       * Defines whether a border should drawn around the group.
       */
      showBorder: {
        check: "Boolean",
        init: true,
        apply: "_onChangeShowBorder"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Reacts on change of showBorder property.
       */
      _onChangeShowBorder: function _onChangeShowBorder() {

        if (this.isShowBorder() == true) {
          this.addCssClass("bordered");
        } else {
          this.removeCssClass("bordered");
        }
      }
    }
  });
  qx.ui.mobile.form.Group.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Group.js.map?dt=1555325122447