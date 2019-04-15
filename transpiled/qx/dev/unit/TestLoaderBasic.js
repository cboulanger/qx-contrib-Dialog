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
      "qx.dev.unit.MTestLoader": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestLoaderBasic", {

    extend: qx.core.Object,

    include: [qx.dev.unit.MTestLoader],

    /**
     *
     * @param nameSpace {String} Test namespace, e.g. myapplication.test.*
     */
    construct: function construct(nameSpace) {
      if (nameSpace) {
        this.setTestNamespace(nameSpace);
      }
    }
  });
  qx.dev.unit.TestLoaderBasic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderBasic.js.map?dt=1555325110400