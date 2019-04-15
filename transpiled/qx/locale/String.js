(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.locale.String", {
    statics: {
      /**
       * Get quotation start sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} quotation start sign
       */
      getQuotationStart: function getQuotationStart(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_quotationStart", [], locale);
      },

      /**
       * Get quotation end sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} quotation end sign
       */
      getQuotationEnd: function getQuotationEnd(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_quotationEnd", [], locale);
      },

      /**
       * Get quotation alternative start sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} alternative quotation start sign
       */
      getAlternateQuotationStart: function getAlternateQuotationStart(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_alternateQuotationStart", [], locale);
      },

      /**
       * Get quotation alternative end sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} alternative quotation end sign
       */
      getAlternateQuotationEnd: function getAlternateQuotationEnd(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_alternateQuotationEnd", [], locale);
      }
    }
  });
  qx.locale.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1555325114296