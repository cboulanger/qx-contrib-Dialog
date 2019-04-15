(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Native": {
        "require": true
      },
      "qx.bom.client.OperatingSystem": {},
      "qx.bom.client.Engine": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.event.type.Dom", {
    extend: qx.event.type.Native,

    statics: {
      /** @type {Integer} The modifier mask for the shift key. */
      SHIFT_MASK: 1,

      /** @type {Integer} The modifier mask for the control key. */
      CTRL_MASK: 2,

      /** @type {Integer} The modifier mask for the alt key. */
      ALT_MASK: 4,

      /** @type {Integer} The modifier mask for the meta key (e.g. apple key on Macs). */
      META_MASK: 8
    },

    members: {
      // overridden
      _cloneNativeEvent: function _cloneNativeEvent(nativeEvent, clone) {
        var clone = qx.event.type.Dom.prototype._cloneNativeEvent.base.call(this, nativeEvent, clone);

        clone.shiftKey = nativeEvent.shiftKey;
        clone.ctrlKey = nativeEvent.ctrlKey;
        clone.altKey = nativeEvent.altKey;
        clone.metaKey = nativeEvent.metaKey;

        return clone;
      },

      /**
       * Return in a bit map, which modifier keys are pressed. The constants
       * {@link #SHIFT_MASK}, {@link #CTRL_MASK}, {@link #ALT_MASK} and
       * {@link #META_MASK} define the bit positions of the corresponding keys.
       *
       * @return {Integer} A bit map with the pressed modifier keys.
       */
      getModifiers: function getModifiers() {
        var mask = 0;
        var evt = this._native;
        if (evt.shiftKey) {
          mask |= qx.event.type.Dom.SHIFT_MASK;
        }
        if (evt.ctrlKey) {
          mask |= qx.event.type.Dom.CTRL_MASK;
        }
        if (evt.altKey) {
          mask |= qx.event.type.Dom.ALT_MASK;
        }
        if (evt.metaKey) {
          mask |= qx.event.type.Dom.META_MASK;
        }
        return mask;
      },

      /**
       * Returns whether the ctrl key is pressed.
       *
       * @return {Boolean} whether the ctrl key is pressed.
       */
      isCtrlPressed: function isCtrlPressed() {
        return this._native.ctrlKey;
      },

      /**
       * Returns whether the shift key is pressed.
       *
       * @return {Boolean} whether the shift key is pressed.
       */
      isShiftPressed: function isShiftPressed() {
        return this._native.shiftKey;
      },

      /**
       * Returns whether the alt key is pressed.
       *
       * @return {Boolean} whether the alt key is pressed.
       */
      isAltPressed: function isAltPressed() {
        return this._native.altKey;
      },

      /**
       * Returns whether the meta key is pressed.
       *
       * @return {Boolean} whether the meta key is pressed.
       */
      isMetaPressed: function isMetaPressed() {
        return this._native.metaKey;
      },

      /**
       * Returns whether the ctrl key or (on the Mac) the command key is pressed.
       *
       * @return {Boolean} <code>true</code> if the command key is pressed on the Mac
       *           or the ctrl key is pressed on another system.
       */
      isCtrlOrCommandPressed: function isCtrlOrCommandPressed() {
        // Opera seems to use ctrlKey for the cmd key so don't fix that for opera
        // on mac [BUG #5884]
        if (qx.core.Environment.get("os.name") == "osx" && qx.core.Environment.get("engine.name") != "opera") {
          return this._native.metaKey;
        } else {
          return this._native.ctrlKey;
        }
      }
    }
  });
  qx.event.type.Dom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dom.js.map?dt=1555325111994