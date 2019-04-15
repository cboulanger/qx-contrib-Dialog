(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.core.ILayer", {
    members: {
      /**
       * Do a complete update of the layer. All cached data should be discarded.
       * This method is called e.g. after changes to the grid geometry
       * (row/column sizes, row/column count, ...).
       *
       * Note: This method can only be called after the widgets initial appear
       * event has been fired because it may work with the widget's DOM elements.
       *
       * @param firstRow {Integer} Index of the first row to display.
       * @param firstColumn {Integer} Index of the first column to display.
       * @param rowSizes {Integer[]} Array of heights for each row to display.
       * @param columnSizes {Integer[]} Array of widths for each column to display.
       */
      fullUpdate: function fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        this.assertArgumentsCount(arguments, 6, 6);
        this.assertPositiveInteger(firstRow);
        this.assertPositiveInteger(firstColumn);
        this.assertArray(rowSizes);
        this.assertArray(columnSizes);
      },

      /**
       * Update the layer to display a different window of the virtual grid.
       * This method is called if the pane is scrolled, resized or cells
       * are prefetched. The implementation can assume that no other grid
       * data has been changed since the last "fullUpdate" of "updateLayerWindow"
       * call.
       *
       * Note: This method can only be called after the widgets initial appear
       * event has been fired because it may work with the widget's DOM elements.
       *
       * @param firstRow {Integer} Index of the first row to display.
       * @param firstColumn {Integer} Index of the first column to display.
       * @param rowSizes {Integer[]} Array of heights for each row to display.
       * @param columnSizes {Integer[]} Array of widths for each column to display.
       */
      updateLayerWindow: function updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        this.assertArgumentsCount(arguments, 6, 6);
        this.assertPositiveInteger(firstRow);
        this.assertPositiveInteger(firstColumn);
        this.assertArray(rowSizes);
        this.assertArray(columnSizes);
      },

      /**
       * Update the layer to reflect changes in the data the layer displays.
       */
      updateLayerData: function updateLayerData() {}
    }
  });
  qx.ui.virtual.core.ILayer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ILayer.js.map?dt=1555325127008