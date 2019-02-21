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
 * A dialog widget used to confirm a question or proposed course of action
 */
qx.Class.define("dialog.Confirm", {
  extend: dialog.Dialog,
  statics: {
    /**
     * Returns singleton instance of this class. This method has to
     * be part of any subclass extending this widget.
     * @return {Object}
     */
    getInstance: function() {
      return this.superclass.getInstance(this.classname);
    }
  },
  properties: {
    /**
     * Label used for the "yes button"
     */
    yesButtonLabel: {
      check: "String",
      nullable: false,
      init: "Yes",
      event: "changeYesButtonLabel"
    },

    /**
     * Icon used for the "yes button"
     */
    yesButtonIcon: {
      check: "String",
      nullable: true,
      init: "dialog.icon.ok",
      event: "changeYesButtonIcon"
    },

    /**
     * Label used for the "no button"
     */
    noButtonLabel: {
      check: "String",
      nullable: false,
      init: "No",
      event: "changeNoButtonLabel"
    },

    /**
     * Icon used for the "no button"
     */
    noButtonIcon: {
      check: "String",
      nullable: true,
      init: "dialog.icon.cancel",
      event: "changeNoButtonIcon"
    },

    /**
     * This property controls the display of a cancel button
     */
    allowCancel: {
      refine: true,
      init: false
    }
  },

  members: {
    _yesButton: null,
    _noButton: null,

    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      let container = this._createDialogContainer();
      let hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      container.add(hbox);
      this._image = new qx.ui.basic.Image();
      this._image.setVisibility("excluded");
      hbox.add(this._image);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, { flex: 1 });

      // buttons
      let buttonPane = this._createButtonPane();

      // yes button
      let yesButton = (this._yesButton = new qx.ui.form.Button());
      yesButton.setAllowStretchX(true);
      yesButton.addListener("execute", this._handleYes, this);
      this.bind("yesButtonLabel", yesButton, "label");
      this.bind("yesButtonIcon", yesButton, "icon");
      yesButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      yesButton.setLabel(this.tr("yes"));
      // no button
      let noButton = (this._noButton = new qx.ui.form.Button());

      noButton.setAllowStretchX(true);
      noButton.addListener("execute", this._handleNo, this);
      this.bind("noButtonLabel", noButton, "label");
      this.bind("noButtonIcon", noButton, "icon");
      noButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      noButton.setLabel(this.tr("no"));
      let cancelButton = this._createCancelButton();
      buttonPane.add(yesButton);
      buttonPane.add(noButton);
      buttonPane.add(cancelButton);

      container.add(buttonPane);
      this.add(container);

      // object id
      if (qx.core.Environment.get("module.objectid") === true) {
        yesButton.setQxObjectId("yes");
        this.getQxObject("buttons").addOwnedQxObject(yesButton);
        noButton.setQxObjectId("no");
        this.getQxObject("buttons").addOwnedQxObject(noButton);
      }
    },

    /**
     * Handle click on yes button. Calls callback with
     * a "true" value
     */
    _handleYes: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), true);
      }
      this.resetCallback();
    },

    /**
     * Handle click on no button. Calls callback with
     * a "false" value
     */
    _handleNo: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), false);
      }
    }
  }
});
