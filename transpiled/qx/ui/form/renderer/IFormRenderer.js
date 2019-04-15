(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.form.renderer.IFormRenderer", {
    members: {
      /**
       * Add a group of form items with the corresponding names. The names should
       * be displayed as hint for the user what to do with the form item.
       * The title is optional and can be used as grouping for the given form
       * items.
       *
       * @param items {qx.ui.core.Widget[]} An array of form items to render.
       * @param names {String[]} An array of names for the form items.
       * @param title {String?} A title of the group you are adding.
       * @param itemsOptions {Array?null} The added additional data.
       * @param headerOptions {Map?null} The options map as defined by the form
       *   for the current group header.
       */
      addItems: function addItems(items, names, title, itemsOptions, headerOptions) {},

      /**
       * Adds a button the form renderer.
       *
       * @param button {qx.ui.form.Button} A button which should be added to
       *   the form.
       * @param options {Map?null} The added additional data.
       */
      addButton: function addButton(button, options) {}

    }
  });
  qx.ui.form.renderer.IFormRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFormRenderer.js.map?dt=1555325120119