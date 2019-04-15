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
      "qx.ui.mobile.form.MValue": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.mobile.form.MState": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.mobile.container.Composite": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.ToggleButton", {
    extend: qx.ui.mobile.core.Widget,
    include: [qx.ui.mobile.form.MValue, qx.ui.form.MForm, qx.ui.form.MModelProperty, qx.ui.mobile.form.MState],
    implement: [qx.ui.form.IField, qx.ui.form.IForm, qx.ui.form.IModel],

    /**
     * @param value {Boolean?null} The value of the button
     * @param labelChecked {Boolean?"ON"} The value of the text display when toggleButton is active
     * @param labelUnchecked {Boolean?"OFF"} The value of the text display when toggleButton is inactive
     */
    construct: function construct(value, labelChecked, labelUnchecked) {
      qx.ui.mobile.core.Widget.constructor.call(this);

      if (labelChecked && labelUnchecked) {
        this.__labelUnchecked = labelUnchecked;
        this.__labelChecked = labelChecked;
      }

      this._setAttribute("data-label-checked", this.__labelChecked);
      this._setAttribute("data-label-unchecked", this.__labelUnchecked);

      this.__switch = this._createSwitch();
      this._add(this.__switch);

      if (value) {
        this.setValue(value);
      }

      this.addListener("tap", this._onTap, this);
      this.addListener("swipe", this._onSwipe, this);

      this.addCssClass("gap");
    },

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "togglebutton"
      }
    },

    members: {
      __switch: null,
      __value: false,
      __labelUnchecked: "OFF",
      __labelChecked: "ON",
      __lastToggleTimestamp: 0,

      /**
       * Returns the child control of the toggle button.
       *
       * @return {qx.ui.mobile.container.Composite} the child control.
       */
      _getChild: function _getChild() {
        return this.__switch;
      },

      /**
       * Creates the switch control of the widget.
       * @return {qx.ui.mobile.container.Composite} The switch control.
       */
      _createSwitch: function _createSwitch() {
        var toggleButtonSwitch = new qx.ui.mobile.container.Composite();
        toggleButtonSwitch.addCssClass("togglebutton-switch");
        return toggleButtonSwitch;
      },

      /**
       * Sets the value [true/false] of this toggle button.
       * It is called by setValue method of qx.ui.mobile.form.MValue mixin
       * @param value {Boolean} the new value of the toggle button
       */
      _setValue: function _setValue(value) {
        if (typeof value !== 'boolean') {
          throw new Error("value for " + this + " should be boolean");
        }
        if (value) {
          this.addCssClass("checked");
        } else {
          this.removeCssClass("checked");
        }
        this.__value = value;
      },

      /**
       * Gets the value [true/false] of this toggle button.
       * It is called by getValue method of qx.ui.mobile.form.MValue mixin
       * @return {Boolean} the value of the toggle button
       */
      _getValue: function _getValue() {
        return this.__value;
      },

      /**
       * Toggles the value of the button.
       */
      toggle: function toggle() {
        this.setValue(!this.getValue());
      },

      /**
       * Event handler. Called when the tap event occurs.
       * Toggles the button.
       *
       * @param evt {qx.event.type.Tap} The tap event.
       */
      _onTap: function _onTap(evt) {
        if (this._checkLastPointerTime()) {
          this.toggle();
        }
      },

      /**
       * Event handler. Called when the swipe event occurs.
       * Toggles the button, when.
       *
       * @param evt {qx.event.type.Swipe} The swipe event.
       */
      _onSwipe: function _onSwipe(evt) {
        if (this._checkLastPointerTime()) {
          var direction = evt.getDirection();
          if (direction == "left") {
            if (this.__value == true) {
              this.toggle();
            }
          } else {
            if (this.__value == false) {
              this.toggle();
            }
          }
        }
      },

      /**
       * Checks if last touch event (swipe,tap) is more than 500ms ago.
       * Bugfix for several simulator/emulator, when tap is immediately followed by a swipe.
       * @return {Boolean} <code>true</code> if the last event was more than 500ms ago
       */
      _checkLastPointerTime: function _checkLastPointerTime() {
        var elapsedTime = new Date().getTime() - this.__lastToggleTimestamp;
        this.__lastToggleTimestamp = new Date().getTime();
        return elapsedTime > 500;
      }
    },

    destruct: function destruct() {
      this.removeListener("tap", this._onTap, this);
      this.removeListener("swipe", this._onSwipe, this);

      this._disposeObjects("__switch", "__labelUnchecked", "__labelChecked");
    }
  });
  qx.ui.mobile.form.ToggleButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToggleButton.js.map?dt=1555325122867