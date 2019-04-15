(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.store.Jsonp": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.data.store.Yql", {
    extend: qx.data.store.Jsonp,

    /**
     * @param query {String} The query for YQL.
     * @param delegate {Object?null} The delegate containing one of the methods
     *   specified in {@link qx.data.store.IStoreDelegate}.
     * @param https {Boolean?null} If https should be used.
     */
    construct: function construct(query, delegate, https) {
      var prefix = https ? "https" : "http";
      var url = prefix + "://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json&diagnostics=false&" + "env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
      qx.data.store.Jsonp.constructor.call(this, url, delegate, "callback");
    }
  });
  qx.data.store.Yql.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Yql.js.map?dt=1555325109214