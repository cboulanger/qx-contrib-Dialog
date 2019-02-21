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
 * Base class for embedded dialog widgets
 * 
 */
qx.Class.define("dialog.EmbeddedForm", {
  extend: qx.ui.container.Composite,
  include: dialog.MForm,

  properties:
  {

    /**
     * The message that is displayed
     */
    message: {
      check: "String",
      nullable: true,
      apply: "_applyMessage"
    },    

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
  },

  /**
   * Constructor
   * @param properties {Map|String|undefined} If you supply a map, all the
   * corresponding properties will be set. If a string is given, use it
   * as to set the 'message' property.
   */
  construct: function(properties) {
    this._formElements = {};
    this.base(arguments);
    this.setLayout(new qx.ui.layout.Grow());
    // create the form
    this.__container = this._createWidgetContent(properties || {});
    // set properties from constructor param
    if (typeof properties === "object") {
      this.set(properties);
    }
    // add widget content to window
    this.add(this.__container);
  },  

  members: {
    __container: null,
    /**
     * Returns the widgets that is the container of the dialog
     * @return {qx.ui.core.LayoutItem}
     */
    getDialogContainer: function() {
      return this.__container;
    },
   
    /**
     * Called when the 'message' property is set
     * @param value {String} The current value
     * @param old {String|null} old The previous value
     * @return {void}
     */
    _applyMessage: function(value, old) {
      this._message.setValue(value);
    },    

    /**
     * Embedded form has no OK button
     */
    _createOkButton: function(){
      return false;
    },

    /**
     * Embedded form has no Cancel button
     */
    _createCancelButton: function(){
      return false;
    },
  }
});
