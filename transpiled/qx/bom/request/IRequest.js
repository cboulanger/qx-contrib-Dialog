(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.bom.request.IRequest", {

    members: {
      //
      // Properties
      // (Plain JavaScript)
      //

      /**
       * @type {Object} Native transport.
       */
      transport: null,

      /**
       * @type {Number} Ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * HEADERS_RECEIVED: 2,
       * LOADING:          3,
       * DONE:             4
       */
      readyState: 0,

      /**
       * @type {Number} The status code.
       */
      status: 0,

      /**
       * @type {String} The status text.
       */
      statusText: "",

      /**
       * @type {String} The response of the request as text.
       */
      responseText: "",

      /**
       * @type {Number} Timeout limit in milliseconds.
       *
       * 0 (default) means no timeout.
       */
      timeout: 0,

      //
      // Methods
      //

      /**
       * Initializes (prepares) request.
       *
       * @param method {String}
       *  The method to use.
       * @param url {String}
       *  The URL to which to send the request.
       * @param async {Boolean?true}
       *  Whether or not to perform the operation asynchronously.
       */
      open: function open(method, url, async) {},

      /**
       * Sends request.
       *
       * @param data {String|Document?null}
       *  Optional data to send.
       */
      send: function send(data) {},

      /**
       * Abort request
       */
      abort: function abort() {},

      /**
       * Get all response headers from response.
       *
       * @return {String} All response headers.
       */
      getAllResponseHeaders: function getAllResponseHeaders() {},

      /**
       * Get a single response header from response.
       *
       * @param header {String}
       *  Key of the header to get the value from.
       * @return {String}
       *  Response header.
       */
      getResponseHeader: function getResponseHeader(header) {},

      /**
       * Sets a request header to be used by the request.
       *
       * @param key {String}
       *  The name of the header whose value is to be set.
       * @param value {String}
       *  The value to set as the body of the header.
       */
      setRequestHeader: function setRequestHeader(key, value) {},

      //
      // Handlers
      //

      /**
       * Event handler for event fired at every state change.
       */
      onreadystatechange: function onreadystatechange() {},

      /**
       * Event handler for event fired on successful retrieval.
       */
      onload: function onload() {},

      /**
       * Event handler for event fired on retrieval.
       */
      onloadend: function onloadend() {},

      /**
       * Event handler for event fired on a network error.
       */
      onerror: function onerror() {},

      /**
      * Event handler for event fired when request is aborted.
      */
      onabort: function onabort() {},

      /**
      * Event handler for event fired when timeout interval has passed.
      */
      ontimeout: function ontimeout() {}
    }
  });
  qx.bom.request.IRequest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IRequest.js.map?dt=1555325107078