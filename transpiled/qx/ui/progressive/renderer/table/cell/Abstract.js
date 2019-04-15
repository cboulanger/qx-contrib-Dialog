(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.renderer.table.cell.Abstract", {
    type: "abstract",
    extend: qx.core.Object,

    members: {
      /**
       * Retrieve any style characteristics the cell renderer wants applied to
       * this cell.
       *
       * @param cellInfo {Object}
       *   See {@link qx.ui.progressive.renderer.table.cell.Abstract} class
       *   description for details
       *
       * @return {String}
       *   The style characteristics to be applied to this cell.
       */
      _getCellStyle: function _getCellStyle(cellInfo) {
        return "";
      },

      /**
       * Retrieve any extra attributes the cell renderer wants applied to this
       * cell.  Extra attributes could be such things as
       * "onclick='handleClick()';"
       *
       * @param cellInfo {Object}
       *   See {@link qx.ui.progressive.renderer.table.cell.Abstract} class
       *   description for details
       *
       * @return {String}
       *   The extra attributes to be applied to this cell.
       */
      _getCellExtras: function _getCellExtras(cellInfo) {
        return "";
      },

      /**
       * Retrieve the HTML content to be added to the cell div.
       *
       * @param cellInfo {Object}
       *   See {@link qx.ui.progressive.renderer.table.cell.Abstract} class
       *   description for details
       *
       * @return {String}
       *   The HTML content to be added to the cell div.
       */
      _getContentHtml: function _getContentHtml(cellInfo) {
        return cellInfo.cellData || "";
      },

      /**
       * Given the provided cell information, generate the HTML for this
       * cell.
       *
       * @param cellInfo {Object}
       *   See {@link qx.ui.progressive.renderer.table.cell.Abstract} class
       *   description for details
       *
       * @return {String}
       *   The HTML required to create this cell.
       */
      render: function render(cellInfo) {
        var html = [];
        var style = this._getCellStyle(cellInfo);

        // Render this cell
        html.push("<div ", "class='", cellInfo.stylesheet, "' ");

        if (style) {
          html.push("style='", style, "'");
        }

        html.push(this._getCellExtras(cellInfo), ">", this._getContentHtml(cellInfo), "</div>");

        return html.join("");
      }
    }
  });
  qx.ui.progressive.renderer.table.cell.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1555325123651