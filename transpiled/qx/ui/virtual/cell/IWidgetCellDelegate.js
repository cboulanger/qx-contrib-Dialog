(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.cell.IWidgetCellDelegate", {
    members: {
      /**
       * Creates a <code>Widget</code> which will be used for rendering.
       *
       * @return {qx.ui.core.LayoutItem} A new created <code>Widget</code>.
       */
      createWidget: function createWidget() {}
    }
  });
  qx.ui.virtual.cell.IWidgetCellDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IWidgetCellDelegate.js.map?dt=1555325126910