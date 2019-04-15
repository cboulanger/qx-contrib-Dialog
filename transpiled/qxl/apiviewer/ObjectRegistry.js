(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ObjectRegistry", {
    statics: {
      __objectDb: {},

      register: function register(object) {
        var hash = qx.core.ObjectRegistry.toHashCode(object);
        this.__objectDb[hash] = object;
      },

      getObjectFromHashCode: function getObjectFromHashCode(hashCode) {
        return this.__objectDb[hashCode];
      }
    }

  });
  qxl.apiviewer.ObjectRegistry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ObjectRegistry.js.map?dt=1555325131363