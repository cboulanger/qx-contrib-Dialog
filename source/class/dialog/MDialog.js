/* ************************************************************************

   qooxdoo dialog library
   https://github.com/cboulanger/qx-contrib-Dialog

   Copyright:
     2007-2018 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */
/*global qx dialog*/

/**
 * Mixin that provides basic features for modal or embedded dialog widgets
 */
qx.Mixin.define("dialog.MDialog", 
{
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
    _image: null,
    _message: null,
    _okButton: null,
    _cancelButton: null,

    /**
     * Create the visible content of the dialog.
     * @param properties {Map} 
     *    The properties map passed to the constructor. You can pass
     *    additional, non-widget-properties in this map to be used in this method,
     *    but the need to be deleted from the map before returning. 
     * @return {qx.ui.core.LayoutItem}
     *    A container object with the actual UI of the dialog widget
     */
    _createWidgetContent: function(properties) {
      // Extending classes must implement this method.
      this.error("_createWidgetContent not implemented!");
    },

    /**
     * Create an OK button
     * @return {qx.ui.form.Button}
     */
    _createOkButton: function() {
      var okButton = (this._okButton = new qx.ui.form.Button(this.tr("OK")));
      okButton.setIcon("dialog.icon.ok");
      okButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);
      this.addListener( "appear", function() {
        okButton.focus();
      }, this );
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
      cancelButton.setIcon("dialog.icon.cancel");
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
    }
  }
});
