(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestResult": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.dev.unit.JsUnitTestResult", {
    extend: qx.dev.unit.TestResult,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.dev.unit.TestResult.constructor.call(this);
      this.__testFunctionNames = [];
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      __testFunctionNames: null,

      /**
       * Run the test
       * @param test {qx.dev.unit.TestFunction} The test.
       * @param testFunction {Function} A reference to a test function.
       */
      run: function run(test, testFunction) {
        var testFunctionName = "$test_" + test.getFullName().replace(/\W/g, "_");
        this.__testFunctionNames.push(testFunctionName);
        window[testFunctionName] = testFunction;
      },

      /**
       * Export the test functions to JSUnit
       */
      exportToJsUnit: function exportToJsUnit() {
        var self = this;

        // global
        window.exposeTestFunctionNames = function () {
          return self.__testFunctionNames;
        };

        // global
        window.isTestPageLoaded = true;
      }
    }
  });
  qx.dev.unit.JsUnitTestResult.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=JsUnitTestResult.js.map?dt=1555325109447