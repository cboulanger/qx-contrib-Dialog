(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qxl.apiviewer.MWidgetRegistry": {
        "construct": true
      },
      "qx.html.Element": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.LoadingIndicator", {
    type: "singleton",
    extend: qx.core.Object,

    construct: function construct() {
      this.__blocker = new qx.ui.core.Blocker(qxl.apiviewer.MWidgetRegistry.getWidgetById("tabView"));
      this.__blocker.setColor("#D5D5D5");
      this.__blocker.setOpacity(0.5);

      this.__blocker.getBlockerElement().setStyle('padding-top', '100px');
      this.__blocker.getBlockerElement().setStyle('text-align', 'center');

      var loadingImage = new qx.html.Element('img');
      loadingImage.setAttribute('src', qx.util.ResourceManager.getInstance().toUri('qxl/apiviewer/image/loading66.gif'));
      this.__blocker.getBlockerElement().add(loadingImage);
    },

    members: {
      __blocker: null,
      show: function show() {
        this.__blocker.block();
      },
      hide: function hide() {
        this.__blocker.unblock();
      }
    }
  });
  qxl.apiviewer.LoadingIndicator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LoadingIndicator.js.map?dt=1555325130738