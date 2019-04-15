(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.request.AbstractRequest": {
        "require": true
      },
      "qx.bom.request.Jsonp": {},
      "qx.util.Uri": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.io.request.Jsonp", {
    extend: qx.io.request.AbstractRequest,

    events: {

      /**
       * Fired when request completes without error and data has been received.
       */
      "success": "qx.event.type.Event",

      /**
       * Fired when request completes without error.
       *
       * Every request receiving a response completes without error. This means
       * that even for responses that do not call the callback, a "load" event
       * is fired. If you are only interested in the JSON data received, consider
       * listening to the {@link #success} event instead.
       */
      "load": "qx.event.type.Event",

      /**
       * Fired when request completes without error but no data was received.
       *
       * The underlying script transport does not know the HTTP status of the
       * response. However, if the callback was not called (no data received)
       * an erroneous status (500) is assigned to the transport’s status
       * property.
       *
       * Note: If you receive an unexpected "statusError", check that the JSONP
       * service accepts arbitrary callback names given as the "callback"
       * parameter. In case the service expects another parameter for the callback
       * name, use {@link #setCallbackParam}. Should the service respond with a
       * hard-coded callback, set a custom callback name with
       * {@link #setCallbackName}.
       */
      "statusError": "qx.event.type.Event"
    },

    properties: {
      /**
       * Whether to allow request to be answered from cache.
       *
       * Allowed values:
       *
       * * <code>true</code>: Allow caching (Default)
       * * <code>false</code>: Prohibit caching. Appends nocache parameter to URL.
       */
      cache: {
        check: "Boolean",
        init: true
      }
    },

    members: {
      /*
      ---------------------------------------------------------------------------
        CONFIGURE TRANSPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Create JSONP transport.
       *
       * @return {qx.bom.request.Jsonp} Transport.
       */
      _createTransport: function _createTransport() {
        return new qx.bom.request.Jsonp();
      },

      /**
       * Get configured URL.
       *
       * Append request data to URL. Also append random string
       * to URL if required by value of {@link #cache}.
       *
       * @return {String} The configured URL.
       */
      _getConfiguredUrl: function _getConfiguredUrl() {
        var url = this.getUrl(),
            serializedData;

        if (this.getRequestData()) {
          serializedData = this._serializeData(this.getRequestData());
          url = qx.util.Uri.appendParamsToUrl(url, serializedData);
        }

        if (!this.getCache()) {
          // Make sure URL cannot be served from cache and new request is made
          url = qx.util.Uri.appendParamsToUrl(url, { nocache: new Date().valueOf() });
        }

        return url;
      },

      /**
       * Return the transport’s responseJson property.
       *
       * See {@link qx.bom.request.Jsonp}.
       *
       * @return {Object} The parsed response of the request.
       */
      _getParsedResponse: function _getParsedResponse() {
        return this._transport.responseJson;
      },

      /*
      ---------------------------------------------------------------------------
        CALLBACK MANAGEMENT
      ---------------------------------------------------------------------------
      */

      /**
       * Set callback parameter.
       *
       * See {@link qx.bom.request.Jsonp#setCallbackParam}.
       *
       * @param param {String} Name of the callback parameter.
       */
      setCallbackParam: function setCallbackParam(param) {
        this._transport.setCallbackParam(param);
      },

      /**
       * Set callback name.
       *
       * See {@link qx.bom.request.Jsonp#setCallbackName}.
       *
       * @param name {String} Name of the callback function.
       */
      setCallbackName: function setCallbackName(name) {
        this._transport.setCallbackName(name);
      }
    }
  });
  qx.io.request.Jsonp.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsonp.js.map?dt=1555325113452