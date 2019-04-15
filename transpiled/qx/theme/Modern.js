(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.modern.Color": {
        "require": true
      },
      "qx.theme.modern.Decoration": {
        "require": true
      },
      "qx.theme.modern.Font": {
        "require": true
      },
      "qx.theme.modern.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.Modern", {
    title: "Modern",

    meta: {
      color: qx.theme.modern.Color,
      decoration: qx.theme.modern.Decoration,
      font: qx.theme.modern.Font,
      appearance: qx.theme.modern.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qx.theme.Modern.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Modern.js.map?dt=1555325115213