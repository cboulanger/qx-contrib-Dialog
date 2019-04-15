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
      "qx.bom.Stylesheet": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.style.Stylesheet", {
    type: "singleton",
    extend: qx.core.Object,

    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__sheet = qx.bom.Stylesheet.createElement();
      this.__rules = [];
    },

    members: {
      __rules: null,
      __sheet: null,

      /**
       * Adds a rule to the global stylesheet.
       * @param selector {String} The CSS selector to add the rule for.
       * @param css {String} The rule's content.
       */
      addRule: function addRule(selector, css) {
        if (this.hasRule(selector)) {
          return;
        }
        qx.bom.Stylesheet.addRule(this.__sheet, selector, css);
        this.__rules.push(selector);
      },

      /**
       * Check if a rule exists.
       * @param selector {String} The selector to check.
       * @return {Boolean} <code>true</code> if the rule exists
       */
      hasRule: function hasRule(selector) {
        return this.__rules.indexOf(selector) != -1;
      },

      /**
       * Remove the rule for the given selector.
       * @param selector {String} The selector to identify the rule.
       */
      removeRule: function removeRule(selector) {
        delete this.__rules[this.__rules.indexOf(selector)];
        qx.bom.Stylesheet.removeRule(this.__sheet, selector);
      }
    }
  });
  qx.ui.style.Stylesheet.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Stylesheet.js.map?dt=1555325124033