(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.selection.Row": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.selection.Column", {
    extend: qx.ui.virtual.selection.Row,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Returns the number of all items in the pane. This number may contain
       * unselectable items as well.
       *
       * @return {Integer} number of items
       */
      _getItemCount: function _getItemCount() {
        return this._pane.getColumnConfig().getItemCount();
      },

      /*
      ---------------------------------------------------------------------------
        IMPLEMENT ABSTRACT METHODS
      ---------------------------------------------------------------------------
      */

      // overridden
      _getSelectableFromPointerEvent: function _getSelectableFromPointerEvent(event) {
        var cell = this._pane.getCellAtPosition(event.getDocumentLeft(), event.getDocumentTop());

        if (!cell) {
          return null;
        }

        return this._isSelectable(cell.column) ? cell.column : null;
      },

      // overridden
      _getRelatedSelectable: function _getRelatedSelectable(item, relation) {
        if (relation == "left") {
          var startIndex = item - 1;
          var endIndex = 0;
          var increment = -1;
        } else if (relation == "right") {
          var startIndex = item + 1;
          var endIndex = this._getItemCount() - 1;
          var increment = 1;
        } else {
          return null;
        }

        for (var i = startIndex; i !== endIndex + increment; i += increment) {
          if (this._isSelectable(i)) {
            return i;
          }
        }
        return null;
      },

      // overridden
      _scrollItemIntoView: function _scrollItemIntoView(item) {
        if (this._autoScrollIntoView) {
          this._pane.scrollColumnIntoView(item);
        }
      },

      // overridden
      _getSelectableLocationX: function _getSelectableLocationX(item) {
        var columnConfig = this._pane.getColumnConfig();

        var itemLeft = columnConfig.getItemPosition(item);
        var itemRight = itemLeft + columnConfig.getItemSize(item) - 1;

        return {
          left: itemLeft,
          right: itemRight
        };
      },

      // overridden
      _getSelectableLocationY: function _getSelectableLocationY(item) {
        return {
          top: 0,
          bottom: this._pane.getRowConfig().getTotalSize() - 1
        };
      }
    }
  });
  qx.ui.virtual.selection.Column.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Column.js.map?dt=1555325127464