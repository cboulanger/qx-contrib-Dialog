var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      "qx.ui.form.IField": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.CheckBox", {
    extend: qx.ui.mobile.form.Input,
    include: [qx.ui.mobile.form.MValue],
    implement: [qx.ui.form.IField],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param value {Boolean?false} The value of the checkbox.
     */
    construct: function construct(value) {
      qx.ui.mobile.form.Input.constructor.call(this);

      if ((typeof value === "undefined" ? "undefined" : _typeof(value)) != undefined) {
        this._state = value;
      }

      this.addListener("tap", this._onTap, this);
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
        init: "checkbox"
      }

    },

    members: {
      _state: null,

      // overridden
      _getTagName: function _getTagName() {
        return "span";
      },

      // overridden
      _getType: function _getType() {
        return null;
      },

      /**
       * Handler for tap events.
       */
      _onTap: function _onTap() {
        // Toggle State.
        this.setValue(!this.getValue());
      },

      /**
       * Sets the value [true/false] of this checkbox.
       * It is called by setValue method of qx.ui.mobile.form.MValue mixin
       * @param value {Boolean} the new value of the checkbox
       */
      _setValue: function _setValue(value) {
        if (value == true) {
          this.addCssClass("checked");
        } else {
          this.removeCssClass("checked");
        }

        this._setAttribute("checked", value);

        this._state = value;
      },

      /**
       * Gets the value [true/false] of this checkbox.
       * It is called by getValue method of qx.ui.mobile.form.MValue mixin
       * @return {Boolean} the value of the checkbox
       */
      _getValue: function _getValue() {
        return this._state;
      }
    },

    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.removeListener("tap", this._onTap, this);
    }
  });
  qx.ui.mobile.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1555325122425