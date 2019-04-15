(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Abstract": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.renderer.table.cell.Html", {
    /*
     * Nothing specific to do here, as the Abstract class already does
     * everything we need.
     */
    extend: qx.ui.progressive.renderer.table.cell.Abstract
  });
  qx.ui.progressive.renderer.table.cell.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1555325123722