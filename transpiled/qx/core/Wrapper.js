(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.core.Wrapper", {
    extend: Array,
    construct: function construct() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        this.push(arguments[i]);
      }

      var firstItem = arguments[0];
      for (var name in firstItem) {

        if (this[name] !== undefined) {
          continue;
        }

        if (firstItem[name] instanceof Function) {
          this[name] = function (name) {
            var firstReturnValue;

            var args = Array.prototype.slice.call(arguments, 0);
            args.shift();

            this.forEach(function (item) {
              var returnValue = item[name].apply(item, args);
              if (firstReturnValue === undefined) {
                firstReturnValue = returnValue;
              }
            });

            // return the collection if the return value was the collection
            if (firstReturnValue === this[0]) {
              return this;
            }
            return firstReturnValue;
          }.bind(this, name);
        } else {
          Object.defineProperty(this, name, {
            enumerable: true,
            get: function (name) {
              return this[name];
            }.bind(firstItem, name),
            set: function (name, value) {
              this.forEach(function (item) {
                item[name] = value;
              });
            }.bind(this, name)
          });
        }
      }
    }
  });
  qx.core.Wrapper.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Wrapper.js.map?dt=1555325108274