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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.layout.VBox", {
    extend: qx.ui.mobile.layout.AbstractBox,

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */

    members: {
      // overridden
      _getCssClasses: function _getCssClasses() {
        return ["qx-vbox"];
      }
    }
  });
  qx.ui.mobile.layout.VBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VBox.js.map?dt=1555325123053