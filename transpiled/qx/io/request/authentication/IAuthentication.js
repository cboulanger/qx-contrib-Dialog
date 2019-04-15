(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.io.request.authentication.IAuthentication", {

    members: {
      /**
       * Headers to include in request for authentication purposes.
       *
       * @return {Map[]} Array of maps. Each map represent a header and
       *          must have the properties <code>key</code> and <code>value</code>
       *         with a value of type string.
       */
      getAuthHeaders: function getAuthHeaders() {}
    }
  });
  qx.io.request.authentication.IAuthentication.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IAuthentication.js.map?dt=1555325113499