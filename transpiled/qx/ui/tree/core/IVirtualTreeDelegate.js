(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.tree.core.IVirtualTreeDelegate", {
    members: {
      /**
       * Gives the user the opportunity to set individual styles and properties
       * on the widget cells created by the controller.
       *
       * @param item {qx.ui.core.Widget} Item to modify.
       */
      configureItem: function configureItem(item) {},

      /**
       * Creates a widget cell which will be used for rendering. Be sure to
       * implement the {@link #bindItem} function as well to get the needed
       * properties bound.
       *
       * @return {qx.ui.core.Widget} A new created item cell.
       */
      createItem: function createItem() {},

      /**
       * Sets up the binding for the given widget cell and index.
       *
       * For every property you want to bind, use
       * {@link MWidgetController#bindProperty} like this:
       * <code>
       * controller.bindProperty(null, "value", options, item, id);
       * </code>
       *
       * @param controller {qx.ui.list.core.MWidgetController} The currently used controller.
       * @param item {qx.ui.core.Widget} The created and used item.
       * @param id {Integer} The id for the binding.
       */
      bindItem: function bindItem(controller, item, id) {},

      /**
       * Gives the user the opportunity to reset properties or states.
       *
       * @param item {qx.ui.core.Widget} Item to modify.
       */
      onPool: function onPool(item) {},

      /**
       * Filter checks the current data and returns a boolean if the data should
       * appear in the filtered data set or not.
       *
       * @param data {var} The data which will be checked.
       * @return {Boolean} True, if the data passes the filter, false otherwise.
       */
      filter: function filter(data) {},

      /**
       * Gives the user the opportunity to sort the children items from a node.
       * The sorting method should return a negative value if a < b, zero
       * if a = b, or a positive value if a > b.
       *
       * @param a {var} value to compare.
       * @param b {var} value to compare.
       * @return {Integer} should return a negative value if a < b, zero
       *   if a = b, or a positive value if a > b.
       */
      sorter: function sorter(a, b) {}
    }
  });
  qx.ui.tree.core.IVirtualTreeDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IVirtualTreeDelegate.js.map?dt=1555325126189