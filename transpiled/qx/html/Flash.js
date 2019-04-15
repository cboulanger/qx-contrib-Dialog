(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      },
      "qx.dom.Element": {},
      "qx.bom.Flash": {},
      "qx.core.Assert": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.html.Flash", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param styles {Map?null} optional map of CSS styles, where the key is the name
     *    of the style and the value is the value to use.
     * @param attributes {Map?null} optional map of element attributes, where the
     *    key is the name of the attribute and the value is the value to use.
     */
    construct: function construct(styles, attributes) {
      qx.html.Element.constructor.call(this, "div", styles, attributes);

      this.__params = {};
      this.__variables = {};
      this.__attributes = {};
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      /** @type {Map} The attributes for the Flash movie. */
      __params: null,

      /** @type {Map} the attributes for the object tag */
      __attributes: null,

      /** @type {Map} The <code>FlashVars</code> to pass variables to the Flash movie. */
      __variables: null,

      /** @type {qx.bom.Flash} The DOM Flash element. */
      __flash: null,

      // overridden
      _createDomElement: function _createDomElement() {
        return qx.dom.Element.create("div");
      },

      /**
       * Creates the DOM Flash movie with all needed attributes and
       * <code>FlashVars</code>.
       */
      createFlash: function createFlash() {
        this.__flash = qx.bom.Flash.create(this.getDomElement(), this.getAttributes(), this.__variables, this.__params);
      },

      /**
       * Set the URL from the Flash movie to display.
       *
       * @param value {String} URL from the Flash movie.
       */
      setSource: function setSource(value) {
        {
          qx.core.Assert.assertString(value, "Invalid attribute 'value'.");
        }

        if (this.__flash) {
          throw new Error("The source cannot be modified after initial creation");
        }

        this.setAttribute("movie", value);
      },

      /**
       * Set the URL from the Flash movie to display.
       *
       * @param value {String} URL from the Flash movie.
       */
      setId: function setId(value) {
        {
          qx.core.Assert.assertString(value, "Invalid attribute 'value'.");
        }

        if (this.__flash) {
          throw new Error("The id cannot be modified after initial creation");
        }

        this.setAttribute("id", value);
      },

      /**
       * Returns the <code>FlashVars</code> for the Flash movie.
       *
       * @return {Map} Map with key/value pairs for passing
       *    <code>FlashVars</code>}
       */
      getVariables: function getVariables() {
        return this.__variables;
      },

      /**
       * Set the <code>FlashVars</code> to pass variables to the Flash movie.
       *
       * @param value {Map} Map with key/value pairs for passing
       *    <code>FlashVars</code>
       */
      setVariables: function setVariables(value) {
        {
          qx.core.Assert.assertMap(value, "Invalid attribute 'value'.");
        }

        if (this.__flash) {
          throw new Error("The variables cannot be modified after initial creation");
        }

        this.__variables = value;
      },

      /**
       * Returns the attributes for the Flash DOM element.
       *
       * @return {Map} Attributes for the DOM element.
       */
      getAttributes: function getAttributes() {
        return this.__attributes;
      },

      /**
       * Set an attribute for the Flash DOM element.
       *
       * @param key {String} Key name.
       * @param value {String|Boolean|null} Value or <code>null</code> to remove attribute.
       */
      setAttribute: function setAttribute(key, value) {
        {
          qx.core.Assert.assertString(key, "Invalid attribute 'key'.");

          if (arguments.length > 1 && value !== null) {
            if (!qx.lang.Type.isBoolean(value) && !qx.lang.Type.isString(value)) {
              throw new Error("Invalid attribute 'value' expected String, Boolean or null.");
            }
          }
        }

        if (key.indexOf("$$") === 0) {
          qx.html.Flash.prototype.setAttribute.base.call(this, key, value);
        } else if (this.__flash) {
          throw new Error("The attributes cannot be modified after initial creation");
        }

        if (value === null || value === undefined) {
          delete this.__attributes[key];
        } else {
          this.__attributes[key] = value;
        }
      },

      /**
       * Returns the params for the Flash DOM element.
       *
       * @return {Map} Map with key/value pairs for the Flash DOM element.
       */
      getParams: function getParams() {
        return this.__params;
      },

      /**
       * Set the param for the Flash DOM element, also called attribute.
       *
       * @param key {String} Key name.
       * @param value {String|Boolean|null} Value or <code>null</code> to remove param
       */
      setParam: function setParam(key, value) {
        {
          qx.core.Assert.assertString(key, "Invalid attribute 'key'.");

          if (arguments.length > 1 && value !== null) {
            if (!qx.lang.Type.isBoolean(value) && !qx.lang.Type.isString(value)) {
              throw new Error("Invalid attribute 'value' expected String, Boolean or null.");
            }
          }
        }

        if (this.__flash) {
          throw new Error("The params cannot be modified after initial creation");
        }

        if (value === null || value === undefined) {
          delete this.__params[key];
        } else {
          this.__params[key] = value;
        }
      },

      /**
       * Return the created DOM Flash movie.
       *
       * @return {Element|null} The DOM Flash element, otherwise <code>null</code>.
       */
      getFlashElement: function getFlashElement() {
        return this.__flash;
      }

    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */

    destruct: function destruct() {
      if (this.__flash) {
        qx.bom.Flash.destroy(this.__flash);
      }

      this.__params = this.__variables = this.__attributes = null;
    }
  });
  qx.html.Flash.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Flash.js.map?dt=1555325112755