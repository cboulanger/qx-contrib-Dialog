(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.io.remote.Response", {
    extend: qx.event.type.Event,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /*
      ---------------------------------------------------------------------------
        PROPERTIES
      ---------------------------------------------------------------------------
      */

      /** State of the response. */
      state: {
        check: "Integer",
        nullable: true
      },

      /** Status code of the response. */
      statusCode: {
        check: "Integer",
        nullable: true
      },

      /** Content of the response. */
      content: {
        nullable: true
      },

      /** The headers of the response. */
      responseHeaders: {
        check: "Object",
        nullable: true,
        apply: "_applyResponseHeaders"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __lowerHeaders: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      // overridden
      clone: function clone(embryo) {
        var clone = qx.io.remote.Response.prototype.clone.base.call(this, embryo);
        clone.setType(this.getType());
        clone.setState(this.getState());
        clone.setStatusCode(this.getStatusCode());
        clone.setContent(this.getContent());
        clone.setResponseHeaders(this.getResponseHeaders());
        return clone;
      },

      /**
       * Returns a specific response header
       * @param vHeader {String} Response header name
       * @return {Object | null} The header value or null;
       */
      getResponseHeader: function getResponseHeader(vHeader) {
        if (this.__lowerHeaders) {
          return this.__lowerHeaders[vHeader.toLowerCase()] || null;
        }

        return null;
      },

      /**
       * Keep lower-cased shadow of response headers for later
       * case-insensitive matching.
       *
       * @param value {var} Current value
       * @param old {var} Previous value
       */
      _applyResponseHeaders: function _applyResponseHeaders(value, old) {
        var lowerHeaders = {};

        if (value !== null) {
          Object.keys(value).forEach(function (key) {
            lowerHeaders[key.toLowerCase()] = value[key];
          });
          this.__lowerHeaders = lowerHeaders;
        }
      }
    }
  });
  qx.io.remote.Response.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Response.js.map?dt=1555325113095