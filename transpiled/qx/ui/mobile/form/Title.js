(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.basic.Label": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.Title", {
    extend: qx.ui.mobile.basic.Label,

    properties: {
      wrap: {
        refine: true,
        init: false
      },

      // overridden
      defaultCssClass: {
        refine: true,
        init: "form-title"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "h2";
      }
    }
  });
  qx.ui.mobile.form.Title.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Title.js.map?dt=1555325122851