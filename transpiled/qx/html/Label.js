(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "require": true
      },
      "qx.bom.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.html.Label", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      __rich: null,

      /*
      ---------------------------------------------------------------------------
        ELEMENT API
      ---------------------------------------------------------------------------
      */

      // overridden
      _applyProperty: function _applyProperty(name, value) {
        qx.html.Label.prototype._applyProperty.base.call(this, name, value);

        if (name == "value") {
          var element = this.getDomElement();
          qx.bom.Label.setValue(element, value);
        }
      },

      // overridden
      _createDomElement: function _createDomElement() {
        var rich = this.__rich;
        var el = qx.bom.Label.create(this._content, rich);
        el.style.overflow = 'hidden';
        return el;
      },

      // overridden
      // be sure that style attributes are merged and not overwritten
      _copyData: function _copyData(fromMarkup) {
        return qx.html.Label.prototype._copyData.base.call(this, true);
      },

      /*
      ---------------------------------------------------------------------------
        LABEL API
      ---------------------------------------------------------------------------
      */

      /**
       * Toggles between rich HTML mode and pure text mode.
       *
       * @param value {Boolean} Whether the HTML mode should be used.
       * @return {qx.html.Label} This instance for chaining support.
       */
      setRich: function setRich(value) {
        var element = this.getDomElement();

        if (element) {
          throw new Error("The label mode cannot be modified after initial creation");
        }

        value = !!value;

        if (this.__rich == value) {
          return this;
        }

        this.__rich = value;
        return this;
      },

      /**
       * Sets the HTML/text content depending on the content mode.
       *
       * @param value {String} The content to be used.
       * @return {qx.html.Label} This instance for for chaining support.
       */
      setValue: function setValue(value) {
        this._setProperty("value", value);
        return this;
      },

      /**
       * Get the current content.
       *
       * @return {String} The labels's content
       */
      getValue: function getValue() {
        return this._getProperty("value");
      },

      /**
       * Reset the current content
       *
       * @return {qx.html.Label} This instance for for chaining support.
       */
      resetValue: function resetValue() {
        return this._removeProperty("value");
      }
    }
  });
  qx.html.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1555325112819