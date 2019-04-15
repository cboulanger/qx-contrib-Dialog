(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Pointer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.core.CellEvent", {
    extend: qx.event.type.Pointer,

    properties: {
      /** The table row of the event target. */
      row: {
        check: "Integer",
        nullable: true
      },

      /** The table column of the event target. */
      column: {
        check: "Integer",
        nullable: true
      }
    },

    members: {
      /**
       * Initialize the event.
       *
       * @param scroller {qx.ui.table.pane.Scroller} The tables pane scroller.
       * @param me {qx.event.type.Pointer} The original pointer event.
       * @param row {Integer?null} The cell's row index.
       * @param column {Integer?null} The cell's column index.
       */
      init: function init(scroller, me, row, column) {
        me.clone(this);
        this.setBubbles(false);

        this.setRow(row);
        this.setColumn(column);
      }
    }
  });
  qx.ui.virtual.core.CellEvent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CellEvent.js.map?dt=1555325126997