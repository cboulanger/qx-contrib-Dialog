(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      },
      "qx.bom.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.cellrenderer.Password", {
    extend: qx.ui.table.cellrenderer.Default,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      /**
       * Overridden; called whenever the cell updates.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {String}
       */
      _getContentHtml: function _getContentHtml(cellInfo) {
        var value = cellInfo.value;
        if (value === null) {
          value = "";
        }
        cellInfo.value = value.replace(/./g, "*");
        return qx.bom.String.escape(this._formatValue(cellInfo));
      }
    }
  });
  qx.ui.table.cellrenderer.Password.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Password.js.map?dt=1555325124703