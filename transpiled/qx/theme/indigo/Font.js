(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.indigo.Font", {
    fonts: {
      "default": {
        size: 12,
        family: ["Lucida Grande", "DejaVu Sans", "Verdana", "sans-serif"],
        color: "font",
        lineHeight: 1.8
      },

      "bold": {
        size: 12,
        family: ["Lucida Grande", "DejaVu Sans", "Verdana", "sans-serif"],
        bold: true,
        color: "font",
        lineHeight: 1.8
      },

      "headline": {
        size: 22,
        family: ["serif"],
        sources: [{
          family: "JosefinSlab",
          source: ["qx/decoration/Indigo/font/JosefinSlab-SemiBold.woff", "qx/decoration/Indigo/font/JosefinSlab-SemiBold.ttf"]
        }]
      },

      "small": {
        size: 11,
        family: ["Lucida Grande", "DejaVu Sans", "Verdana", "sans-serif"],
        color: "font",
        lineHeight: 1.8
      },

      "monospace": {
        size: 11,
        family: ["DejaVu Sans Mono", "Courier New", "monospace"],
        color: "font",
        lineHeight: 1.8
      }
    }
  });
  qx.theme.indigo.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1555325115480