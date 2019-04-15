(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.headfoot.Abstract": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.headfoot.Null", {
    extend: qx.ui.progressive.headfoot.Abstract,

    construct: function construct() {
      qx.ui.progressive.headfoot.Abstract.constructor.call(this);

      // We're null, so don't display.
      this.exclude();
    }
  });
  qx.ui.progressive.headfoot.Null.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Null.js.map?dt=1555325123492