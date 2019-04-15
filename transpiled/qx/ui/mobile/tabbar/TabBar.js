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
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.ui.mobile.tabbar.TabButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.tabbar.TabBar", {
    extend: qx.ui.mobile.core.Widget,

    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */

    construct: function construct() {
      qx.ui.mobile.core.Widget.constructor.call(this);
      this._setLayout(new qx.ui.mobile.layout.HBox());
      this.addListener("tap", this._onTap, this);
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
        init: "tabBar"
      },

      /**
       * Sets the selected tab.
       */
      selection: {
        check: "qx.ui.mobile.tabbar.TabButton",
        nullable: true,
        init: null,
        apply: "_applySelection",
        event: "changeSelection"
      }
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */

    members: {
      /**
       * Event handler. Called when a tab event occurs.
       *
       * @param evt {qx.event.type.Tap} The event object
       */
      _onTap: function _onTap(evt) {
        var target = evt.getTarget();

        while (!(target instanceof qx.ui.mobile.tabbar.TabButton)) {
          if (target.getLayoutParent) {
            var layoutParent = target.getLayoutParent();
            if (layoutParent == null || layoutParent instanceof qx.ui.mobile.tabbar.TabBar) {
              target = null;
              break;
            }
            target = layoutParent;
          } else {
            target = null;
            break;
          }
        }
        if (target !== null) {
          this.setSelection(target);
        }
      },

      // property apply
      _applySelection: function _applySelection(value, old) {
        if (old) {
          old.removeCssClass("selected");
          if (old.getView()) {
            old.getView().exclude();
          }
        }
        if (value) {
          value.addCssClass("selected");
          if (value.getView()) {
            value.getView().show();
          }
        }
      },

      /**
       * Adds a tab button to the tab bar.
       *
       * @param button {qx.ui.mobile.tabbar.TabButton} The button to add
       */
      add: function add(button) {
        this._add(button, { flex: 1 });
        if (!this.getSelection()) {
          this.setSelection(button);
        }
        button.addListener("changeView", this._onChangeView, this);
      },

      /**
       * Event handler. Called when the view was changed.
       *
       * @param evt {qx.event.type.Data} The event
       */
      _onChangeView: function _onChangeView(evt) {
        if (this.getSelection() == evt.getTarget()) {
          evt.getData().show();
        }
      },

      /**
       * Removes a tab button from the tab bar.
       *
       * @param button {qx.ui.mobile.tabbar.TabButton} The button to remove
       */
      remove: function remove(button) {
        this._remove(button);
        if (this.getSelection() == button) {
          this.setSelection(null);
        }
        button.removeListener("changeView", this._onChangeView, this);
      }
    },

    destruct: function destruct() {
      this.removeListener("tap", this._onTap, this);
    }
  });
  qx.ui.mobile.tabbar.TabBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TabBar.js.map?dt=1555325123385