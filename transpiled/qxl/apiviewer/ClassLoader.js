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
      "qx.Promise": {},
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.ClassLoader", {
    extend: qx.core.Object,

    statics: {
      __baseUri: null,

      setBaseUri: function setBaseUri(baseUri) {
        this.__baseUri = baseUri;
      },

      getBaseUri: function getBaseUri() {
        return this.__baseUri;
      },

      loadClassList: function loadClassList(classes, callback, self) {
        var _this = this;

        if (!classes.length) {
          callback && callback.call(self || this, []);
          return new qx.Promise.resolve([]);
        }

        var all = classes.map(function (clazz) {
          return clazz.load();
        });
        return qx.Promise.all(all).then(function () {
          return callback && callback.call(self || _this, classes);
        }).then(function () {
          return classes;
        });
      },

      getClassOrPackage: function getClassOrPackage(name) {
        if (name) {
          var cls = qxl.apiviewer.dao.Class.getClassByName(name);
          if (cls) {
            return qxl.apiviewer.dao.Class.isNativeObject(cls) ? null : cls;
          }
        }
        var pkg = qxl.apiviewer.dao.Package.getPackage(name);
        return pkg;
      }
    }

  });
  qxl.apiviewer.ClassLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassLoader.js.map?dt=1555325130449