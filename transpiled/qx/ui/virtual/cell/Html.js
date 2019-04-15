(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.Cell": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.Html", {
    extend: qx.ui.virtual.cell.Cell,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {

      appearance: {
        refine: true,
        init: "cell-html"
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
        return value;
      }

    }

  });
  qx.ui.virtual.cell.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1555325126897