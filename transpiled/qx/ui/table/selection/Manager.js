(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.type.Dom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.selection.Manager", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * The selection model where to set the selection changes.
       */
      selectionModel: {
        check: "qx.ui.table.selection.Model"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lastPointerDownHandled: null,

      /**
       * Handles the tap event.
       *
       * @param index {Integer} the index the pointer is pointing at.
       * @param evt {qx.event.type.Tap} the pointer event.
       */
      handleTap: function handleTap(index, evt) {
        if (evt.isLeftPressed()) {
          var selectionModel = this.getSelectionModel();

          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> We react when the pointer is pressed (because of drag and drop)
            this._handleSelectEvent(index, evt);
            this.__lastPointerDownHandled = true;
          } else {
            // This index is already selected -> We react when the pointer is released (because of drag and drop)
            this.__lastPointerDownHandled = false;
          }
        } else if (evt.isRightPressed() && evt.getModifiers() == 0) {
          var selectionModel = this.getSelectionModel();

          if (!selectionModel.isSelectedIndex(index)) {
            // This index is not selected -> Set the selection to this index
            selectionModel.setSelectionInterval(index, index);
          }
        }

        if (evt.isLeftPressed() && !this.__lastPointerDownHandled) {
          this._handleSelectEvent(index, evt);
        }
      },

      /**
       * Handles the key down event that is used as replacement for pointer taps
       * (Normally space).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleSelectKeyDown: function handleSelectKeyDown(index, evt) {
        this._handleSelectEvent(index, evt);
      },

      /**
       * Handles a key down event that moved the focus (E.g. up, down, home, end, ...).
       *
       * @param index {Integer} the index that is currently focused.
       * @param evt {Map} the key event.
       */
      handleMoveKeyDown: function handleMoveKeyDown(index, evt) {
        var selectionModel = this.getSelectionModel();

        switch (evt.getModifiers()) {
          case 0:
            selectionModel.setSelectionInterval(index, index);
            break;

          case qx.event.type.Dom.SHIFT_MASK:
            var anchor = selectionModel.getAnchorSelectionIndex();

            if (anchor == -1) {
              selectionModel.setSelectionInterval(index, index);
            } else {
              selectionModel.setSelectionInterval(anchor, index);
            }

            break;
        }
      },

      /**
       * Handles a select event.
       *
       * @param index {Integer} the index the event is pointing at.
       * @param evt {Map} the pointer event.
       */
      _handleSelectEvent: function _handleSelectEvent(index, evt) {
        var selectionModel = this.getSelectionModel();

        var leadIndex = selectionModel.getLeadSelectionIndex();
        var anchorIndex = selectionModel.getAnchorSelectionIndex();

        if (evt.isShiftPressed()) {
          if (index != leadIndex || selectionModel.isSelectionEmpty()) {
            // The lead selection index was changed
            if (anchorIndex == -1) {
              anchorIndex = index;
            }

            if (evt.isCtrlOrCommandPressed()) {
              selectionModel.addSelectionInterval(anchorIndex, index);
            } else {
              selectionModel.setSelectionInterval(anchorIndex, index);
            }
          }
        } else if (evt.isCtrlOrCommandPressed()) {
          if (selectionModel.isSelectedIndex(index)) {
            selectionModel.removeSelectionInterval(index, index);
          } else {
            selectionModel.addSelectionInterval(index, index);
          }
        } else {
          // setSelectionInterval checks to see if the change is really necessary
          selectionModel.setSelectionInterval(index, index);
        }
      }
    }
  });
  qx.ui.table.selection.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1555325125547