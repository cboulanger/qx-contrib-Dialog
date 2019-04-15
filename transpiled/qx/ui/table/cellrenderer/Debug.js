(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Abstract": {
        "require": true
      },
      "qx.dev.Debug": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.cellrenderer.Debug", {
    extend: qx.ui.table.cellrenderer.Abstract,

    members: {
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        var html = "<div style='height:" + cellInfo.styleHeight + "px;overflow:auto;'>" + qx.dev.Debug.debugObjectToString(cellInfo.value, "row=" + cellInfo.row + ", col=" + cellInfo.col, 10, true) + "</div>";
        return html;
      }
    }
  });
  qx.ui.table.cellrenderer.Debug.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Debug.js.map?dt=1555325124579