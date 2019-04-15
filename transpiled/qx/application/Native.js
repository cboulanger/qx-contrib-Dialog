(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Init": {
        "require": true
      },
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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.application.Native", {
    extend: qx.core.Object,
    implement: [qx.application.IApplication],

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

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
  qx.application.Native.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Native.js.map?dt=1555325104219