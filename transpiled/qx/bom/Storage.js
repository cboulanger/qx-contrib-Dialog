(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Html": {},
      "qx.bom.storage.Web": {},
      "qx.bom.storage.UserData": {},
      "qx.bom.storage.Memory": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        },
        "html.storage.userdata": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.Storage", {
    statics: {
      __impl: null,

      /**
       * Get an instance of a local storage.
       * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
       *   An instance of a storage implementation.
       */
      getLocal: function getLocal() {
        // always use HTML5 web storage if available
        if (qx.core.Environment.get("html.storage.local")) {
          return qx.bom.storage.Web.getLocal();
        } else if (qx.core.Environment.get("html.storage.userdata")) {
          // IE <8 fallback
          // as fallback,use the userdata storage for IE5.5 - 8
          return qx.bom.storage.UserData.getLocal();
        }
        // as last fallback, use a in memory storage (this one is not persistent)
        return qx.bom.storage.Memory.getLocal();
      },

      /**
       * Get an instance of a session storage.
       * @return {qx.bom.storage.Web|qx.bom.storage.UserData|qx.bom.storage.Memory}
       *   An instance of a storage implementation.
       */
      getSession: function getSession() {
        // always use HTML5 web storage if available
        if (qx.core.Environment.get("html.storage.local")) {
          return qx.bom.storage.Web.getSession();
        } else if (qx.core.Environment.get("html.storage.userdata")) {
          // IE <8 fallback
          // as fallback,use the userdata storage for IE5.5 - 8
          return qx.bom.storage.UserData.getSession();
        }
        // as last fallback, use a in memory storage (this one is not persistent)
        return qx.bom.storage.Memory.getSession();
      }
    }
  });
  qx.bom.Storage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Storage.js.map?dt=1555325105314