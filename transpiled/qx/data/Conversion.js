(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.data.Conversion", {
    statics: {
      /**
       * Converts the given value to a string via <code> + ""</code>.
       *
       * @param value {var} The value to convert.
       * @return {String} The converted value.
       */
      toString: function toString(value) {
        return value + "";
      },

      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toString} converter.
       */
      TOSTRINGOPTIONS: { converter: null },

      /**
       * Converts the given value to a number via <code>parseFloat</code>.
       *
       * @param value {var} The value to convert.
       * @return {Number} The converted value.
       */
      toNumber: function toNumber(value) {
        return parseFloat(value);
      },

      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toNumber} converter.
       */
      TONUMBEROPTIONS: { converter: null },

      /**
       * Converts the given value to a boolean via <code>!!value</code>.
       *
       * @param value {var} The value to convert.
       * @return {Boolean} The converted value.
       */
      toBoolean: function toBoolean(value) {
        return !!value;
      },

      /**
       * Options for the {@link qx.data.SingleValueBinding}
       * containing the {@link #toBoolean} converter.
       */
      TOBOOLEANOPTIONS: { converter: null }
    },

    defer: function defer() {
      // the converter need to be set in the defer because the reference to
      // the converter function is not available during the class create
      qx.data.Conversion.TOSTRINGOPTIONS.converter = qx.data.Conversion.toString;
      qx.data.Conversion.TONUMBEROPTIONS.converter = qx.data.Conversion.toNumber;
      qx.data.Conversion.TOBOOLEANOPTIONS.converter = qx.data.Conversion.toBoolean;
    }
  });
  qx.data.Conversion.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Conversion.js.map?dt=1555325108369