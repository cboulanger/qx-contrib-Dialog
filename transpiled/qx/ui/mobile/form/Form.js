(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Form": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.form.Form", {
    extend: qx.ui.form.Form,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.ui.form.Form.constructor.call(this);
      this.__invalidItems = [];
    },

    members: {
      /**
       * the renderer this form uses to be displayed
       */
      __renderer: null,

      /**
       * Contains all invalid items.
       */
      __invalidItems: null,

      /**
       * Setter for the renderer private variable
       * @param renderer {qx.ui.mobile.form.renderer.AbstractRenderer} the renderer
       */
      setRenderer: function setRenderer(renderer) {
        this.__renderer = renderer;
      },

      /**
       * Validates the form using the
       * {@link qx.ui.form.validation.Manager#validate} method.
       * @lint ignoreDeprecated(alert)
       *
       * @return {Boolean | null} The validation result.
       */
      validate: function validate() {
        var validateResult = qx.ui.mobile.form.Form.prototype.validate.base.call(this);

        this.__invalidItems = [];

        if (this.__renderer != null) {
          this.__renderer.resetForm();
        }
        var groups = this.getGroups();
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          for (var j = 0; j < group.items.length; j++) {
            var item = group.items[j];
            if (!item.isValid()) {
              this.__invalidItems.push(item);

              if (this.__renderer != null) {
                this.__renderer.showErrorForItem(item);
              } else {
                alert('error ' + item.getInvalidMessage());
              }
            }
          }
        }

        if (this.__renderer != null) {
          this.__renderer._domUpdated();
        }

        return validateResult;
      },

      /**
       * Makes a row visible, identified by its group and row index.
       * @param groupIndex {Integer} the index of the group to which the row belongs to
       * @param rowIndex {Integer} the index of the row inside the target group
       */
      showRow: function showRow(groupIndex, rowIndex) {
        var item = this._getItemByIndex(groupIndex, rowIndex);
        if (item) {
          this.__renderer.showItem(item);
        }
      },

      /**
       * Makes a row invisible, identified by its group and row index.
       * @param groupIndex {Integer} the index of the group to which the row belongs to
       * @param rowIndex {Integer} the index of the row inside the target group
       */
      hideRow: function hideRow(groupIndex, rowIndex) {
        var item = this._getItemByIndex(groupIndex, rowIndex);
        if (item) {
          this.__renderer.hideItem(item);
        }
      },

      /**
       * Gets the item with the given group and rowIndex.
       * @param groupIndex {Integer} the index of the group to which the row belongs to
       * @param rowIndex {Integer} the index of the row inside the target group
       * @return {qx.ui.form.IForm | null} The validation result.
       */
      _getItemByIndex: function _getItemByIndex(groupIndex, rowIndex) {
        var groups = this.getGroups();
        var group = groups[groupIndex];
        if (group) {
          var item = group.items[rowIndex];
          return item;
        }

        return null;
      },

      // overridden
      reset: function reset() {
        qx.ui.mobile.form.Form.prototype.reset.base.call(this);
        this.__renderer.resetForm();
      },

      /**
      * Returns the invalid items of the form, which were determined by {@link qx.ui.mobile.form.Form#validate} before.
      * It returns an empty array if no items are invalid.
      * @return {qx.ui.mobile.core.Widget[]} The invalid items of the form.
      */
      getInvalidItems: function getInvalidItems() {
        return this.__invalidItems;
      }
    }

  });
  qx.ui.mobile.form.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1555325122439