(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.selection.CellRectangle": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.selection.CellLines", {
    extend: qx.ui.virtual.selection.CellRectangle,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        IMPLEMENT ABSTRACT METHODS
      ---------------------------------------------------------------------------
      */

      // overridden
      _getSelectableRange: function _getSelectableRange(item1, item2) {
        var selectables = [];
        var columnCount = this._pane.getColumnConfig().getItemCount();

        if (item1.row < item2.row || item1.row == item2.row && item1.column < item2.column) {
          var start = item1.row * columnCount + item1.column;
          var end = item2.row * columnCount + item2.column;
        } else {
          var start = item2.row * columnCount + item2.column;
          var end = item1.row * columnCount + item1.column;
        }

        for (var i = start; i <= end; i++) {
          var cell = {
            row: Math.floor(i / columnCount),
            column: i % columnCount
          };
          if (this._isSelectable(cell)) {
            selectables.push(cell);
          }
        }
        return selectables;
      }
    }
  });
  qx.ui.virtual.selection.CellLines.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CellLines.js.map?dt=1555325127416