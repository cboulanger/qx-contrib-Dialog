(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.SplitButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.toolbar.Button": {},
      "qx.ui.toolbar.MenuButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.toolbar.SplitButton", {
    extend: qx.ui.form.SplitButton,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct(label, icon, menu, command) {
      qx.ui.form.SplitButton.constructor.call(this, label, icon, menu, command);

      // Toolbar buttons should not support the keyboard events
      this.removeListener("keydown", this._onKeyDown);
      this.removeListener("keyup", this._onKeyUp);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "toolbar-splitbutton"
      },

      // overridden
      focusable: {
        refine: true,
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        hovered: true,
        focused: true,
        left: true,
        middle: true,
        right: true
      },

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */

      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "button":
            control = new qx.ui.toolbar.Button();
            control.addListener("execute", this._onButtonExecute, this);
            this._addAt(control, 0);
            break;

          case "arrow":
            control = new qx.ui.toolbar.MenuButton();
            this._addAt(control, 1);
            break;
        }

        return control || qx.ui.toolbar.SplitButton.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  qx.ui.toolbar.SplitButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SplitButton.js.map?dt=1555325125782