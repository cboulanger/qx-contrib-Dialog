(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qxWeb": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("q", {
    extend: qxWeb
  });
  q.$$dbClassInfo = $$dbClassInfo;
})();

// make sure it's the same
q = qxWeb;

//# sourceMappingURL=q.js.map?dt=1555325129780