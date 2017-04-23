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
 * Dialog that offers the user a choice of alternative buttons to select from.
 */
qx.Class.define("dialog.Select", {
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
    _createWidgetContent: function() {
      var container = new qx.ui.container.Composite();
      container.setLayout(new qx.ui.layout.VBox(10));
      this.add(container);
      var hbox = new qx.ui.container.Composite();
      hbox.setLayout(new qx.ui.layout.HBox(10));
      container.add(hbox);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, {
        flex: 1
      });
      var buttonPane = new qx.ui.container.Composite();
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      this.addListener("changeOptions", function(event) {
        buttonPane.removeAll();
        var options = event.getData();
        options.forEach(function(option) {
          var button = new qx.ui.form.Button(option.label, option.icon);
          button.setAllowStretchX(true);
          var value = "" + option.value;
          button.addListener("execute", function() {
            this._handleSelection(value);
          }, this);
          buttonPane.add(button);
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
    _handleSelection: function(value) {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), value);
      }
    }
  }
});
