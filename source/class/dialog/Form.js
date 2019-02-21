/* ************************************************************************

   qooxdoo dialog library
   https://github.com/cboulanger/qx-contrib-Dialog

   Copyright:
     2007-2018 Christian Boulanger and others

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */

/* global qx dialog*/

/**
 * A dialog with a form that is constructed on-the-fly
 *
 */
qx.Class.define("dialog.Form", {
  extend: dialog.Dialog,
  include: dialog.MForm,
  /**
   * Constructor
   */
  construct : function(properties)
  {
    this._formElements = {};
    this.base(arguments, properties);
  },

  members: 
  {
    /**
     * Create OK Button
     * unlike our superclass, we do not add an appear listener to focus OK
     * @override
     * @return {qx.ui.form.Button}
     */
    _createOkButton: function () {
      var okButton = (this._okButton = new qx.ui.form.Button(this.tr("OK")));
      okButton.setIcon("dialog.icon.ok");
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);
      return okButton;
    },

    /**
     * Handle click on ok button. Calls callback with the result map
     * @override
     */
    _handleOk: function () {
      // only proceed if the form validates
      if ( ! this._form.getValidationManager().validate() ) {
        // this will display the warnings for required fields and invalid content
        return; 
      }
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(
        this.getContext(),
        qx.util.Serializer.toNativeObject(this.getModel())
        );
      }
      this.resetCallback();
    },
    
    /**
     * Bind the enabled state of the "OK" button to the
     * validity of the current form.
     * @param form {qx.ui.form.Form} The form to bind
     */
    _onFormReady: function (form) {
      form.getValidationManager().bind("valid", this._okButton, "enabled", {
        converter: function (value) {
          return value || false;
        }
      });
    }     
  }
});
