(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.core.IMultiSelection", {
    extend: qx.ui.core.ISingleSelection,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Selects all items of the managed object.
       */
      selectAll: function selectAll() {
        return true;
      },

      /**
       * Adds the given item to the existing selection.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      addToSelection: function addToSelection(item) {
        return arguments.length == 1;
      },

      /**
       * Removes the given item from the selection.
       *
       * Use {@link qx.ui.core.ISingleSelection#resetSelection} when you
       * want to clear the whole selection at once.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      removeFromSelection: function removeFromSelection(item) {
        return arguments.length == 1;
      }
    }
  });
  qx.ui.core.IMultiSelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IMultiSelection.js.map?dt=1555325117164