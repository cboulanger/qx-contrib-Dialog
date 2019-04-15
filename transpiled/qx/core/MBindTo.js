(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Function": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qx.core.MBindTo", {
    members: {
      /**
       * Bind a function to this object
       *
       * @param func {Function}
       *   The function to be bound
       *
       * @param varargs {var?}
       *   Optional arguments to be passed to the function.
       *
       * @return {Function}
       *   A wrapped version of the function that binds 'this' to the
       *   user-provided function.
       */
      bindTo: function bindTo(func, varargs) {
        return qx.lang.Function.create(func, {
          self: this,
          args: arguments.length > 1 ? qx.lang.Array.fromArguments(arguments, 1) : null
        });
      }
    }
  });
  qx.core.MBindTo.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MBindTo.js.map?dt=1555325107924