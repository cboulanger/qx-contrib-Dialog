(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      },
      "qx.bom.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.cellrenderer.Replace", {
    extend: qx.ui.table.cellrenderer.Default,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {

      /** a hashmap which is used to replace values by labels */
      replaceMap: {
        check: "Object",
        nullable: true,
        init: null
      },

      /**
       * function that provides the label for a specific value
       **/
      replaceFunction: {
        check: "Function",
        nullable: true,
        init: null
      }

    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        var value = cellInfo.value;
        var replaceMap = this.getReplaceMap();
        var replaceFunc = this.getReplaceFunction();
        var label;

        // use map
        if (replaceMap) {
          label = replaceMap[value];
          if (typeof label != "undefined") {
            cellInfo.value = label;
            return qx.bom.String.escape(this._formatValue(cellInfo));
          }
        }

        // use function
        if (replaceFunc) {
          cellInfo.value = replaceFunc(value);
        }
        return qx.bom.String.escape(this._formatValue(cellInfo));
      },

      /**
       * adds a reversed replaceMap to itself to translate labels back to the original values
       * @return {Boolean} <code>true</code>
       */
      addReversedReplaceMap: function addReversedReplaceMap() {
        var map = this.getReplaceMap();
        for (var key in map) {
          var value = map[key];
          map[value] = key;
        }
        return true;
      }
    }
  });
  qx.ui.table.cellrenderer.Replace.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Replace.js.map?dt=1555325124715