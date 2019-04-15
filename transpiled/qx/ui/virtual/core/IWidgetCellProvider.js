(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.core.IWidgetCellProvider", {
    members: {
      /**
       * This method returns the configured cell for the given cell. The return
       * value may be <code>null</code> to indicate that the cell should be empty.
       *
       * @param row {Integer} The cell's row index.
       * @param column {Integer} The cell's column index.
       * @return {qx.ui.core.LayoutItem} The configured widget for the given cell.
       */
      getCellWidget: function getCellWidget(row, column) {},

      /**
       * Release the given cell widget. Either pool or destroy the widget.
       *
       * @param widget {qx.ui.core.LayoutItem} The cell widget to pool.
       */
      poolCellWidget: function poolCellWidget(widget) {}
    }
  });
  qx.ui.virtual.core.IWidgetCellProvider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IWidgetCellProvider.js.map?dt=1555325127013