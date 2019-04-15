(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.core.GlobalError", {
    extend: Error,

    /**
     * @param exc {Error} source exception
     * @param args {Array} arguments
     */
    construct: function construct(exc, args) {
      // Do not use the Environment class to keep the minimal
      // package size small [BUG #5068]
      if (qx.Bootstrap.DEBUG) {
        qx.core.Assert.assertNotUndefined(exc);
      }

      this.__failMessage = "GlobalError: " + (exc && exc.message ? exc.message : exc);

      var inst = Error.call(this, this.__failMessage);
      // map stack trace properties since they're not added by Error's constructor
      if (inst.stack) {
        this.stack = inst.stack;
      }
      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }

      this.__arguments = args;
      this.__exc = exc;
    },

    members: {
      __exc: null,
      __arguments: null,
      __failMessage: null,

      /**
       * Returns the error message.
       *
       * @return {String} error message
       */
      toString: function toString() {
        return this.__failMessage;
      },

      /**
       * Returns the arguments which are
       *
       * @return {Object} arguments
       */
      getArguments: function getArguments() {
        return this.__arguments;
      },

      /**
       * Get the source exception
       *
       * @return {Error} source exception
       */
      getSourceException: function getSourceException() {
        return this.__exc;
      }

    }
  });
  qx.core.GlobalError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalError.js.map?dt=1555325107844