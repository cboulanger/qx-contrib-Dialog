(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.AbstractWidget": {
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.util.PropertyUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.virtual.cell.WidgetCell", {
    extend: qx.ui.virtual.cell.AbstractWidget,

    properties: {
      /**
       * Delegation object, which can have one or more functions defined by the
       * {@link qx.ui.virtual.cell.IWidgetCellDelegate} interface.
       */
      delegate: {
        apply: "_applyDelegate",
        init: null,
        nullable: true
      }
    },

    members: {
      // apply method
      _applyDelegate: function _applyDelegate(value, old) {
        this._cleanupPool();
      },

      // overridden
      _createWidget: function _createWidget() {
        var delegate = this.getDelegate();

        if (delegate != null && delegate.createWidget != null) {
          return delegate.createWidget();
        } else {
          return new qx.ui.core.Widget();
        }
      },

      // overridden
      updateData: function updateData(widget, data) {
        for (var key in data) {
          if (qx.Class.hasProperty(widget.constructor, key)) {
            qx.util.PropertyUtil.setUserValue(widget, key, data[key]);
          } else {
            throw new Error("Can't update data! The key '" + key + "' is not a Property!");
          }
        }
      }
    }
  });
  qx.ui.virtual.cell.WidgetCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetCell.js.map?dt=1555325126942