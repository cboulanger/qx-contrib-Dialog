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
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.TestFunction", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * There are two ways to define a test function. First by passing a class
     * and a method name to the constructor or second by giving a the method
     * directly.
     *
     * @param testCase {qx.dev.unit.TestCase?null} The test class, which contains the test method
     * @param methodName {String?null} The name of the method
     * @param testFunction {Function?null} A reference to a test function. If this
     *    parameter is set the other parameters are ignored.
     */
    construct: function construct(testCase, methodName, testFunction) {
      if (testFunction) {
        this.setTestFunction(testFunction);
      }

      if (testCase) {
        this.setClassName(testCase.classname);
        this.setTestClass(testCase);
      }

      this.setName(methodName);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The test function */
      testFunction: { check: "Function" },

      /** Name of the test */
      name: { check: "String" },

      /** Name of the class containing the test */
      className: {
        check: "String",
        init: ""
      },

      /** The test class */
      testClass: {
        check: "qx.dev.unit.TestCase",
        init: null
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      /**
       * Runs the test and logs the test result to a {@link TestResult} instance,
       *
       * @param testResult {qx.dev.unit.TestResult} The class used to log the test result.
       */
      run: function run(testResult) {
        var inst = this.getTestClass();
        var method = this.getName();

        inst.setTestFunc(this);
        inst.setTestResult(testResult);

        testResult.run(this, function () {
          try {
            inst[method]();
          } catch (ex) {
            throw ex;
          }
        });
      },

      /**
       * Call the test class' <code>setUp</code> method.
       */
      setUp: function setUp() {
        var inst = this.getTestClass();
        if (qx.lang.Type.isFunction(inst.setUp)) {
          inst.setUp();
        }
      },

      /**
       * Call the test class' <code>tearDown</code> method.
       */
      tearDown: function tearDown() {
        var inst = this.getTestClass();
        if (qx.lang.Type.isFunction(inst.tearDown)) {
          inst.tearDown();
        }
      },

      /**
       * Get the full name of the test.
       *
       * @return {String} The test's full name
       */
      getFullName: function getFullName() {
        return [this.getClassName(), this.getName()].join(":");
      }
    }
  });
  qx.dev.unit.TestFunction.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestFunction.js.map?dt=1555325110388