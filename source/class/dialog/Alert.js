/* ************************************************************************

   qooxdoo dialog library
   https://github.com/cboulanger/qx-contrib-Dialog

   Copyright:
     2007-2017 Christian Boulanger and others

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */
/*global qx dialog*/

/**
 * A dialog that alerts the user to something.
 * @asset(dialog/269-info.svg)
 */
qx.Class.define("dialog.Alert", {
  extend: dialog.Dialog,
  members: {
    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      var container = new qx.ui.container.Composite();
      container.setLayout(new qx.ui.layout.VBox(10));
      this.add(container);
      var hbox = new qx.ui.container.Composite();
      hbox.setLayout(new qx.ui.layout.HBox(10));
      container.add(hbox);
      this._image = new qx.ui.basic.Image(
        this.getImage() || "dialog/269-info.svg"
      ).set({
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
      var okButton = this._createOkButton();
      var buttonPane = new qx.ui.container.Composite();
      var bpLayout = new qx.ui.layout.HBox();
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(okButton);
      container.add(buttonPane);
    },

    /**
     * @override
     */
     _handleEscape: function(e) {
       if (e.getKeyCode() == 27) {
         this._handleOk();
       }
     }
  }
});
