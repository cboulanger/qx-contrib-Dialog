(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.layout.AbstractBox": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.layout.HBox", {
    extend: qx.ui.mobile.layout.AbstractBox,

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */

    members: {
      // overridden
      _getCssClasses: function _getCssClasses() {
        return ["qx-hbox"];
      }
    }
  });
  qx.ui.mobile.layout.HBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HBox.js.map?dt=1555325123038