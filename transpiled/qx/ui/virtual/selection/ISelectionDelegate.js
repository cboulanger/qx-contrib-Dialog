(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.selection.ISelectionDelegate", {
    members: {
      /**
       * Returns whether the given item is selectable. The type of the item
       * depends on the concrete selection manager implementation. The
       * {@link Row} and {@link Column} selection manager use row/column indexes
       * as items. The {@link qx.ui.virtual.cell.Cell} uses cells as items. Cells are represented by
       * a map containing <code>row</code> and <code>column</code> keys.
       *
       * If this method is not implemented by the delegate all items are selectable.
       *
       * @param item {var} The item to be checked
       * @return {Boolean} Whether the given item is selectable
       */
      isItemSelectable: function isItemSelectable(item) {},

      /**
       * Update the style (appearance) of the given item.
       *
       * @param item {var} Item to modify
       * @param type {String} Any of <code>selected</code>, <code>anchor</code>
       *    or <code>lead</code>
       * @param wasAdded {Boolean} Whether the given style should be added or removed.
       */
      styleSelectable: function styleSelectable(item, type, wasAdded) {}
    }
  });
  qx.ui.virtual.selection.ISelectionDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ISelectionDelegate.js.map?dt=1555325127469