(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tree.core.AbstractTreeItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.tree.TreeFile", {
    extend: qx.ui.tree.core.AbstractTreeItem,

    properties: {
      appearance: {
        refine: true,
        init: "tree-file"
      }
    },

    members: {
      // overridden
      _addWidgets: function _addWidgets() {
        this.addSpacer();
        this.addIcon();
        this.addLabel();
      }
    }
  });
  qx.ui.tree.TreeFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TreeFile.js.map?dt=1555325125954