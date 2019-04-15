(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.TabView": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.DetailFrameTabView", {
    extend: qx.ui.tabview.TabView,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      add: function add(page) {
        qxl.apiviewer.DetailFrameTabView.prototype.add.base.call(this, page);
        if (this.getChildren().length == 1) {
          this.getChildren()[0].setShowCloseButton(false);
        } else {
          for (var i = 0, l = this.getChildren().length; i < l; i++) {
            this.getChildren()[i].setShowCloseButton(true);
          }
        }
      },
      remove: function remove(page) {
        if (this.getChildren().length > 1) {
          qxl.apiviewer.DetailFrameTabView.prototype.remove.base.call(this, page);
          if (this.getChildren().length == 1) {
            this.getChildren()[0].setShowCloseButton(false);
          }
        }
      }
    }
  });
  qxl.apiviewer.DetailFrameTabView.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DetailFrameTabView.js.map?dt=1555325130433