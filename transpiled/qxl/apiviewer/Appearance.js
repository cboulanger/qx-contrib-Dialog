(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qxl.apiviewer.Appearance", {
    title: "Theme for API Viewer",
    extend: qx.theme.indigo.Appearance,

    appearances: {
      "toggleview": {
        style: function style(states) {
          return {
            width: 240,
            decorator: "main"
          };
        }
      },

      "detailviewer": {
        style: function style(states) {
          return {
            backgroundColor: "white",
            decorator: "main",
            padding: [10, 0, 10, 0]
          };
        }
      },

      "legend": {
        include: "scrollarea",
        alias: "scrollarea",

        style: function style(states) {
          return {
            contentPadding: [10, 10, 10, 10],
            backgroundColor: "white"
          };
        }
      },

      "legendview-label-important": {
        style: function style(states) {
          return {
            textColor: "#134275",
            font: "bold"
          };
        }
      },

      "legendview-label": {
        style: function style(states) {
          return {
            textColor: "#134275"
          };
        }
      },

      "tabview": {
        style: function style(states) {
          return {
            contentPadding: 0
          };
        }
      },

      "tabview/pane": {
        style: function style(states) {
          return {
            minHeight: 100,

            marginBottom: states.barBottom ? -1 : 0,
            marginTop: states.barTop ? -1 : 0,
            marginLeft: states.barLeft ? -1 : 0,
            marginRight: states.barRight ? -1 : 0
          };
        }
      }
    }
  });
  qxl.apiviewer.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1555325129957