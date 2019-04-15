(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Appearance": {
        "require": true
      },
      "qx.theme.simple.Image": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Theme.define("qx.theme.indigo.Appearance", {
    extend: qx.theme.simple.Appearance,

    appearances: {
      "colorselector/input-field-set": {
        include: "groupbox",
        alias: "groupbox",
        style: function style() {
          return {
            paddingTop: 0
          };
        }
      },

      "colorselector/preview-field-set": {
        include: "groupbox",
        alias: "groupbox",
        style: function style() {
          return {
            paddingTop: 0
          };
        }
      },

      "toolbar": {
        style: function style(states) {
          return {
            backgroundColor: "light-background",
            padding: [4, 0]
          };
        }
      },

      "splitpane/splitter/knob": {
        style: function style(states) {
          return {
            source: qx.theme.simple.Image.URLS["knob-" + (states.horizontal ? "horizontal" : "vertical")],
            padding: 3
          };
        }
      },

      "window": {
        style: function style(states) {
          return {
            contentPadding: [10, 10, 10, 10],
            backgroundColor: states.maximized ? "background" : undefined,
            decorator: states.maximized ? undefined : states.active ? "window-active" : "window"
          };
        }
      },

      "window/captionbar": {
        style: function style(states) {
          var active = states.active && !states.disabled;
          return {
            padding: [3, 8, active ? 1 : 3, 8],
            textColor: active ? "highlight" : "font",
            decorator: active ? "window-caption-active" : "window-caption"
          };
        }
      },

      "window/title": {
        style: function style(states) {
          return {
            cursor: "default",
            font: "default",
            marginRight: 20,
            alignY: "middle"
          };
        }
      },

      "virtual-tree": {
        include: "tree",
        alias: "tree",

        style: function style(states) {
          return {
            itemHeight: 27
          };
        }
      },

      "app-header": {
        style: function style(states) {
          return {
            font: "headline",
            textColor: "text-selected",
            decorator: "app-header",
            padding: 10
          };
        }
      },

      "app-header-label": {
        style: function style(states) {
          return {
            paddingTop: 5
          };
        }
      },

      "app-splitpane": {
        alias: "splitpane",
        style: function style(states) {
          return {
            padding: [0, 10, 10, 10],
            backgroundColor: "light-background"
          };
        }
      }
    }
  });
  qx.theme.indigo.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1555325115455