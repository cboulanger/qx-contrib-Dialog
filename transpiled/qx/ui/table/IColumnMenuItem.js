(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.table.IColumnMenuItem", {
    properties: {
      /**
       * Whether the table column associated with this menu item is visible
       * Should be of type {Boolean}!
       */
      columnVisible: {}
    },

    events: {
      /**
       * Dispatched when a column changes visibility state. The event data is a
       * boolean indicating whether the table column associated with this menu
       * item is now visible.
       */
      changeColumnVisible: "qx.event.type.Data"
    }
  });
  qx.ui.table.IColumnMenuItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IColumnMenuItem.js.map?dt=1555325124051