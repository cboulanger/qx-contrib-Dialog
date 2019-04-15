(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.classic.Color": {
        "require": true
      },
      "qx.theme.classic.Decoration": {
        "require": true
      },
      "qx.theme.classic.Font": {
        "require": true
      },
      "qx.theme.classic.Appearance": {
        "require": true
      },
      "qx.theme.icon.Oxygen": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.Classic", {
    title: "Classic Windows",

    meta: {
      color: qx.theme.classic.Color,
      decoration: qx.theme.classic.Decoration,
      font: qx.theme.classic.Font,
      appearance: qx.theme.classic.Appearance,
      icon: qx.theme.icon.Oxygen
    }
  });
  qx.theme.Classic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Classic.js.map?dt=1555325115201