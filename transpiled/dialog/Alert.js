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
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.Alert", {
    extend: dialog.Dialog,
    members: {
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();
        this.add(container);
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._image = new qx.ui.basic.Image(this.getImage() || "dialog.icon.info").set({
          scale: true,
          height: 32,
          width: 32
        });
        hbox.add(this._image);
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setWidth(200);
        this._message.setAllowStretchX(true);
        hbox.add(this._message, {
          flex: 1
        });
        var buttonPane = this._createButtonPane();
        var okButton = this._createOkButton();
        buttonPane.add(okButton);
        container.add(buttonPane);
      },

      /**
       * @override
       */
      _handleEscape: function _handleEscape(e) {
        if (e.getKeyCode() === 27) {
          this._handleOk();
        }
      }
    }
  });
  dialog.Alert.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Alert.js.map?dt=1555325129966