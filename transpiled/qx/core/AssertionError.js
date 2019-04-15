(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.type.BaseError": {
        "construct": true,
        "require": true
      },
      "qx.dev.StackTrace": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.core.AssertionError", {
    extend: qx.type.BaseError,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param comment {String} Comment passed to the assertion call
     * @param failMessage {String} Fail message provided by the assertion
     */
    construct: function construct(comment, failMessage) {
      qx.type.BaseError.call(this, comment, failMessage);
      this.__trace = qx.dev.StackTrace.getStackTrace();
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __trace: null,

      /**
       * Stack trace of the error
       *
       * @return {String[]} The stack trace of the location the exception was thrown
       */
      getStackTrace: function getStackTrace() {
        return this.__trace;
      }
    }
  });
  qx.core.AssertionError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AssertionError.js.map?dt=1555325107783