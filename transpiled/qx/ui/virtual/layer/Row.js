(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.AbstractBackground": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.bom.element.Style": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.layer.Row", {
    extend: qx.ui.virtual.layer.AbstractBackground,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "row-layer"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        var html = [];

        var width = qx.lang.Array.sum(columnSizes);

        var top = 0;
        var row = firstRow;
        var childIndex = 0;

        for (var y = 0; y < rowSizes.length; y++) {
          var color = this.getColor(row);
          var backgroundColor = color ? "background-color:" + color + ";" : "";

          var decorator = this.getBackground(row);
          var styles = decorator ? qx.bom.element.Style.compile(decorator.getStyles()) : "";

          html.push("<div style='", "position: absolute;", "left: 0;", "top:", top, "px;", "height:", rowSizes[y], "px;", "width:", width, "px;", backgroundColor, styles, "'>", "</div>");
          childIndex++;

          top += rowSizes[y];
          row += 1;
        }

        var el = this.getContentElement().getDomElement();
        // hide element before changing the child nodes to avoid
        // premature reflow calculations
        el.style.display = "none";
        el.innerHTML = html.join("");

        el.style.display = "block";
        this._width = width;
      },

      // overridden
      _updateLayerWindow: function _updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        if (firstRow !== this.getFirstRow() || rowSizes.length !== this.getRowSizes().length || this._width < qx.lang.Array.sum(columnSizes)) {
          this._fullUpdate(firstRow, firstColumn, rowSizes, columnSizes);
        }
      },

      // overridden
      setColor: function setColor(index, color) {
        qx.ui.virtual.layer.Row.prototype.setColor.base.call(this, index, color);

        if (this.__isRowRendered(index)) {
          this.updateLayerData();
        }
      },

      // overridden
      setBackground: function setBackground(index, decorator) {
        qx.ui.virtual.layer.Row.prototype.setBackground.base.call(this, index, decorator);
        if (this.__isRowRendered(index)) {
          this.updateLayerData();
        }
      },

      /**
       * Whether the row with the given index is currently rendered (i.e. in the
       * layer's view port).
       *
       * @param index {Integer} The row's index
       * @return {Boolean} Whether the row is rendered
       */
      __isRowRendered: function __isRowRendered(index) {
        var firstRow = this.getFirstRow();
        var lastRow = firstRow + this.getRowSizes().length - 1;
        return index >= firstRow && index <= lastRow;
      }
    }
  });
  qx.ui.virtual.layer.Row.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Row.js.map?dt=1555325127309