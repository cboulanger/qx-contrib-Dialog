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
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.ui.ClassViewer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.dao.Property", {
    extend: qxl.apiviewer.dao.ClassItem,

    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
    },

    members: {
      getTypes: function getTypes() {
        var result = [];
        if (this._meta.check) result.push({ type: this._meta.check });
        return result;
      },

      /**
       * Returns the check attribute of the property definition if
       * the check attribute does not define an internal type or a
       * class. In this case use {@link #getTypes}.
       *
       * @return {String} the contents of the check attribute.
       */
      getCheck: function getCheck() {
        var check = this._meta.check;
        if (check && !qxl.apiviewer.dao.Class.getClassByName(check) && !qxl.apiviewer.ui.ClassViewer.PRIMITIVES[check]) {
          return check;
        }

        return null;
      },

      /**
       * @Override
       */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        var _this = this;

        return iface.getProperties().some(function (method) {
          return method.getName() == _this.getName();
        });
      },

      getClassname: function getClassname() {
        return this._class.getName();
      },

      getPossibleValues: function getPossibleValues() {
        return this._meta.possibleValues || [];
      },

      getGroup: function getGroup() {
        return this._meta.group || [];
      },

      isPropertyGroup: function isPropertyGroup() {
        return !!this._meta.group;
      },

      getType: function getType() {
        return this.getCheck();
      },

      getEvent: function getEvent() {
        return this._meta.event;
      },

      getApplyMethod: function getApplyMethod() {
        return this._meta.apply;
      },

      isNullable: function isNullable() {
        return !!this._meta.nullable;
      },

      getDefaultValue: function getDefaultValue() {
        return this._meta.defaultValue;
      },

      isInheritable: function isInheritable() {
        return this._meta.inheritable || false;
      },

      isThemeable: function isThemeable() {
        return this._meta.themeable || false;
      },

      isRefined: function isRefined() {
        return this._meta.refine || false;
      }
    }
  });
  qxl.apiviewer.dao.Property.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Property.js.map?dt=1555325130867