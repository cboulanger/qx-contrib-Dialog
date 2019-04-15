(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.ui.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ui.panels.ClassPanel": {
        "construct": true
      },
      "qxl.apiviewer.ui.panels.PackagePanel": {
        "construct": true
      },
      "qxl.apiviewer.dao.Package": {
        "construct": true
      },
      "qx.util.StringBuilder": {},
      "qxl.apiviewer.ui.panels.InfoPanel": {},
      "qx.Promise": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ui.PackageViewer", {
    extend: qxl.apiviewer.ui.AbstractViewer,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qxl.apiviewer.ui.AbstractViewer.constructor.call(this);
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("class").set({ type: "class" }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("interface").set({ type: "interface" }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.ClassPanel("mixin").set({ type: "mixin" }));
      this.addInfoPanel(new qxl.apiviewer.ui.panels.PackagePanel("packages"));

      this.getContentElement().setAttribute("class", "ClassViewer");

      this._init(qxl.apiviewer.dao.Package.getPackage(null));
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      /**
       * Returns the HTML fragment for the title
       *
       * @param classNode {qxl.apiviewer.dao.Package} the package documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        var vHtml = "";

        // Title
        vHtml += '<small>package</small>';
        vHtml += classNode.getFullName();
        return vHtml;
      },

      _getTocHtml: function _getTocHtml(classNode) {
        return document.createTextNode('');
      },

      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        var descHtml = new qx.util.StringBuilder();
        var desc = classNode.getDescription();
        if (desc != "") {
          descHtml.add('<div class="class-description">', qxl.apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(desc, classNode), '</div>');
        }
        return qx.Promise.resolve(descHtml.get());
      }

    }
  });
  qxl.apiviewer.ui.PackageViewer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PackageViewer.js.map?dt=1555325130918