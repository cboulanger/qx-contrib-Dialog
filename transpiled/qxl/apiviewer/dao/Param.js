var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Array": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.dao.Param", {
    extend: qx.core.Object,

    construct: function construct(meta, method) {
      qx.core.Object.constructor.call(this);
      this._meta = meta;
      this._method = method;
      this._types = [{ type: "var" }];
      if (meta.type) {
        this._types = qx.lang.Array.toNativeArray(meta.type).map(function (type) {
          if ((typeof type === "undefined" ? "undefined" : _typeof(type)) === "object") {
            return { type: type.type, arrayDimensions: type.dimensions };
          }
          var m = type.match(/^([^[]+)((\[\])+)?$/);
          if (m && m[2]) {
            return { type: m[1], arrayDimensions: m[2].length / 2 };
          }
          return { type: type };
        });
      }
    },

    members: {
      _method: null,
      _meta: null,
      _types: null,
      _arrayDimensions: 0,

      getMethod: function getMethod() {
        return this._method;
      },

      getClass: function getClass() {
        return this._method.getClass();
      },

      getName: function getName() {
        return this._meta.paramName;
      },

      getDescription: function getDescription() {
        return this._meta.desc;
      },

      getTypes: function getTypes() {
        return this._types;
      },

      getArrayDimensions: function getArrayDimensions() {
        return this._arrayDimensions;
      },

      getDefaultValue: function getDefaultValue() {
        return this._meta.defaultValue;
      },

      isOptional: function isOptional() {
        return !!this._meta.optional;
      }

    }

  });
  qxl.apiviewer.dao.Param.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Param.js.map?dt=1555325131048