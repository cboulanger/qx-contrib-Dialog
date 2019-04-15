(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ObjectPool": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.event.Pool", {
    extend: qx.util.ObjectPool,
    type: "singleton",

    // Even though this class contains almost no code it is required because the
    // legacy code needs a place to patch the event pooling behavior.


    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.util.ObjectPool.constructor.call(this, 30);
    }
  });
  qx.event.Pool.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pool.js.map?dt=1555325110754