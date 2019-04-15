(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.application.IApplication": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.application.Basic", {
    extend: qx.core.Object,
    implement: [qx.application.IApplication],

    members: {
      // interface method
      main: function main() {
        // empty
      },

      // interface method
      finalize: function finalize() {
        // empty
      },

      // interface method
      close: function close() {
        // empty
      },

      // interface method
      terminate: function terminate() {
        // empty
      }
    }
  });
  qx.application.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1555325104185