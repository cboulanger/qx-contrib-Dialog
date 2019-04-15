(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.tabview.AbstractPage": {
        "require": true
      },
      "qxl.apiviewer.ui.PackageViewer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.tabview.PackagePage", {
    extend: qxl.apiviewer.ui.tabview.AbstractPage,

    members: {
      _createViewer: function _createViewer() {
        return new qxl.apiviewer.ui.PackageViewer();
      }
    }
  });
  qxl.apiviewer.ui.tabview.PackagePage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PackagePage.js.map?dt=1555325130800