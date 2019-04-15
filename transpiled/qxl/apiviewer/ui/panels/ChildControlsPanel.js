(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.panels.InfoPanel": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.ChildControl": {},
      "qx.util.StringBuilder": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.panels.ChildControlsPanel", {

    extend: qxl.apiviewer.ui.panels.InfoPanel,

    construct: function construct() {
      qxl.apiviewer.ui.panels.InfoPanel.constructor.call(this, "Child Controls", "qxl/apiviewer/image/childcontrol18.gif");
    },

    members: {

      /**
       * @Override
       */
      canDisplayItem: function canDisplayItem(dao) {
        return dao instanceof qxl.apiviewer.dao.ChildControl;
      },

      getPanelItemObjects: function getPanelItemObjects(daoClass, showInherited) {
        return daoClass.getChildControls();
      },

      getItemTypeHtml: function getItemTypeHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.createTypeHtml(node, "var", true);
      },

      getItemTitleHtml: function getItemTitleHtml(node, currentClassDocNode) {
        return qxl.apiviewer.ui.panels.InfoPanel.setTitleClass(node, node.getName());
      },

      getItemTextHtml: function getItemTextHtml(node, currentClassDocNode, showDetails) {
        var textHtml = new qx.util.StringBuilder(node.getDescription());

        if (showDetails) {
          textHtml.add('<div class="item-detail-headline">', "Default value:", '</div>', '<div class="item-detail-text">', '<code>', node.getDefaultValue() ? node.getDefaultValue() : "null", '</code>', '</div>');
        }

        return textHtml.get();
      }

    }

  });
  qxl.apiviewer.ui.panels.ChildControlsPanel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ChildControlsPanel.js.map?dt=1555325131359