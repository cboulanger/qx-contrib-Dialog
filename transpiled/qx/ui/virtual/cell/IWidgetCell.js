(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.cell.IWidgetCell", {
    members: {
      /**
       * Get a widget instance to render the cell
       *
       * @param data {var} Data needed for the cell to render.
       * @param states {Map} The states set on the cell (e.g. <i>selected</i>,
       * <i>focused</i>, <i>editable</i>).
       *
       * @return {qx.ui.core.LayoutItem} The cell widget
       */
      getCellWidget: function getCellWidget(data, states) {},

      /**
       * Release the given widget instance.
       *
       * Either pool or dispose the widget.
       *
       * @param widget {qx.ui.core.LayoutItem} The cell widget to pool
       */
      pool: function pool(widget) {},

      /**
       * Update the states of the given widget.
       *
       * @param widget {qx.ui.core.LayoutItem} The cell widget to update
       * @param states {Map} The cell widget's states
       */
      updateStates: function updateStates(widget, states) {},

      /**
       * Update the data the cell widget should display
       *
       * @param widget {qx.ui.core.LayoutItem} The cell widget to update
       * @param data {var} The data to display
       */
      updateData: function updateData(widget, data) {}
    }
  });
  qx.ui.virtual.cell.IWidgetCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IWidgetCell.js.map?dt=1555325126906