(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.Input": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.form.MValue": {
        "require": true
      },
      "qx.ui.mobile.form.MText": {
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.NumberField", {
    extend: qx.ui.mobile.form.Input,
    include: [qx.ui.mobile.form.MValue, qx.ui.mobile.form.MText],
    implement: [qx.ui.form.IStringForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param value {var?null} The value of the widget.
     */
    construct: function construct(value) {
      qx.ui.mobile.form.Input.constructor.call(this);
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
        init: "number-field"
      },

      /**
       * The minimum text field value (may be negative). This value must be smaller
       * than {@link #minimum}.
       */
      minimum: {
        check: "Number",
        init: '',
        apply: "_onChangeMinimum"
      },

      /**
       * The maximum text field value (may be negative). This value must be larger
       * than {@link #maximum}.
       */
      maximum: {
        check: "Number",
        init: '',
        apply: "_onChangeMaximum"
      },

      /**
       * The amount to increment on each event.
       */
      step: {
        check: "Number",
        init: '',
        apply: "_onChangeStep"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getType: function _getType() {
        return "number";
      },

      /**
       * Called when changed the property step.
       * Delegates value change on DOM element.
       */
      _onChangeStep: function _onChangeStep(value, old) {
        this._setAttribute("step", value);
      },

      /**
       * Called when changed the property maximum.
       * Delegates value change on DOM element.
       */
      _onChangeMaximum: function _onChangeMaximum(value, old) {
        this._setAttribute("max", value);
      },

      /**
       * Called when changed the property minimum.
       * Delegates value change on DOM element.
       */
      _onChangeMinimum: function _onChangeMinimum(value, old) {
        this._setAttribute("min", value);
      }
    }
  });
  qx.ui.mobile.form.NumberField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NumberField.js.map?dt=1555325122581