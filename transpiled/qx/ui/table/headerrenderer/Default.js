(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.table.IHeaderRenderer": {
        "require": true
      },
      "qx.ui.table.headerrenderer.HeaderCell": {},
      "qx.ui.tooltip.ToolTip": {},
      "qx.util.DisposeUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.headerrenderer.Default", {
    extend: qx.core.Object,
    implement: qx.ui.table.IHeaderRenderer,

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * @type {String} The state which will be set for header cells of sorted columns.
       */
      STATE_SORTED: "sorted",

      /**
       * @type {String} The state which will be set when sorting is ascending.
       */
      STATE_SORTED_ASCENDING: "sortedAscending"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * ToolTip to show if the pointer hovers of the icon
       */
      toolTip: {
        check: "String",
        init: null,
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      createHeaderCell: function createHeaderCell(cellInfo) {
        var widget = new qx.ui.table.headerrenderer.HeaderCell();
        this.updateHeaderCell(cellInfo, widget);

        return widget;
      },

      // overridden
      updateHeaderCell: function updateHeaderCell(cellInfo, cellWidget) {
        var DefaultHeaderCellRenderer = qx.ui.table.headerrenderer.Default;

        // check for localization [BUG #2699]
        if (cellInfo.name && cellInfo.name.translate) {
          cellWidget.setLabel(cellInfo.name.translate());
        } else {
          cellWidget.setLabel(cellInfo.name);
        }

        // Set image tooltip if given
        var widgetToolTip = cellWidget.getToolTip();
        if (this.getToolTip() != null) {
          if (widgetToolTip == null) {
            // We have no tooltip yet -> Create one
            widgetToolTip = new qx.ui.tooltip.ToolTip(this.getToolTip());
            cellWidget.setToolTip(widgetToolTip);
            // Link disposer to cellwidget to prevent memory leak
            qx.util.DisposeUtil.disposeTriggeredBy(widgetToolTip, cellWidget);
          } else {
            // Update tooltip text
            widgetToolTip.setLabel(this.getToolTip());
          }
        }

        cellInfo.sorted ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED);

        cellInfo.sortedAscending ? cellWidget.addState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING) : cellWidget.removeState(DefaultHeaderCellRenderer.STATE_SORTED_ASCENDING);
      }
    }
  });
  qx.ui.table.headerrenderer.Default.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Default.js.map?dt=1555325124891