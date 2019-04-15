(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.Cell": {
        "construct": true,
        "require": true
      },
      "qx.bom.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.String", {
    extend: qx.ui.virtual.cell.Cell,

    construct: function construct() {
      qx.ui.virtual.cell.Cell.constructor.call(this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "cell-string"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        IMPLEMENT CELL API
      ---------------------------------------------------------------------------
      */

      getContent: function getContent(value, states) {
        return value ? qx.bom.String.escape(value) : "";
      }
    }

  });
  qx.ui.virtual.cell.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1555325126933