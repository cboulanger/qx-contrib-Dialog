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
      },
      "qxl.apiviewer.dao.Class": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.dao.Event", {
    extend: qxl.apiviewer.dao.ClassItem,

    construct: function construct(meta, clazz) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, meta.name);
      this._type = meta.type;
    },

    members: {

      getType: function getType() {
        return qxl.apiviewer.dao.Class.getClassByName(this._type);
      },

      getTypes: function getTypes() {
        if (this._type) {
          return [{
            type: this._type
          }];
        } else {
          return [];
        }
      },

      /**
       * @Override
       */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        var _this = this;

        return iface.getEvents().some(function (method) {
          return method.getName() == _this.getName();
        });
      }

    }

  });
  qxl.apiviewer.dao.Event.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Event.js.map?dt=1555325130875