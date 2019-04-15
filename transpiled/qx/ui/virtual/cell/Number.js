(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.Cell": {
        "construct": true,
        "require": true
      },
      "qx.util.format.NumberFormat": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.Number", {
    extend: qx.ui.virtual.cell.Cell,

    /**
     * @param numberFormat {qx.util.format.NumberFormat|null} Optional number
     *   format to use.
     */
    construct: function construct(numberFormat) {
      qx.ui.virtual.cell.Cell.constructor.call(this);

      if (numberFormat) {
        this.setNumberFormat(numberFormat);
      }
    },

    properties: {
      /** The number format used to render the cell */
      numberFormat: {
        check: "qx.util.format.NumberFormat",
        // it is on intension that only one number format is used for
        // all instances
        init: new qx.util.format.NumberFormat()
      },

      // overridden
      appearance: {
        refine: true,
        init: "cell-number"
      }
    },

    members: {
      // overridden
      getContent: function getContent(value, states) {
        return value !== null ? this.getNumberFormat().format(value) : "";
      }
    }
  });
  qx.ui.virtual.cell.Number.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Number.js.map?dt=1555325126925