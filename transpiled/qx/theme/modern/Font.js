(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.OperatingSystem": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "load": true,
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "load": true,
          "className": "qx.bom.client.OperatingSystem"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.modern.Font", {
    fonts: {
      "default": {
        size: qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? 12 : 11,
        lineHeight: 1.4,
        family: qx.core.Environment.get("os.name") == "osx" ? ["Lucida Grande"] : qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? ["Segoe UI", "Candara"] : ["Tahoma", "Liberation Sans", "Arial", "sans-serif"]
      },

      "bold": {
        size: qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? 12 : 11,
        lineHeight: 1.4,
        family: qx.core.Environment.get("os.name") == "osx" ? ["Lucida Grande"] : qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? ["Segoe UI", "Candara"] : ["Tahoma", "Liberation Sans", "Arial", "sans-serif"],
        bold: true
      },

      "small": {
        size: qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? 11 : 10,
        lineHeight: 1.4,
        family: qx.core.Environment.get("os.name") == "osx" ? ["Lucida Grande"] : qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? ["Segoe UI", "Candara"] : ["Tahoma", "Liberation Sans", "Arial", "sans-serif"]
      },

      "monospace": {
        size: 11,
        lineHeight: 1.4,
        family: qx.core.Environment.get("os.name") == "osx" ? ["Lucida Console", "Monaco"] : qx.core.Environment.get("os.name") == "win" && (qx.core.Environment.get("os.version") == "7" || qx.core.Environment.get("os.version") == "vista") ? ["Consolas"] : ["Consolas", "DejaVu Sans Mono", "Courier New", "monospace"]
      }
    }
  });
  qx.theme.modern.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1555325116109