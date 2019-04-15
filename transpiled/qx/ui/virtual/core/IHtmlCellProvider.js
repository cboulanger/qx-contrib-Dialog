(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.core.IHtmlCellProvider", {
    members: {
      /**
       * Returns all relevant properties of the cell:
       * <ul>
       * <li>classes (String): Space separated class names</li>
       * <li>style (String): CSS styles</li>
       * <li>attributes (String): Space separated attributes</li>
       * <li>content (String): HTML fragment of the innerHTML of the cell</li>
       * <li>insets (Array): insets (padding + border) of the cell as
       * two-dimensional array.</li>
       * </ul>
       *
       * @param row {Integer} The cell's row index.
       * @param column {Integer} The cell's column index.
       *
       * @return {Map} Cell properties (see above.)
       */
      getCellProperties: function getCellProperties(row, column) {}
    }
  });
  qx.ui.virtual.core.IHtmlCellProvider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IHtmlCellProvider.js.map?dt=1555325127002