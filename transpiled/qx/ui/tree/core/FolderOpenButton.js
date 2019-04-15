(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Image": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MExecutable": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.tree.core.FolderOpenButton", {
    extend: qx.ui.basic.Image,
    include: qx.ui.core.MExecutable,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.ui.basic.Image.constructor.call(this);

      this.initOpen();

      this.addListener("tap", this._onTap);
      this.addListener("pointerdown", this._stopPropagation, this);
      this.addListener("pointerup", this._stopPropagation, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether the button state is "open"
       */
      open: {
        check: "Boolean",
        init: false,
        event: "changeOpen",
        apply: "_applyOpen"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // property apply
      _applyOpen: function _applyOpen(value, old) {
        value ? this.addState("opened") : this.removeState("opened");
        this.execute();
      },

      /**
       * Stop tap event propagation
       *
       * @param e {qx.event.type.Event} The event object
       */
      _stopPropagation: function _stopPropagation(e) {
        e.stopPropagation();
      },

      /**
       * Pointer tap event listener
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onTap: function _onTap(e) {
        this.toggleOpen();
        e.stopPropagation();
      }
    }
  });
  qx.ui.tree.core.FolderOpenButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FolderOpenButton.js.map?dt=1555325126174