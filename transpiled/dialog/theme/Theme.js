(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "dialog.theme.icon.IcoMoonFree": {
        "require": true
      },
      "dialog.theme.icon.Oxygen": {
        "require": true
      },
      "dialog.theme.icon.Tango": {
        "require": true
      },
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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("dialog.theme.Theme", {
    meta: {
      color: qx.theme.modern.Color,
      decoration: qx.theme.modern.Decoration,
      font: qx.theme.modern.Font,
      icon: dialog.theme.icon.IcoMoonFree,
      appearance: qx.theme.modern.Appearance
    }
  });
  dialog.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1555325101887