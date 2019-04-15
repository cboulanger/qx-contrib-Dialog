(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.simple.Font", {
    fonts: {
      "default": {
        size: 13,
        family: ["arial", "sans-serif"]
      },

      "bold": {
        size: 13,
        family: ["arial", "sans-serif"],
        bold: true
      },

      "headline": {
        size: 24,
        family: ["sans-serif", "arial"]
      },

      "small": {
        size: 11,
        family: ["arial", "sans-serif"]
      },

      "monospace": {
        size: 11,
        family: ["DejaVu Sans Mono", "Courier New", "monospace"]
      }
    }
  });
  qx.theme.simple.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1555325116362