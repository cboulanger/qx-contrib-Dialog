(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.io.request.authentication.IAuthentication": {
        "require": true
      },
      "qx.util.Base64": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.io.request.authentication.Basic", {

    extend: qx.core.Object,

    implement: qx.io.request.authentication.IAuthentication,

    /**
     * @param username {var} The username to use.
     * @param password {var} The password to use.
     */
    construct: function construct(username, password) {
      this.__credentials = qx.util.Base64.encode(username + ':' + password);
    },

    members: {
      __credentials: null,

      /**
       * Headers to include for basic authentication.
       * @return {Map} Map containing the authentication credentials
       */
      getAuthHeaders: function getAuthHeaders() {
        return [{ key: "Authorization", value: "Basic " + this.__credentials }];
      }
    }
  });
  qx.io.request.authentication.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1555325113492