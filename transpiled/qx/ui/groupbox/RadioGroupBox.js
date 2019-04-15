(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.groupbox.GroupBox": {
        "require": true
      },
      "qx.ui.form.IRadioItem": {
        "require": true
      },
      "qx.ui.form.IExecutable": {
        "require": true
      },
      "qx.ui.form.IBooleanForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.form.RadioButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.groupbox.RadioGroupBox", {
    extend: qx.ui.groupbox.GroupBox,
    implement: [qx.ui.form.IRadioItem, qx.ui.form.IExecutable, qx.ui.form.IBooleanForm, qx.ui.form.IModel],
    include: [qx.ui.form.MModelProperty],

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "radio-groupbox"
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the included radiobutton changed its value */
      "changeValue": "qx.event.type.Data",

      /** Fired if the {@link #execute} method is invoked.*/
      "execute": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */

      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "legend":
            control = new qx.ui.form.RadioButton();
            control.setAllowGrowX(true);
            control.setValue(true);
            control.addListener("changeValue", this._onRadioChangeValue, this);
            control.addListener("resize", this._repositionFrame, this);
            control.addListener("execute", this._onExecute, this);

            this._add(control, { left: 0, right: 0 });
        }

        return control || qx.ui.groupbox.RadioGroupBox.prototype._createChildControlImpl.base.call(this, id);
      },

      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.groupbox.RadioGroupBox.prototype._applyEnabled.base.call(this, value, old);

        this.getChildrenContainer().setEnabled(value && this.getValue());
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for execute event of checkbox.
       *
       * @param e {qx.event.type.Event} Event which holds the current status
       */
      _onExecute: function _onExecute(e) {
        this.fireEvent("execute");
      },

      /**
       * Event listener for changeValue event of radio button
       *
       * @param e {qx.event.type.Data} Data event which holds the current status
       */
      _onRadioChangeValue: function _onRadioChangeValue(e) {
        var checked = e.getData() ? true : false;

        // Disable content
        this.getChildrenContainer().setEnabled(checked);

        // Fire event to the outside
        this.fireDataEvent("changeValue", checked, e.getOldData());
      },

      /*
      ---------------------------------------------------------------------------
        REDIRECTIONS TO LEGEND (FOR RADIO GROUP SUPPORT)
      ---------------------------------------------------------------------------
      */

      // interface implementation
      execute: function execute() {
        this.getChildControl("legend").execute();
      },

      // interface implementation
      setCommand: function setCommand(command) {
        this.getChildControl("legend").setCommand(command);
      },

      // interface implementation
      getCommand: function getCommand() {
        return this.getChildControl("legend").getCommand();
      },

      /**
       * Returns the radio group
       *
       * @return {qx.ui.form.RadioGroup} The radio manager
       */
      getGroup: function getGroup() {
        return this.getChildControl("legend").getGroup();
      },

      /**
       * Sets the radio group to use
       *
       * @param value {qx.ui.form.RadioGroup} The radio group to use
       */
      setGroup: function setGroup(value) {
        if (value != null) {
          value.add(this);
        }
        return;
      },

      /**
       * The value of the groupbox
       *
       * @return {Boolean} <code>true</code> when enabled.
       */
      getValue: function getValue() {
        return this.getChildControl("legend").getValue();
      },

      /**
       * Configures the value of the groupbox.
       *
       * @param value {Boolean} <code>true</code> when enabled.
       */
      setValue: function setValue(value) {
        this.getChildControl("legend").setValue(value);
      },

      /**
       * Resets the value.
       */
      resetValue: function resetValue() {
        this.getChildControl("legend").resetValue();
      },

      /**
       * Returns the configured legend. Only used for RadioManager compatibility.
       *
       * @return {String} The configured legend.
       */
      getLabel: function getLabel() {
        return this.getChildControl("legend").getLabel();
      }
    }
  });
  qx.ui.groupbox.RadioGroupBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioGroupBox.js.map?dt=1555325120322