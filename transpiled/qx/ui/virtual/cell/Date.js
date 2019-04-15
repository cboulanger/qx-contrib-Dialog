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
      "qx.util.format.DateFormat": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.Date", {
    extend: qx.ui.virtual.cell.Cell,

    /**
     * @param dateFormat {qx.util.format.DateFormat|null} optional date formatter
     *   to use
     */
    construct: function construct(dateFormat) {
      qx.ui.virtual.cell.Cell.constructor.call(this);

      if (dateFormat) {
        this.setDateFormat(dateFormat);
      } else {
        this.initDateFormat(qx.util.format.DateFormat.getDateTimeInstance());
      }
    },

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "cell-date"
      },

      /** The date format used to render the cell */
      dateFormat: {
        check: "qx.util.format.DateFormat",
        deferredInit: true
      }
    },

    members: {
      // overridden
      getContent: function getContent(value, states) {
        return value ? this.getDateFormat().format(value) : "";
      }
    }
  });
  qx.ui.virtual.cell.Date.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Date.js.map?dt=1555325126892