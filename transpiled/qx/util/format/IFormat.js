(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.util.format.IFormat", {

    members: {
      /**
       * Formats an object.
       *
       * @abstract
       * @param obj {var} The object to format.
       * @return {String} the formatted object.
       * @throws {Error} the abstract function warning.
       */
      format: function format(obj) {},

      /**
       * Parses an object.
       *
       * @abstract
       * @param str {String} the string to parse.
       * @return {var} the parsed object.
       * @throws {Error} the abstract function warning.
       */
      parse: function parse(str) {}
    }
  });
  qx.util.format.IFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFormat.js.map?dt=1555325129228