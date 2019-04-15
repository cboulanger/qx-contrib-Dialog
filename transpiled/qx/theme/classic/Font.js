(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.classic.Font", {
    fonts: {
      "default": {
        size: 11,
        lineHeight: 1.4,
        family: ["Lucida Grande", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans"]
      },

      "bold": {
        size: 11,
        lineHeight: 1.4,
        family: ["Lucida Grande", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans"],
        bold: true
      },

      "small": {
        size: 10,
        lineHeight: 1.4,
        family: ["Lucida Grande", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans"]
      },

      "monospace": {
        size: 11,
        lineHeight: 1.4,
        family: ["DejaVu Sans Mono", "Courier New", "monospace"]
      }
    }
  });
  qx.theme.classic.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1555325115409