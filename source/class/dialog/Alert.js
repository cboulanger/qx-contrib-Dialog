/**
 * 
 * A dialog that alerts the user to something.
 * 
 * @asset(dialog/269-info.svg)
 * 
 */
qx.Class.define("dialog.Alert", {
  extend: dialog.Dialog,
  members: {
    /**
     * 
     * Create the main content of the widget
     * 
     */
    _createWidgetContent: function() {
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
        contentPadding: [16, 16, 16, 16]
      });
      groupboxContainer.setLayout(new qx.ui.layout.VBox(10));
      this.add(groupboxContainer);
      var hbox = new qx.ui.container.Composite;
      hbox.setLayout(new qx.ui.layout.HBox(10));
      groupboxContainer.add(hbox);
      this._image = new qx.ui.basic.Image(this.getImage() || "dialog/269-info.svg");
      hbox.add(this._image);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, {
        flex: 1
      });
      var okButton = this._createOkButton();
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox();
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(okButton);
      groupboxContainer.add(buttonPane);
      this.addListener("appear", function() {
        okButton.focus();
      });
    }
  }
});