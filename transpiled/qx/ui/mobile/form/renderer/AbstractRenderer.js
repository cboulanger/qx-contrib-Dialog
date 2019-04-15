(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.renderer.IFormRenderer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.renderer.AbstractRenderer", {
    type: "abstract",
    extend: qx.ui.mobile.core.Widget,
    implement: qx.ui.form.renderer.IFormRenderer,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param form {qx.ui.mobile.form.Form} The form to be rendered
     */
    construct: function construct(form) {
      qx.ui.mobile.core.Widget.constructor.call(this);

      this._form = form;
      this._render();

      form.addListener("change", this._onFormChange, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "form"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _form: null,

      /**
       * Handler responsible for updating the rendered widget as soon as the
       * form changes.
       */
      _onFormChange: function _onFormChange() {
        this._removeAll();
        this.resetForm();
        this._render();
      },

      /**
       * Renders the for: adds the items and buttons.
       */
      _render: function _render() {
        // add the groups
        var groups = this._form.getGroups();
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          this.addItems(group.items, group.labels, group.title, group.options, group.headerOptions);
        }

        // add the buttons
        var buttons = this._form.getButtons();
        var buttonOptions = this._form.getButtonOptions();
        for (var i = 0; i < buttons.length; i++) {
          this.addButton(buttons[i], buttonOptions[i]);
        }
        this._form.setRenderer(this);
      },

      // interface implementation
      addItems: function addItems(items, names, title) {
        throw new Error("Abstract method call");
      },

      // interface implementation
      addButton: function addButton(button) {
        throw new Error("Abstract method call");
      },

      /**
       * Shows an error to the user when a form element is in invalid state
       * usually it prints an error message, so that user can rectify the filling of the form element.
       * @param item {qx.ui.mobile.core.Widget} the form item
       */
      showErrorForItem: function showErrorForItem(item) {
        throw new Error("Abstract method call");
      },

      /**
       *
       * Resets the errors for the form by removing any error messages
       * inserted into DOM in the case of invalid form elements
       *
       */
      resetForm: function resetForm() {
        throw new Error("Abstract method call");
      }
    }

  });
  qx.ui.mobile.form.renderer.AbstractRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractRenderer.js.map?dt=1555325122879