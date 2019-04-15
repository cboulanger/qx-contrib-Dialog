(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Blocker": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qx.ui.core.MBlocker", {
    properties: {
      /**
       * Color of the blocker
       */
      blockerColor: {
        check: "Color",
        init: null,
        nullable: true,
        apply: "_applyBlockerColor",
        themeable: true
      },

      /**
       * Opacity of the blocker
       */
      blockerOpacity: {
        check: "Number",
        init: 1,
        apply: "_applyBlockerOpacity",
        themeable: true
      }
    },

    members: {
      __blocker: null,

      /**
       * Template method for creating the blocker item.
       * @return {qx.ui.core.Blocker} The blocker to use.
       */
      _createBlocker: function _createBlocker() {
        return new qx.ui.core.Blocker(this);
      },

      // property apply
      _applyBlockerColor: function _applyBlockerColor(value, old) {
        this.getBlocker().setColor(value);
      },

      // property apply
      _applyBlockerOpacity: function _applyBlockerOpacity(value, old) {
        this.getBlocker().setOpacity(value);
      },

      /**
       * Block all events from this widget by placing a transparent overlay widget,
       * which receives all events, exactly over the widget.
       */
      block: function block() {
        this.getBlocker().block();
      },

      /**
       * Returns whether the widget is blocked.
       *
       * @return {Boolean} Whether the widget is blocked.
       */
      isBlocked: function isBlocked() {
        return this.__blocker && this.__blocker.isBlocked();
      },

      /**
       * Unblock the widget blocked by {@link #block}, but it takes care of
       * the amount of {@link #block} calls. The blocker is only removed if
       * the number of {@link #unblock} calls is identical to {@link #block} calls.
       */
      unblock: function unblock() {
        if (this.__blocker) {
          this.__blocker.unblock();
        }
      },

      /**
       * Unblock the widget blocked by {@link #block}, but it doesn't take care of
       * the amount of {@link #block} calls. The blocker is directly removed.
       */
      forceUnblock: function forceUnblock() {
        if (this.__blocker) {
          this.__blocker.forceUnblock();
        }
      },

      /**
       * Block direct child widgets with a zIndex below <code>zIndex</code>
       *
       * @param zIndex {Integer} All child widgets with a zIndex below this value
       *     will be blocked
       */
      blockContent: function blockContent(zIndex) {
        this.getBlocker().blockContent(zIndex);
      },

      /**
       * Get the blocker
       *
       * @return {qx.ui.core.Blocker} The blocker
       */
      getBlocker: function getBlocker() {
        if (!this.__blocker) {
          this.__blocker = this._createBlocker();
        }
        return this.__blocker;
      }
    },

    destruct: function destruct() {
      this._disposeObjects("__blocker");
    }
  });
  qx.ui.core.MBlocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MBlocker.js.map?dt=1555325117350