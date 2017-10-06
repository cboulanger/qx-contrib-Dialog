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
 * Base class for dialog widgets
 * @ignore(dialog.alert)
 * @ignore(dialog.error)
 * @ignore(dialog.warning)
 * @ignore(dialog.confirm)
 * @ignore(dialog.prompt)
 * @ignore(dialog.form)
 * @ignore(dialog.select)
 * @ignore(Promise)
 * @asset(dialog/272-cross.svg)
 * @asset(dialog/273-checkmark.svg)
 * @asset(dialog/264-warning.svg)
 * @asset(dialog/269-info.svg)
 * @asset(dialog/270-cancel-circle.svg)
 */
qx.Class.define("dialog.Dialog", {
  extend: qx.ui.window.Window,
  statics: {
    /**
     * for backwards-compability
     * @type {Boolean}
     */
    __useBlocker: false,

    /**
     * Enforce the use of a coloured blocker.
     * Added for backwards-compability with pre-1.2 versions
     * @param  value {Boolean}
     * @return {void}
     */
    useBlocker: function(value) {
      dialog.Dialog.__useBlocker = value;
    },

    /**
     * Returns a dialog instance by type
     * @param type {String} The dialog type to get
     * @return {dialog.Dialog}
     */
    getInstanceByType: function(type) {
      try {
        return new (dialog[qx.lang.String.firstUp(type)])();
      } catch (e) {
        this.error(type + " is not a valid dialog type");
      }
    },
    /**
     * Shortcut for alert dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    alert: function(message, callback, context, caption) {
      return new dialog.Alert({
        message: message,
        image: "dialog/269-info.svg",
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for error dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    error: function(message, callback, context, caption) {
      return new dialog.Alert({
        message: message,
        callback: callback || null,
        context: context || null,
        image: "dialog/270-cancel-circle.svg",
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for warning dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    warning: function(message, callback, context, caption) {
      return new dialog.Alert({
        message: message,
        callback: callback || null,
        context: context || null,
        image: "dialog/264-warning.svg",
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for confirm dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    confirm: function(message, callback, context, caption) {
      return new dialog.Confirm({
        message: message,
        callback: callback || null,
        context: context || null,
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for prompt dialog.
     * The value argument was forgotten in the initial implementation and
     * comes last for backwards compatibility. This might change in a future
     * release.
     * @param caption {String} The caption of the dialog window
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param value {String} The default value of the prompt textfield
     * @return {dialog.Alert} The widget instance
     *
     */
    prompt: function(message, callback, context, value, caption) {
      return new dialog.Prompt({
        message: message,
        callback: callback || null,
        context: context || null,
        value: value || null,
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for select dialog
     * @param message {String} The message to display
     * @param options {Array} Options to select from
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param allowCancel {Boolean} Default: true
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    select: function(
      message,
      options,
      callback,
      context,
      allowCancel,
      caption
    ) {
      return new dialog.Select({
        message: message,
        allowCancel: typeof allowCancel == "boolean" ? allowCancel : true,
        options: options,
        callback: callback || null,
        context: context || null,
        caption: caption || ""
      }).show();
    },

    /**
     * Shortcut for form dialog
     * @param message {String} The message to display
     * @param formData {Map} Map of form data. See {@link dialog.Form.formData}
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param caption {String} The caption of the dialog window
     * @return {dialog.Alert} The widget instance
     */
    form: function(message, formData, callback, context, caption) {
      return new dialog.Form({
        message: message,
        formData: formData,
        allowCancel: true,
        callback: callback || null,
        context: context || null,
        caption: caption || ""
      }).show();
    }
  },

  /**
   * Constructor
   * @param properties {Map|String|undefined} If you supply a map, all the
   * corresponding properties will be set. If a string is given, use it
   * as to set the 'message' property.
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
    // use blocker (for backwards-compability)
    this.__blocker = new qx.ui.core.Blocker(root);
    this.__blocker.setOpacity(this.getBlockerOpacity());
    this.__blocker.setColor(this.getBlockerColor());
    // handle focus
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
    // resize the window when viewport size changes
    root.addListener(
      "resize",
      function(e) {
        var bounds = this.getBounds();
        this.set({
          marginTop: Math.round(
            (qx.bom.Document.getHeight() - bounds.height) / 2
          ),
          marginLeft: Math.round(
            (qx.bom.Document.getWidth() - bounds.width) / 2
          )
        });
      },
      this
    );
    this.addListener(
      "appear",
      function(e) {
        var bounds = this.getBounds();
        this.set({
          marginTop: Math.round(
            (qx.bom.Document.getHeight() - bounds.height) / 2
          ),
          marginLeft: Math.round(
            (qx.bom.Document.getWidth() - bounds.width) / 2
          )
        });
      },
      this
    );
    this._createWidgetContent();
    // set properties from constructor param
    if (typeof properties == "object") {
      this.set(properties);
    } else if (typeof properties == "string") {
      this.setMessage(properties);
    }

    // escape key
    qx.core.Init.getApplication().getRoot().addListener("keyup",this._handleEscape,this);
  },

  properties: {
    /**
     * Callback function that will be called when the user
     * has interacted with the widget. See sample callback
     * method supplied in the source code of each dialog
     * widget.
     */
    callback: {
      check: "Function",
      nullable: true
    },

    /**
     * The context for the callback function
     */
    context: {
      check: "Object",
      nullable: true
    },

    /**
     * A banner image/logo that is displayed on the widget,
     * if applicable
     */
    image: {
      check: "String",
      nullable: true,
      apply: "_applyImage"
    },

    /**
     * The message that is displayed
     */
    message: {
      check: "String",
      nullable: true,
      apply: "_applyMessage"
    },

    /**
     * Whether to allow cancelling the dialog
     */
    allowCancel: {
      check: "Boolean",
      init: true,
      event: "changeAllowCancel"
    },

    /**
     * Whether to triger the cancel button on pressing the "escape" key
     * (default: true). Depends on the 'allowCancel' property.
     */
    cancelOnEscape: {
      check: "Boolean",
      init: true
    },

    /**
     * Whether the dialog is shown. If true, call the show() method. If false,
     * call the hide() method.
     */
    show: {
      check: "Boolean",
      nullable: true,
      event: "changeShow",
      apply: "_applyShow"
    },

    /**
    * Whether to block the ui while the widget is displayed
    */
    useBlocker: {
      check: "Boolean",
      init: false
    },

    /**
    * The blocker's color
    */
    blockerColor: {
      check: "String",
      init: "black"
    },

    /**
    * The blocker's opacity
    */
    blockerOpacity: {
      check: "Number",
      init: 0.5
    }
  },

  events: {
    /**
     * Dispatched when user clicks on the "OK" Button
     * @type {String}
     */
    ok: "qx.event.type.Event",

    /**
     * Dispatched when user clicks on the "Cancel" Button
     * @type {String}
     */
    cancel: "qx.event.type.Event"
  },

  members: {
    __container: null,
    __previousFocus: null,
    _image: null,
    _message: null,
    _okButton: null,
    _cancelButton: null,

    /**
     * Create the content of the dialog.
     * Extending classes must implement this method.
     */
    _createWidgetContent: function() {
      this.error("_createWidgetContent not implemented!");
    },

    /**
     * Creates the default container (groupbox)
     * @return {qx.ui.container.Composite}
     */
    _createDialogContainer: function() {
      this.__container = new qx.ui.container.Composite().set({
        layout: new qx.ui.layout.VBox(10)
      });
      this.add(this.__container);
      return this.__container;
    },

    /**
     * Create an OK button
     * @return {qx.ui.form.Button}
     */
    _createOkButton: function() {
      var okButton = (this._okButton = new qx.ui.form.Button(this.tr("OK")));
      okButton.setIcon("dialog/273-checkmark.svg");
      okButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);
      this.addListener(
        "appear",
        function() {
          okButton.focus();
        },
        this
      );
      return okButton;
    },

    /**
     * Create a cancel button, which is hidden by default and will be shown
     * if allowCancel property is set to true.
     * @return {qx.ui.form.Button}
     */
    _createCancelButton: function() {
      var cancelButton = (this._cancelButton = new qx.ui.form.Button(
        this.tr("Cancel")
      ));
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

    /**
     * Called when the 'image' property is set
     * @param value {String} The current value
     * @param old {String|null} old The previous value
     * @return {void}
     */
    _applyImage: function(value, old) {
      this._image.setSource(value);
      this._image.setVisibility(value ? "visible" : "excluded");
    },

    /**
     * Called when the 'message' property is set
     * @param value {String} The current value
     * @param old {String|null} old The previous value
     * @return {void}
     */
    _applyMessage: function(value, old) {
      this._message.setValue(value);
      this._message.setVisibility(value ? "visible" : "excluded");
    },

    /**
     * Returns the widgets that is the container of the dialog
     * @return {qx.ui.core.LayoutItem}
     */
    getDialogContainer: function() {
      if (!this.__container) {
        return this._createDialogContainer();
      }
      return this.__container;
    },

    /**
     * Show the widget. Overriding methods must call this parent method.
     * Returns the widget instance for chaining.
     * @return {dialog.Dialog} The widget instance
     */
    show: function() {
      if (this.isUseBlocker() || dialog.Dialog.__useBlocker) {
        // make sure the dialog is above any opened window
        var root = qx.core.Init.getApplication().getRoot();
        var maxWindowZIndex = root.getZIndex();
        var windows = root.getWindows();
        for (var i = 0; i < windows.length; i++) {
          var zIndex = windows[i].getZIndex();
          maxWindowZIndex = Math.max(maxWindowZIndex, zIndex);
        }
        this.setZIndex(maxWindowZIndex + 1);
        this.__blocker.blockContent(maxWindowZIndex);
      }
      this.setVisibility("visible");
      this.__previousFocus = qx.ui.core.FocusHandler
        .getInstance()
        .getActiveWidget();
      if( this.__previousFocus ){
        this.__previousFocus.blur();
        //this.__previousFocus.setFocusable(false);
      }
      return this;
    },

    /**
     * Hide the widget. Overriding methods must call this parent method.
     * Returns the widget instance for chaining.
     * @return {dialog.Dialog} The widget instance
     */
    hide: function() {
      if (this.isUseBlocker() || dialog.Dialog.__useBlocker) {
        this.__blocker.unblock();
      }
      if (this.__previousFocus) {
        try {
          //this.__previousFocus.setFocusable(true);
          this.__previousFocus.focus();
        } catch (e) {}
      }
      this.setVisibility("hidden");
      return this;
    },

    /**
     * Promise interface method, avoids callbacks
     * @return {Promise} A promise that resolves with the result of the dialog
     * action
     */
    promise: function(){
      return new Promise(function(resolve, reject) {
        this.setCallback(function(value){
          this.resetCallback();
          resolve(value);
        }.bind(this));
      }.bind(this));
    },

    /**
     * Handle click on ok button. Calls callback with a "true" argument
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
     * Handle click on cancel button. Calls callback with
     * an "undefined" argument
     */
    _handleCancel: function() {
      this.hide();
      this.fireEvent("cancel");
      if (this.isAllowCancel() && this.getCallback()) {
        this.getCallback().call(this.getContext());
      }
      this.resetCallback();
    },

    /**
     * Handles the press on the 'Escape' key
     * @param  e {qx.event.type.KeyInput}
     */
    _handleEscape: function(e) {
      if (this.isSeeable() && this.isCancelOnEscape() && e.getKeyCode() == 27) {
        this._handleCancel();
      }
    }
  }
});
