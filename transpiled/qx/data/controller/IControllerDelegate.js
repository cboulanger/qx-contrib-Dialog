(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.data.controller.IControllerDelegate", {
    members: {
      /**
       * Gives the user the opportunity to set individual styles and properties
       * on the by the controller created widgets.
       *
       * @param item {var} Item to modify.
       */
      configureItem: function configureItem(item) {},

      /**
       * Filter checks the current data and returns a boolean if the data should
       * appear in the filtered data set or not.
       *
       * The filter currently works only with the {@link qx.data.controller.List}
       * controller!
       *
       * @param data {var} The data which will be checked.
       * @return {Boolean} True, if the data passes the filter, false otherwise.
       */
      filter: function filter(data) {},

      /**
       * Creates an item which will be added to the target as child. Be sure to
       * implement the {@link #bindItem} function as well to get the needed
       * properties bound.
       *
       * @return {qx.ui.core.Widget} A new created widget.
       */
      createItem: function createItem() {},

      /**
       * Sets up the binding for the given item and index.
       *
       * For every property you want to bind, use
       * {@link qx.data.controller.List#bindProperty} like this:
       * <code>
       * controller.bindProperty("path.in.the.model", "label", options, item, id);
       * </code>
       *
       * @param controller {var} The currently used controller.
       * @param item {qx.ui.core.Widget} The created and used item.
       * @param id {var} The id for the binding.
       */
      bindItem: function bindItem(controller, item, id) {}
    }
  });
  qx.data.controller.IControllerDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IControllerDelegate.js.map?dt=1555325108695