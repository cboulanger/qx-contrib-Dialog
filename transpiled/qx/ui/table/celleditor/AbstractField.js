(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.table.ICellEditorFactory": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.table.celleditor.AbstractField", {
    extend: qx.core.Object,
    implement: qx.ui.table.ICellEditorFactory,
    type: "abstract",

    properties: {
      /**
       * function that validates the result
       * the function will be called with the new value and the old value and is
       * supposed to return the value that is set as the table value.
       **/
      validationFunction: {
        check: "Function",
        nullable: true,
        init: null
      }
    },

    members: {
      /**
       * Factory to create the editor widget
       *
       * @return {qx.ui.core.Widget} The editor widget
       */
      _createEditor: function _createEditor() {
        throw new Error("Abstract method call!");
      },

      // interface implementation
      createCellEditor: function createCellEditor(cellInfo) {
        var cellEditor = this._createEditor();

        cellEditor.originalValue = cellInfo.value;
        if (cellInfo.value === null || cellInfo.value === undefined) {
          cellInfo.value = "";
        }
        cellEditor.setValue("" + cellInfo.value);

        cellEditor.addListener("appear", function () {
          cellEditor.selectAllText();
        });

        return cellEditor;
      },

      // interface implementation
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var value = cellEditor.getValue();

        // validation function will be called with new and old value
        var validationFunc = this.getValidationFunction();
        if (validationFunc) {
          value = validationFunc(value, cellEditor.originalValue);
        }

        if (typeof cellEditor.originalValue == "number") {
          value = parseFloat(value);
        }

        return value;
      }
    }
  });
  qx.ui.table.celleditor.AbstractField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractField.js.map?dt=1555325124317