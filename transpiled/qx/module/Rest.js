(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.rest.Resource": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.module.Rest", {
    statics: {
      /**
       * @param description {Map?} Each key of the map is interpreted as
       *  <code>action</code> name. The value associated to the key must be a map
       *  with the properties <code>method</code> and <code>url</code>.
       *  <code>check</code> is optional. Also see {@link qx.bom.rest.Resource#map}.
       *
       * @attachStatic {qxWeb, rest.resource}
       * @return {qx.bom.rest.Resource} The resource object.
       */
      resource: function resource(description) {
        return new qx.bom.rest.Resource(description);
      }
    },

    defer: function defer(statics) {
      qxWeb.$attachAll(this, "rest");
    }
  });
  qx.module.Rest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rest.js.map?dt=1555325114846