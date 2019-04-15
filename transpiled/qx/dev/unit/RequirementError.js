(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.RequirementError", {

    extend: Error,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param requirement {String?} The requirement ID, e.g. "SSL"
     * @param message {String?} Optional error message
     */
    construct: function construct(requirement, message) {

      this.__message = message || "Requirement not met";
      this.__requirement = requirement;

      var inst = Error.call(this, this.__message);
      // map stack trace properties since they're not added by Error's constructor
      if (inst.stack) {
        this.stack = inst.stack;
      }
      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __message: null,
      __requirement: null,

      /**
       * Returns the ID of the requirement that was not satisfied.
       *
       * @return {String} The requirement ID
       */
      getRequirement: function getRequirement() {
        return this.__requirement;
      },

      /**
       * Returns a string representation of the error.
       *
       * @return {String} Error message
       */
      toString: function toString() {
        var msg = this.__message;
        if (this.__requirement) {
          msg += ": " + this.__requirement;
        }
        return msg;
      }
    }
  });
  qx.dev.unit.RequirementError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RequirementError.js.map?dt=1555325109556