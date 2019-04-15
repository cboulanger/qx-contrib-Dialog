(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "ecmascript.number.EPSILON": {
          "defer": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.lang.normalize.Number", {

    statics: {
      EPSILON: 2e-52
    },

    defer: function defer(statics) {
      if (!qx.core.Environment.get("ecmascript.number.EPSILON")) {
        Number.prototype.EPSILON = statics.EPSILON;
      }
    }
  });
  qx.lang.normalize.Number.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Number.js.map?dt=1555325114142