(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.mobile.list.IListDelegate", {
    members: {
      /**
       * Configure the list item renderer with the given data. Mandatory method.
       * At least this method has to be defined for the delegate.
       *
       * @param item {qx.ui.mobile.list.renderer.Abstract} Instance of list item renderer to modify
       * @param data {var} The data of the row. Can be used to configure the given item.
       * @param row {Integer} The row index.
       */
      configureItem: function configureItem(item, data, row) {},

      /**
       * Creates an instance of the item renderer to use.
       *
       * @return {qx.ui.mobile.list.renderer.Abstract} An instance of the item renderer.
       */
      createItemRenderer: function createItemRenderer() {}
    }
  });
  qx.ui.mobile.list.IListDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IListDelegate.js.map?dt=1555325123059