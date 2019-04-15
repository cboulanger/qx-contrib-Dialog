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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.pane.CellEvent", {
    extend: qx.event.type.Pointer,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The table row of the event target */
      row: {
        check: "Integer",
        nullable: true
      },

      /** The table column of the event target */
      column: {
        check: "Integer",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
       *****************************************************************************
          CONSTRUCTOR
       *****************************************************************************
       */

      /**
       * Initialize the event
       *
       * @param scroller {qx.ui.table.pane.Scroller} The tables pane scroller
       * @param me {qx.event.type.Pointer} The original pointer event
       * @param row {Integer?null} The cell's row index
       * @param column {Integer?null} The cell's column index
       */
      init: function init(scroller, me, row, column) {
        me.clone(this);
        this.setBubbles(false);

        if (row != null) {
          this.setRow(row);
        } else {
          this.setRow(scroller._getRowForPagePos(this.getDocumentLeft(), this.getDocumentTop()));
        }

        if (column != null) {
          this.setColumn(column);
        } else {
          this.setColumn(scroller._getColumnForPageX(this.getDocumentLeft()));
        }
      },

      // overridden
      clone: function clone(embryo) {
        var clone = qx.ui.table.pane.CellEvent.prototype.clone.base.call(this, embryo);

        clone.set({
          row: this.getRow(),
          column: this.getColumn()
        });

        return clone;
      }
    }
  });
  qx.ui.table.pane.CellEvent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CellEvent.js.map?dt=1555325125118