(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.dao.Constant", {
    extend: qxl.apiviewer.dao.ClassItem,

    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      this._value = meta.value;
    },

    members: {
      _value: undefined,

      getValue: function getValue() {
        return this._value;
      }

    }

  });
  qxl.apiviewer.dao.Constant.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Constant.js.map?dt=1555325130852