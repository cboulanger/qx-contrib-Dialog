(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.html.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.FormTag", {
    extend: qx.ui.container.Composite,

    construct: function construct(layout) {
      qx.ui.container.Composite.constructor.call(this, layout || new qx.ui.layout.VBox());
    },

    members: {
      // overridden
      // Instead of creating a <div> for the content element, use <form>
      _createContentElement: function _createContentElement() {
        return new qx.html.Element("form");
      }
    }
  });
  dialog.FormTag.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormTag.js.map?dt=1555325130247