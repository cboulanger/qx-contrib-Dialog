(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.toolbar.CheckBox": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.form.IRadioItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.toolbar.RadioButton", {
    extend: qx.ui.toolbar.CheckBox,
    include: [qx.ui.form.MModelProperty],
    implement: [qx.ui.form.IModel, qx.ui.form.IRadioItem],

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */

      // overridden
      _applyValue: function _applyValue(value, old) {
        qx.ui.toolbar.RadioButton.prototype._applyValue.base.call(this, value, old);

        if (value) {
          var grp = this.getGroup();
          if (grp) {
            grp.setSelection([this]);
          }
        }
      },

      // overridden
      _onExecute: function _onExecute(e) {
        var grp = this.getGroup();
        if (grp && grp.getAllowEmptySelection()) {
          this.toggleValue();
        } else {
          this.setValue(true);
        }
      }
    }
  });
  qx.ui.toolbar.RadioButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioButton.js.map?dt=1555325125768