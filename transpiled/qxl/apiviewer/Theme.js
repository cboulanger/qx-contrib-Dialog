(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Color": {
        "require": true
      },
      "qx.theme.indigo.Decoration": {
        "require": true
      },
      "qx.theme.indigo.Font": {
        "require": true
      },
      "qxl.apiviewer.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qxl.apiviewer.Theme", {
    title: "APIViewer theme",

    meta: {
      color: qx.theme.indigo.Color,
      decoration: qx.theme.indigo.Decoration,
      font: qx.theme.indigo.Font,
      appearance: qxl.apiviewer.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qxl.apiviewer.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1555325129527