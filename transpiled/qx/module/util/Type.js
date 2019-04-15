(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.util.Type", {
    statics: {
      /**
       * Get the internal class of the value. The following classes are possible:
       * <pre>
       * <code>"String"</code>,
       * <code>"Array"</code>,
       * <code>"Object"</code>,
       * <code>"RegExp"</code>,
       * <code>"Number"</code>,
       * <code>"Boolean"</code>,
       * <code>"Date"</code>,
       * <code>"Function"</code>,
       * <code>"Error"</code>
       * </pre>
       * @attachStatic {qxWeb, type.get}
       * @signature function(value)
       * @param value {var} Value to get the class for.
       * @return {String} The internal class of the value.
       */
      get: qx.Bootstrap.getClass
    },

    defer: function defer(statics) {
      qxWeb.$attachAll(this, "type");
    }
  });
  qx.module.util.Type.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Type.js.map?dt=1555325115194