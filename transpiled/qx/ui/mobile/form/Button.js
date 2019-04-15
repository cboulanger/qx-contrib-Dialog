(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.basic.Atom": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.Button", {
    extend: qx.ui.mobile.basic.Atom,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "button"
      },

      // overridden
      activatable: {
        refine: true,
        init: true
      }
    },

    members: {
      /**
       * Sets the value.
       *
       * @param value {String} The value to set
       */
      setValue: function setValue(value) {
        this.setLabel(value);
      },

      /**
       * Returns the set value.
       *
       * @return {String} The set value
       */
      getValue: function getValue() {
        return this.getLabel();
      }
    }
  });
  qx.ui.mobile.form.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1555325122404