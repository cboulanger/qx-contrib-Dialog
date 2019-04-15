(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.renderer.table.cell.String", {
    extend: qx.ui.progressive.renderer.table.cell.Abstract,

    /**
     */
    construct: function construct() {
      qx.ui.progressive.renderer.table.cell.Abstract.constructor.call(this);
    },

    members: {
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        return qx.bom.String.escape(cellInfo.cellData);
      }
    }
  });
  qx.ui.progressive.renderer.table.cell.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1555325123756