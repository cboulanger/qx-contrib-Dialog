var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Browser": {},
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["runtime.name"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.client.Runtime", {
    statics: {
      /**
       * Checks for the name of the runtime and returns it. In general, it checks
       * for rhino and node.js and if that could not be detected, it falls back
       * to the browser name defined by {@link qx.bom.client.Browser#getName}.
       * @return {String} The name of the current runtime.
       * @internal
       * @ignore(environment, process, Titanium.*)
       */
      getName: function getName() {
        var name = "";

        // check for the Rhino runtime
        if ((typeof Packages === "undefined" ? "undefined" : _typeof(Packages)) === "object" && Object.prototype.toString.call(Packages) === "[object JavaPackage]") {
          name = "rhino";
          // check for the Node.js runtime
        } else if (typeof process !== "undefined") {
          name = "node.js";
        } else if (typeof Titanium !== "undefined" && typeof Titanium.userAgent !== "undefined") {
          name = "titanium";
        } else {
          // otherwise, we think its a browser
          name = qx.bom.client.Browser.getName();
        }

        return name;
      }
    },

    defer: function defer(statics) {
      qx.core.Environment.add("runtime.name", statics.getName);
    }
  });
  qx.bom.client.Runtime.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Runtime.js.map?dt=1555325106378