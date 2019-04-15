(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "dialog.Dialog": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.Select", {
    extend: dialog.Dialog,
    properties: {

      /**
       * An array of maps [ { label: "Foo", icon : "icon/22/...", value : "foo" },...]
       */
      options: {
        check: "Array",
        nullable: false,
        event: "changeOptions"
      }
    },

    members: {
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();
        this.add(container);
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setWidth(200);
        this._message.setAllowStretchX(true);
        hbox.add(this._message, {
          flex: 1
        });
        var buttonPane = this._createButtonPane();
        this.addListener("changeOptions", function (event) {
          buttonPane.removeAll();
          var options = event.getData();
          options.forEach(function (option) {
            var button = new qx.ui.form.Button(option.label, option.icon);
            button.setAllowStretchX(true);
            var value = String(option.value);
            button.addListener("execute", function () {
              this._handleSelection(value);
            }, this);
            buttonPane.add(button);

            try {
              buttonPane.removeOwnedQxObject(value);
            } catch (e) {}
            button.setQxObjectId(value);
            buttonPane.addOwnedQxObject(button);
          }, this);
          var cancelButton = this._createCancelButton();
          buttonPane.add(cancelButton);
        }, this);
        container.add(buttonPane);
      },

      /**
       * Handle click on a button. Calls callback with
       * the value set in the options map.
       * @param value {var} The passed value
       */
      _handleSelection: function _handleSelection(value) {
        this.hide();
        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), value);
        }
      }
    }
  });
  dialog.Select.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Select.js.map?dt=1555325130033