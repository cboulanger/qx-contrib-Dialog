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
 * Prompts the user with a question or request for information and a text
 * field in which the user can type something. Similar to window.prompt(),
 * but asyncronous
 */
qx.Class.define("dialog.Prompt", {
  extend: dialog.Dialog,
  properties: {
    /**
     * The default value of the textfield
     * @type {String}
     */
    value: {
      check: "String",
      nullable: true,
      event: "changeValue"
    },

    /**
     * A placeholder text
     */
    placeholder: {
      check: "String",
      nullable: true,
      apply: "_applyPlaceholder"
    },

    /**
     * A regular expression used to determine valid input
     */
    filter: {
      check: "RegExp",
      nullable: true,
      apply: "_applyFilter"
    },

    /**
     * The maximum length of the input
     */
    maxLength: {
      check: "Integer",
      nullable: true,
      apply: "_applyMaxLength"
    }
  },

  members: {
    _textField: null,

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
      this._textField = new qx.ui.form.TextField();
      this.bind("value", this._textField, "value");
      this._textField.bind("value", this, "value");
      this._textField.addListener(
        "appear",
        function(e) {
          qx.lang.Function.delay(this.focus, 1, this);
        },
        this._textField
      );
      this._textField.addListener(
        "keyup",
        function(e) {
          if (e.getKeyCode() == 13) {
            return this._handleOk();
          }
          if (e.getKeyCode() == 27) {
            return this._handleCancel();
          }
        },
        this
      );
      container.add(this._textField);
      this._textField.addListener(
        "keypress",
        function(e) {
          if (e.getKeyIdentifier().toLowerCase() == "enter") {
            this.hide();
            this.fireEvent("ok");
            if (this.getCallback()) {
              this.getCallback().call(
                this.getContext(),
                this._textField.getValue()
              );
            }
          }
        },
        this
      );
      var buttonPane = new qx.ui.container.Composite();
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(this._createOkButton());
      buttonPane.add(this._createCancelButton());
      container.add(buttonPane);
    },

    /**
     * Applies the 'placeholder' property
     */
    _applyPlaceholder: function(value, old) {
      this._textField.setPlaceholder(value);
    },

    /**
     * Applies the 'filter' property
     */
    _applyFilter: function(value, old) {
      this._textField.setFilter(value);
    },

    /**
     * Applies the 'maxLength' propery
     */
    _applyMaxLength: function(value, old) {
      this._textField.setMaxLength(value);
    },

    /**
     * Handle click on the OK button
     */
    _handleOk: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), this.getValue());
      }
    }
  }
});
