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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.dao.ChildControl", {
    extend: qxl.apiviewer.dao.ClassItem,

    construct: function construct(meta, parentClass) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, parentClass, meta.controlName);
    },
    members: {
      getDefaultValue: function getDefaultValue() {
        return "";
      }
    }

  });
  qxl.apiviewer.dao.ChildControl.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ChildControl.js.map?dt=1555325130883