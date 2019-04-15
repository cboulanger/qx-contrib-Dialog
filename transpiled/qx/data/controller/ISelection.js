(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.data.controller.ISelection", {
    members: {
      /**
       * Setter for the selection.
       * @param value {qx.data.IListData} The data of the selection.
       */
      setSelection: function setSelection(value) {},

      /**
       * Getter for the selection list.
       * @return {qx.data.IListData} The current selection.
       */
      getSelection: function getSelection() {},

      /**
       * Resets the selection to its default value.
       */
      resetSelection: function resetSelection() {}
    }
  });
  qx.data.controller.ISelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ISelection.js.map?dt=1555325108708