(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.type.BaseError", {
    extend: Error,

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
      var inst = Error.call(this, failMessage);
      // map stack trace properties since they're not added by Error's constructor
      if (inst.stack) {
        this.stack = inst.stack;
      }
      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }

      this.__comment = comment || "";
      // opera 10 crashes if the message is an empty string!!!?!?!
      this.message = failMessage || qx.type.BaseError.DEFAULTMESSAGE;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      DEFAULTMESSAGE: "error"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __sTrace: null,
      __comment: null,

      /** @type {String} Fail message provided by the assertion */
      message: null,

      /**
       * Comment passed to the assertion call
       *
       * @return {String} The comment passed to the assertion call
       */
      getComment: function getComment() {
        return this.__comment;
      },

      /**
       * Get the error message
       *
       * @return {String} The error message
       */
      toString: function toString() {
        return this.__comment + (this.message ? ": " + this.message : "");
      }
    }
  });
  qx.type.BaseError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseError.js.map?dt=1555325116414