(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.type.BaseError": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.core.ValidationError", {
    extend: qx.type.BaseError
  });
  qx.core.ValidationError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ValidationError.js.map?dt=1555325108257