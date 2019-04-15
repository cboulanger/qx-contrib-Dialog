(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Color": {
        "require": true
      },
      "qx.theme.simple.Decoration": {
        "require": true
      },
      "qx.theme.simple.Font": {
        "require": true
      },
      "qx.theme.simple.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.Simple", {
    title: "Simple",

    meta: {
      color: qx.theme.simple.Color,
      decoration: qx.theme.simple.Decoration,
      font: qx.theme.simple.Font,
      appearance: qx.theme.simple.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qx.theme.Simple.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Simple.js.map?dt=1555325115217