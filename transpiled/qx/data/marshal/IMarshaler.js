(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.data.marshal.IMarshaler", {
    members: {
      /**
       * Creates for the given data the needed classes. The classes contain for
       * every key in the data a property. The classname is always the prefix
       * <code>qx.data.model</code>. Two objects containing the same keys will not
       * create two different classes.
       *
       * @param data {Object} The object for which classes should be created.
       * @param includeBubbleEvents {Boolean} Whether the model should support
       *   the bubbling of change events or not.
       */
      toClass: function toClass(data, includeBubbleEvents) {},

      /**
       * Creates for the given data the needed models. Be sure to have the classes
       * created with {@link #toClass} before calling this method.
       *
       * @param data {Object} The object for which models should be created.
       *
       * @return {qx.core.Object} The created model object.
       */
      toModel: function toModel(data) {}
    }
  });
  qx.data.marshal.IMarshaler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IMarshaler.js.map?dt=1555325109028