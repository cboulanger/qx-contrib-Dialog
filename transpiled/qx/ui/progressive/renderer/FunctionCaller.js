(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.Abstract": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.renderer.FunctionCaller", {
    extend: qx.ui.progressive.renderer.Abstract,

    members: {
      // overridden
      render: function render(state, element) {
        element.data(state.getUserData());
      }
    }
  });
  qx.ui.progressive.renderer.FunctionCaller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FunctionCaller.js.map?dt=1555325123560