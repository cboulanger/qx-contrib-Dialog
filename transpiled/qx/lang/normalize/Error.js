(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.EcmaScript": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "ecmascript.error.toString": {
          "defer": true,
          "className": "qx.bom.client.EcmaScript"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.lang.normalize.Error", {

    statics: {

      /**
       * Returns a string representation of the Error object.
       *
       * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/toString">MDN documentation</a> |
       * <a href="http://es5.github.com/#x15.11.4.4">Annotated ES5 Spec</a>
       *
       * @return {String} Error message
       */
      toString: function toString() {
        var name = this.name || "Error";
        var message = this.message || "";

        if (name === "" && message === "") {
          return "Error";
        }
        if (name === "") {
          return message;
        }
        if (message === "") {
          return name;
        }
        return name + ": " + message;
      }
    },

    defer: function defer(statics) {
      // toString
      if (!qx.core.Environment.get("ecmascript.error.toString")) {
        Error.prototype.toString = statics.toString;
      }
    }
  });
  qx.lang.normalize.Error.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Error.js.map?dt=1555325114129