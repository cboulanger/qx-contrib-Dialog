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
      "qxl.apiviewer.ui.ClassViewer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.tabview.ClassPage", {
    extend: qxl.apiviewer.ui.tabview.AbstractPage,

    members: {
      _createViewer: function _createViewer() {
        return new qxl.apiviewer.ui.ClassViewer();
      }
    }
  });
  qxl.apiviewer.ui.tabview.ClassPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassPage.js.map?dt=1555325130813