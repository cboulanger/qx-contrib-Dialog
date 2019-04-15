(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      },
      "qx.log.appender.Native": {},
      "qx.log.appender.Console": {},
      "qx.ui.core.Widget": {},
      "qxl.apiviewer.MWidgetRegistry": {},
      "qxl.apiviewer.Viewer": {},
      "qxl.apiviewer.Controller": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.Application", {
    extend: qx.application.Standalone,

    construct: function construct() {
      qx.application.Standalone.constructor.call(this);
      var uri = qx.util.ResourceManager.getInstance().toUri("qxl/apiviewer/css/apiviewer.css");
      qx.bom.Stylesheet.includeFile(uri);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      main: function main() {
        // Call super class
        qxl.apiviewer.Application.prototype.main.base.call(this);

        // Add log appenders
        {
          qx.log.appender.Native;
          qx.log.appender.Console;
        }

        qx.Class.include(qx.ui.core.Widget, qxl.apiviewer.MWidgetRegistry);

        this.viewer = new qxl.apiviewer.Viewer();
        this.controller = new qxl.apiviewer.Controller();

        this.viewer._searchView.apiindex = this.controller.apiindex;

        this.getRoot().add(this.viewer, { edge: 0 });
      },

      // overridden
      finalize: function finalize() {
        qxl.apiviewer.Application.prototype.finalize.base.call(this);

        // Finally load the data
        this.controller.load("../db.json");
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      this._disposeObjects("viewer", "controller");
    }
  });
  qxl.apiviewer.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1555325129522