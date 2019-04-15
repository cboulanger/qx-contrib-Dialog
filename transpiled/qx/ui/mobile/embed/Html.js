(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.embed.Html", {
    extend: qx.ui.mobile.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param html {String?null} Initial HTML content
     */
    construct: function construct(html) {
      qx.ui.mobile.core.Widget.constructor.call(this);
      if (html) {
        this.setHtml(html);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Any text string which can contain HTML, too */
      html: {
        check: "String",
        init: null,
        nullable: true,
        event: "changeHtml",
        apply: "_applyHtml"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // property apply
      _applyHtml: function _applyHtml(value, old) {
        this._setHtml(value);
      }
    }
  });
  qx.ui.mobile.embed.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1555325122399