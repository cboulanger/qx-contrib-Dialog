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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.tree.TreeFolder", {
    extend: qx.ui.tree.core.AbstractTreeItem,

    properties: {
      appearance: {
        refine: true,
        init: "tree-folder"
      }
    },

    members: {
      // overridden
      _addWidgets: function _addWidgets() {
        this.addSpacer();
        this.addOpenButton();
        this.addIcon();
        this.addLabel();
      }
    }
  });
  qx.ui.tree.TreeFolder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TreeFolder.js.map?dt=1555325125960