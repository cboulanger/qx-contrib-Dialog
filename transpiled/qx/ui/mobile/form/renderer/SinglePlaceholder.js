(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.renderer.Single": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.form.TextArea": {},
      "qx.bom.client.Scroll": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.form.Row": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.renderer.SinglePlaceholder", {

    extend: qx.ui.mobile.form.renderer.Single,

    /**
     * @param form {qx.ui.mobile.form.Form} The target form of this renderer
     */
    construct: function construct(form) {
      qx.ui.mobile.form.renderer.Single.constructor.call(this, form);
      this.removeCssClass("single");
      this.addCssClass("single-placeholder");
    },

    members: {

      // override
      addItems: function addItems(items, names, title) {
        if (title != null) {
          this._addGroupHeader(title);
        }
        for (var i = 0, l = items.length; i < l; i++) {

          var item = items[i];
          var name = names[i];

          if (item instanceof qx.ui.mobile.form.TextArea) {
            if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
              this._addToScrollContainer(item, name);
            } else {
              this._addRow(item, name, new qx.ui.mobile.layout.VBox());
            }
          } else {
            if (item.setPlaceholder === undefined) {
              this._addRow(item, name, new qx.ui.mobile.layout.HBox());
            } else {
              var row = new qx.ui.mobile.form.Row(new qx.ui.mobile.layout.HBox());
              item.setPlaceholder(name);
              row.add(item, {
                flex: 1
              });
              this._add(row);
            }
          }

          if (!item.isValid()) {
            this.showErrorForItem(item);
          }
        }
      }

    }
  });
  qx.ui.mobile.form.renderer.SinglePlaceholder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SinglePlaceholder.js.map?dt=1555325122937