(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.virtual.cell.ICell", {
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
       * @param data {var} Data needed for the cell to render.
       * @param states {Map} The states set on the cell (e.g. <i>selected</i>,
       * <i>focused</i>, <i>editable</i>).
       *
       * @return {Map} Cell properties (see above.)
       */
      getCellProperties: function getCellProperties(data, states) {}
    }
  });
  qx.ui.virtual.cell.ICell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ICell.js.map?dt=1555325126901