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
      "qx.io.remote.Request": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.RequestUtil", {
    extend: qx.core.Object,

    statics: {
      get: function get(url, opts) {
        return new qx.Promise(function (resolve, reject) {
          var req = new qx.io.remote.Request(url);

          req.setAsynchronous(true);
          req.setTimeout(180000);
          req.setProhibitCaching(false);
          if (opts) req.set(opts);

          req.addListener("completed", function (evt) {
            resolve(evt.getContent());
          });

          req.addListener("failed", function () {
            return reject();
          });
          req.addListener("aborted", function () {
            return reject();
          });

          req.send();
        });
      }
    }
  });
  qxl.apiviewer.RequestUtil.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RequestUtil.js.map?dt=1555325130487