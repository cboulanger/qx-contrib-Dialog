(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.marshal.IMarshalerDelegate": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.data.store.IStoreDelegate", {
    extend: qx.data.marshal.IMarshalerDelegate,

    members: {
      /**
       * This method manipulates the data from the request and returns the
       * manipulated data.
       *
       * @param data {Object} The data received by the request.
       * @return {Object} The manipulated data.
       */
      manipulateData: function manipulateData(data) {},

      /**
       * This method can change the settings on the used request by the store.
       *
       * @param request {var} The created request, depending on the implementation
       *   of the data store.
       */
      configureRequest: function configureRequest(request) {}
    }
  });
  qx.data.store.IStoreDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IStoreDelegate.js.map?dt=1555325109121