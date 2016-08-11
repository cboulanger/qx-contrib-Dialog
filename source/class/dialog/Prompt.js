/**
 * 
 * Confirmation popup singleton
 * 
 */
qx.Class.define("dialog.Prompt", {
  extend: dialog.Dialog,
  properties: {
    /**
     * 
     * The default value of the textfield
     * 
     * @type {String}
     * 
     */
    value: {
      check: "String",
      nullable: true,
      apply: "_applyValue",
      event: "changeValue"
    },
    /**
     *
     *
     *
     */
    placeholder: {
      check: "String",
      nullable: true,
      apply: "_applyPlaceholder",
      event: "changePlaceholder"
    },
    /**
     *
     *
     *
     */
    filter: {
      check: "RegExp",
      nullable: true,
      apply: "_applyFilter",
      event: "changeFilter"
    },
    /**
     *
     *
     *
     */
    maxLength: {
      check: "Integer",
      nullable: true,
      apply: "_applyMaxLength",
      event: "changeMaxLength"
    }
  },
  members: {
    _textField: null,
    /**
     * 
     * Create the main content of the widget
     * 
     */
    _createWidgetContent: function() {
      //var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
      //  contentPadding: [16, 16, 16, 16]
      //});
      var groupboxContainer = new qx.ui.container.Composite();
      groupboxContainer.setLayout(new qx.ui.layout.VBox(10));
      this.add(groupboxContainer);
      var hbox = new qx.ui.container.Composite;
      hbox.setLayout(new qx.ui.layout.HBox(10));
      groupboxContainer.add(hbox);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, {
        flex: 1
      });
      this._textField = new qx.ui.form.TextField();
      this._textField.addListener("changeValue", function(e) {
        this.setValue(e.getData());
      }, this);
      this._textField.addListener("changePlaceholder", function(e) {
        this.setPlaceholder(e.getData());
      }, this);
      this._textField.addListener("changeFilter", function(e) {
        this.setFilter(e.getData());
      }, this);
      this._textField.addListener("changeMaxLength", function(e) {
        this.setMaxLength(e.getData());
      }, this);
      this._textField.addListener("appear", function(e) {
        qx.lang.Function.delay(this.focus, 1, this);
      }, this._textField);
      this._textField.addListener("keyup", function(e) {
        if (e.getKeyCode() == 13) {
          return this._handleOk();
        }
        if (e.getKeyCode() == 27) {
          return this._handleCancel();
        }
      }, this);
      groupboxContainer.add(this._textField);
      this._textField.addListener("keypress", function(e) {
        if (e.getKeyIdentifier().toLowerCase() == "enter") {
          this.hide();
          this.fireEvent("ok");
          if (this.getCallback()) {
            this.getCallback().call(this.getContext(), this._textField.getValue());
          }
        }
      }, this);
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5)
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(this._createOkButton());
      buttonPane.add(this._createCancelButton());
      groupboxContainer.add(buttonPane);
    },
    /**
     *
     *
     *
     */
    _applyValue: function(value, old) {
      this._textField.setValue(value);
    },
    /**
     *
     *
     *
     */
    _applyPlaceholder: function(value, old) {
      this._textField.setPlaceholder(value);
    },
    /**
     *
     *
     *
     */
    _applyFilter: function(value, old) {
      this._textField.setFilter(value);
    },
    /**
     *
     *
     *
     */
    _applyMaxLength: function(value, old) {
      this._textField.setMaxLength(value);
    },
    /**
     * 
     * Handle click on the OK button
     * 
     */
    _handleOk: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), this.getValue());
      }
    }
  }
});