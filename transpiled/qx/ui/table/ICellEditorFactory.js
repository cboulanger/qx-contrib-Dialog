(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.table.ICellEditorFactory", {

    members: {
      /**
       * Creates a cell editor.
       *
       * The cellInfo map contains the following properties:
       * <ul>
       * <li>value (var): the cell's value.</li>
       * <li>row (int): the model index of the row the cell belongs to.</li>
       * <li>col (int): the model index of the column the cell belongs to.</li>
       * <li>xPos (int): the x position of the cell in the table pane.</li>
       * <li>table (qx.ui.table.Table) reference to the table, the cell belongs to. </li>
       * </ul>
       *
       * @abstract
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget} the widget that should be used as cell editor.
       */
      createCellEditor: function createCellEditor(cellInfo) {
        return true;
      },

      /**
       * Returns the current value of a cell editor.
       *
       * @abstract
       * @param cellEditor {qx.ui.core.Widget} The cell editor formally created by
       *      {@link #createCellEditor}.
       * @return {var} the current value from the editor.
       */
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        return true;
      }
    }
  });
  qx.ui.table.ICellEditorFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ICellEditorFactory.js.map?dt=1555325124038