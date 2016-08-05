/**
 * 
 * Base class for dialog widgets
 * 
 * @ignore(dialog.alert)
 * @ignore(dialog.error)
 * @ignore(dialog.warning)
 * @ignore(dialog.confirm)
 * @ignore(dialog.prompt)
 * @ignore(dialog.form)
 * @ignore(dialog.select)
 * @asset(dialog/272-cross.svg)
 * @asset(dialog/273-checkmark.svg)
 * @asset(dialog/264-warning.svg)
 * @asset(dialog/269-info.svg)
 * @asset(dialog/270-cancel-circle.svg)
 * 
 */
qx.Class.define("dialog.Dialog", {
  extend: qx.ui.window.Window,
  statics: {
    /**
     * 
     * Returns a dialog instance by type
     * 
     * @param type {String} The dialog type to get
     * @return {dialog.Dialog}
     * 
     */
    getInstanceByType: function(type) {
      try {
        return new dialog[qx.lang.String.firstUp(type)];
      } catch (e) {
        this.error(type + " is not a valid dialog type");
      }
    },
    /**
     * 
     * Shortcut for alert dialog
     * 
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * 
     */
    alert: function(message, callback, context) {
      (new dialog.Alert({
        "message": message,
        "callback": callback || null,
        "context": context || null,
        "image": "dialog/269-info.svg"
      })).show();
    },
    /**
     * 
     * Shortcut for error dialog
     * 
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * 
     */
    error: function(message, callback, context) {
      (new dialog.Alert({
        "message": message,
        "callback": callback || null,
        "context": context || null,
        "image": "dialog/270-cancel-circle.svg"
      })).show();
    },
    /**
     * 
     * Shortcut for warning dialog
     * 
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * 
     */
    warning: function(message, callback, context) {
      (new dialog.Alert({
        "message": message,
        "callback": callback || null,
        "context": context || null,
        "image": "dialog/264-warning.svg"
      })).show();
    },
    /**
     * 
     * Shortcut for confirm dialog
     * 
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * 
     */
    confirm: function(message, callback, context) {
      (new dialog.Confirm({
        "message": message,
        "callback": callback || null,
        "context": context || null
      })).show();
    },
    /**
     * 
     * Shortcut for prompt dialog.
     * The value argument was forgotten in the initial implementation and
     * comes last for backwards compatibility. This might change in a future 
     * release.
     * 
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param value {String} The default value of the prompt textfield
     * 
     */
    prompt: function(message, callback, context, value) {
      (new dialog.Prompt({
        "message": message,
        "callback": callback || null,
        "context": context || null,
        "value": value || null
      })).show();
    },
    /**
     * 
     * Shortcut for select dialog
     * 
     * @param message {String} The message to display
     * @param options {Array} Options to select from
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param allowCancel {Boolean} Default: true
     * 
     */
    select: function(message, options, callback, context, allowCancel) {
      (new dialog.Select({
        "message": message,
        "allowCancel": typeof allowCancel == "boolean" ? allowCancel : true,
        "options": options,
        "callback": callback || null,
        "context": context || null
      })).show();
    },
    /**
     * 
     * Shortcut for form dialog
     * 
     * @param message {String} The message to display
     * @param formData {Map} Map of form data. See {@link dialog.Form.formData}
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * 
     */
    form: function(message, formData, callback, context) {
      (new dialog.Form({
        "message": message,
        "formData": formData,
        "allowCancel": true,
        "callback": callback,
        "context": context || null
      })).show();
    }
  },
  /**
   * 
   * @param properties {Map|String|undefined} If you supply a map, all the 
   * corresponding properties will be set. If a string is given, use it 
   * as to set the 'message' property.
   * 
   */
  construct: function(properties) {
    this.base(arguments);
    this.set({
      visibility: "hidden",
      allowClose: false,
      allowMaximize: false,
      allowMinimize: false,
      alwaysOnTop: true,
      modal: true,
      movable: false,
      resizable: false,
      showClose: false,
      showMaximize: false,
      showMinimize: false,
      showStatusbar: false
    });
    this.setLayout(new qx.ui.layout.Grow());
    var root = qx.core.Init.getApplication().getRoot();
    root.add(this);
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
    root.addListener("resize", function(e) {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round((qx.bom.Document.getHeight() - bounds.height) / 2),
        marginLeft: Math.round((qx.bom.Document.getWidth() - bounds.width) / 2)
      });
    }, this);
    this.addListener("appear", function(e) {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round((qx.bom.Document.getHeight() - bounds.height) / 2),
        marginLeft: Math.round((qx.bom.Document.getWidth() - bounds.width) / 2)
      });
    }, this);
    this._createWidgetContent();
    if (typeof properties == "object") {
      this.set(properties);
    } else if (typeof properties == "string") {
      this.setMessage(properties);
    }
  },
  properties: {
    /**
     * 
     * Callback function that will be called when the user 
     * has interacted with the widget. See sample callback
     * method supplied in the source code of each dialog 
     * widget.
     * 
     */
    callback: {
      check: "Function",
      nullable: true
    },
    /**
     * 
     * The context for the callback function
     * 
     */
    context: {
      check: "Object",
      nullable: true
    },
    /**
     * 
     * A banner image/logo that is displayed on the widget,
     * if applicable
     * 
     */
    image: {
      check: "String",
      nullable: true,
      apply: "_applyImage"
    },
    /**
     * 
     * The message that is displayed
     * 
     */
    message: {
      check: "String",
      nullable: true,
      apply: "_applyMessage"
    },
    /**
     * 
     * Whether to allow cancelling the dialog
     * 
     */
    allowCancel: {
      check: "Boolean",
      init: true,
      event: "changeAllowCancel"
    },
    focusable: {
      refine: true,
      init: true
    },
    /**
     * 
     * Whether the dialog is shown. If true, call the show() method. If false,
     * call the hide() method.
     * 
     */
    show: {
      check: "Boolean",
      nullable: true,
      event: "changeShow",
      apply: "_applyShow"
    }
  },
  events: {
    /**
     * 
     * Dispatched when user clicks on the "OK" Button
     * 
     * @type {String}
     * 
     */
    "ok": "qx.event.type.Event",
    /**
     * 
     * Dispatched when user clicks on the "Cancel" Button
     * 
     * @type {String}
     * 
     */
    "cancel": "qx.event.type.Event"
  },
  members: {
    __container: null,
    __previousFocus: null,
    _image: null,
    _message: null,
    _okButton: null,
    _cancelButton: null,
    /**
     * 
     * Create the content of the dialog. 
     * Extending classes must implement this method.
     * 
     */
    _createWidgetContent: function() {
      this.error("_createWidgetContent not implemented!");
    },
    /**
     * 
     * Creates the default container (groupbox)
     * 
     * @todo make this themeable
     * 
     */
    _createDialogContainer: function() {
      this.__container = new qx.ui.groupbox.GroupBox().set({
        layout: new qx.ui.layout.VBox(10),
        contentPadding: [16, 16, 16, 16]
      });
      this.add(this.__container);
      return this.__container;
    },
    /**
     * 
     * Create a cancel button
     * 
     * @return {qx.ui.form.Button}
     * 
     */
    _createOkButton: function() {
      var okButton = this._okButton = new qx.ui.form.Button(this.tr("OK"));
      okButton.setIcon("dialog/273-checkmark.svg");
      okButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);
      this.addListener("appear", function() {
        okButton.focus();
      }, this);
      return okButton;
    },
    /**
     * 
     * Create a cancel button, which is hidden by default and will be shown
     * if allowCancel property is set to true.
     * 
     * @return {qx.ui.form.Button}
     * 
     */
    _createCancelButton: function() {
      var cancelButton = this._cancelButton = new qx.ui.form.Button(this.tr("Cancel"));
      cancelButton.setAllowStretchX(false);
      cancelButton.setIcon("dialog/272-cross.svg");
      cancelButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      cancelButton.addListener("execute", this._handleCancel, this);
      this.bind("allowCancel", cancelButton, "visibility", {
        converter: function(value) {
          return value ? "visible" : "excluded";
        }
      });
      return cancelButton;
    },
    _applyImage: function(value, old) {
      this._image.setSource(value);
      this._image.setVisibility(value ? "visible" : "excluded");
    },
    _applyMessage: function(value, old) {
      this._message.setValue(value);
      this._message.setVisibility(value ? "visible" : "excluded");
    },
    /**
     * 
     * Returns the widgets that is the container of the dialog
     * 
     * @return {qx.ui.core.LayoutItem}
     * 
     */
    getDialogContainer: function() {
      if (!this.__container) {
        return this._createDialogContainer();
      }
      return this.__container;
    },
    /**
     * 
     * Show the widget. Overriding methods must call this parent method
     * 
     */
    show: function() {
      this.setVisibility("visible");
      this.__previousFocus = qx.ui.core.FocusHandler.getInstance().getActiveWidget();
      this.focus();
    },
    /**
     * 
     * Hide the widget. Overriding methods must call this parent method
     * 
     */
    hide: function() {
      this.setVisibility("hidden");
      if (this.__previousFocus) {
        try {
          this.__previousFocus.focus();
        } catch (e) {}
      }
    },
    /**
     * 
     * Handle click on ok button. Calls callback with a "true" argument
     * 
     */
    _handleOk: function() {
      this.hide();
      this.fireEvent("ok");
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), true);
      }
      this.resetCallback();
    },
    /**
     * 
     * Handle click on cancel button. Calls callback with 
     * an "undefined" argument
     * 
     */
    _handleCancel: function() {
      this.hide();
      this.fireEvent("cancel");
      if (this.getCallback()) {
        this.getCallback().call(this.getContext());
      }
      this.resetCallback();
    }
  }
});