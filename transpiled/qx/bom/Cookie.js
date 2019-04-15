(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.Cookie", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /*
      ---------------------------------------------------------------------------
        USER APPLICATION METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the string value of a cookie.
       *
       * @param key {String} The key for the saved string value.
       * @return {null | String} Returns the saved string value, if the cookie
       *    contains a value for the key, <code>null</code> otherwise.
       */
      get: function get(key) {
        var start = document.cookie.indexOf(key + "=");
        var len = start + key.length + 1;

        if (!start && key != document.cookie.substring(0, key.length)) {
          return null;
        }

        if (start == -1) {
          return null;
        }

        var end = document.cookie.indexOf(";", len);

        if (end == -1) {
          end = document.cookie.length;
        }

        try {
          return decodeURIComponent(document.cookie.substring(len, end));
        } catch (URIError) {
          qx.log.Logger.error("Error decoding URI components", URIError.message);
          return null;
        }
      },

      /**
       * Sets the string value of a cookie.
       *
       * @param key {String} The key for the string value.
       * @param value {String} The string value.
       * @param expires {Number?null} The expires in days starting from now,
       *    or <code>null</code> if the cookie should deleted after browser close.
       * @param path {String?null} Path value.
       * @param domain {String?null} Domain value.
       * @param secure {Boolean?null} Secure flag.
       */
      set: function set(key, value, expires, path, domain, secure) {
        // Generate cookie
        var cookie = [key, "=", encodeURIComponent(value)];

        if (expires) {
          var today = new Date();
          today.setTime(today.getTime());

          cookie.push(";expires=", new Date(today.getTime() + expires * 1000 * 60 * 60 * 24).toGMTString());
        }

        if (path) {
          cookie.push(";path=", path);
        }

        if (domain) {
          cookie.push(";domain=", domain);
        }

        if (secure) {
          cookie.push(";secure");
        }

        // Store cookie
        document.cookie = cookie.join("");
      },

      /**
       * Deletes the string value of a cookie.
       *
       * @param key {String} The key for the string value.
       * @param path {String?null} Path value.
       * @param domain {String?null} Domain value.
       */
      del: function del(key, path, domain) {
        if (!qx.bom.Cookie.get(key)) {
          return;
        }

        // Generate cookie
        var cookie = [key, "="];

        if (path) {
          cookie.push(";path=", path);
        }

        if (domain) {
          cookie.push(";domain=", domain);
        }

        cookie.push(";expires=Thu, 01-Jan-1970 00:00:01 GMT");

        // Store cookie
        document.cookie = cookie.join("");
      }
    }
  });
  qx.bom.Cookie.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Cookie.js.map?dt=1555325104347