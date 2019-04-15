(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.dev.unit.AbstractTestSuite": {
        "construct": true,
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true
      },
      "qx.lang.Type": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestClass", {
    extend: qx.dev.unit.AbstractTestSuite,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param clazz {Class} Test class. Must be a sub class of {@link TestCase}.
     */
    construct: function construct(clazz) {
      qx.dev.unit.AbstractTestSuite.constructor.call(this);

      if (!clazz) {
        this.addFail("existsCheck", "Unknown test class!");
        return;
      }

      if (!qx.Class.isSubClassOf(clazz, qx.dev.unit.TestCase)) {
        this.addFail("Sub class check.", "The test class '" + clazz.classname + "'is not a sub class of 'qx.dev.unit.TestCase'");
        return;
      }

      var proto = clazz.prototype;
      var testCase = new clazz();

      for (var test in proto) {
        if (qx.lang.Type.isFunction(proto[test]) && test.indexOf("test") == 0) {
          this.addTestMethod(testCase, test);
        }
      }

      this.setName(clazz.classname);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Name of the test suite */
      name: {
        check: "String"
      }
    }
  });
  qx.dev.unit.TestClass.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestClass.js.map?dt=1555325110369