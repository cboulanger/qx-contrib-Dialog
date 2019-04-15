(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qxl.apiviewer.MWidgetRegistry", {

    properties: {
      id: {
        check: "String",
        apply: "_applyId",
        nullable: true,
        init: null
      }
    },

    members: {
      _applyId: function _applyId(id, oldId) {
        var statics = qxl.apiviewer.MWidgetRegistry;
        if (oldId) {
          statics.unregister(this, oldId);
        }
        if (id) {
          statics.register(this, id);
        }
      },

      getWidgetById: function getWidgetById(id) {
        return qxl.apiviewer.MWidgetRegistry.getWidgetById(id);
      }

    },

    statics: {
      __objectDb: {},

      /**
       * Returns the widget registered under the given id by {@link #register}
       *
       * @param id {String} the id of the widget
       * @return {qx.ui.core.Widget} the widget.
       */
      getWidgetById: function getWidgetById(id) {
        return this.__objectDb[id];
      },

      /**
       * Registers a widget under the given widget id to be used with
       * {@link #getWidgetById}.
       *
       * @param widget {qx.ui.core.Widget} the widget to register
       * @param id {String} the id of the widget.
       */
      register: function register(object, id) {
        if (this.__objectDb[id]) {
          throw new Error("An object with the id '" + id + "' already exists.");
        }
        this.__objectDb[id] = object;
      },

      unregister: function unregister(object, id) {
        if (this.__objectDb[id] !== object) {
          throw new Error("The object is not registered with the id '" + id + "'.");
        }
        delete this.__objectDb[id];
      }

    }

  });
  qxl.apiviewer.MWidgetRegistry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MWidgetRegistry.js.map?dt=1555325129786