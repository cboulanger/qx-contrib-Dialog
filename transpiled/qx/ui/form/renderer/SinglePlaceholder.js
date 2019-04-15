(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.renderer.Single": {
        "require": true
      },
      "qx.ui.form.renderer.IFormRenderer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.form.renderer.SinglePlaceholder", {
    extend: qx.ui.form.renderer.Single,
    implement: qx.ui.form.renderer.IFormRenderer,

    members: {
      // overridden
      addItems: function addItems(items, names, title) {
        // add the header
        if (title != null) {
          this._add(this._createHeader(title), { row: this._row, column: 0, colSpan: 2 });
          this._row++;
        }

        // add the items
        for (var i = 0; i < items.length; i++) {
          if (items[i].setPlaceholder === undefined) {
            throw new Error("Only widgets with placeholders supported.");
          }
          items[i].setPlaceholder(names[i]);
          this._add(items[i], { row: this._row, column: 0 });
          this._row++;
        }
      }
    }
  });
  qx.ui.form.renderer.SinglePlaceholder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SinglePlaceholder.js.map?dt=1555325120143