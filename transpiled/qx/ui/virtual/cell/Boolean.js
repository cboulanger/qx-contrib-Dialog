(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.AbstractImage": {
        "construct": true,
        "require": true
      },
      "qx.util.AliasManager": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.Boolean", {
    extend: qx.ui.virtual.cell.AbstractImage,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.ui.virtual.cell.AbstractImage.constructor.call(this);
      this.__aliasManager = qx.util.AliasManager.getInstance();
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "cell-boolean"
      },

      /**
      * The icon used to indicate the true state
      */
      iconTrue: {
        check: "String",
        themeable: true,
        apply: "_applyIconTrue"
      },

      /**
      * The icon used to indicate the false state
      */
      iconFalse: {
        check: "String",
        themeable: true,
        apply: "_applyIconFalse"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __imageTrue: null,
      __imageFalse: null,
      __aliasManager: null,

      // property apply
      _applyIconTrue: function _applyIconTrue(value) {
        this.__imageTrue = this.__aliasManager.resolve(value);
      },

      // property apply
      _applyIconFalse: function _applyIconFalse(value) {
        this.__imageFalse = this.__aliasManager.resolve(value);
      },

      // overridden
      _identifyImage: function _identifyImage(value) {
        return value == true ? this.__imageTrue : this.__imageFalse;
      }
    }
  });
  qx.ui.virtual.cell.Boolean.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Boolean.js.map?dt=1555325126825