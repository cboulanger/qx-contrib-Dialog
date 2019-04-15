(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Json": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.storage.Web", {
    statics: {
      __local: null,
      __session: null,

      /**
       * Static accessor for the local storage.
       * @return {qx.bom.storage.Web} An instance of a local storage.
       */
      getLocal: function getLocal() {
        if (this.__local) {
          return this.__local;
        }
        return this.__local = new qx.bom.storage.Web("local");
      },

      /**
       * Static accessor for the session storage.
       * @return {qx.bom.storage.Web} An instance of a session storage.
       */
      getSession: function getSession() {
        if (this.__session) {
          return this.__session;
        }
        return this.__session = new qx.bom.storage.Web("session");
      }
    },

    /**
     * Create a new instance. Usually, you should take the static
     * accessors to get your instance.
     *
     * @param type {String} type of storage, either
     *   <code>local</code> or <code>session</code>.
     */
    construct: function construct(type) {
      this.__type = type;
    },

    members: {
      __type: null,

      /**
       * Returns the internal used storage (the native object).
       *
       * @internal
       * @return {Storage} The native storage implementation.
       */
      getStorage: function getStorage() {
        return window[this.__type + "Storage"];
      },

      /**
       * Returns the amount of key-value pairs stored.
       * @return {Integer} The length of the storage.
       */
      getLength: function getLength() {
        return this.getStorage(this.__type).length;
      },

      /**
       * Store an item in the storage.
       *
       * @param key {String} The identifier key.
       * @param value {var} The data, which will be stored as JSON.
       */
      setItem: function setItem(key, value) {
        value = qx.lang.Json.stringify(value);
        try {
          this.getStorage(this.__type).setItem(key, value);
        } catch (e) {
          throw new Error("Storage full.");
        }
      },

      /**
       * Returns the stored item.
       *
       * @param key {String} The identifier to get the data.
       * @return {var} The stored data.
       */
      getItem: function getItem(key) {
        var item = this.getStorage(this.__type).getItem(key);

        if (qx.lang.Type.isString(item)) {
          item = qx.lang.Json.parse(item);
          // special case for FF3
        } else if (item && item.value && qx.lang.Type.isString(item.value)) {
          item = qx.lang.Json.parse(item.value);
        }

        return item;
      },

      /**
       * Removes an item form the storage.
       * @param key {String} The identifier.
       */
      removeItem: function removeItem(key) {
        this.getStorage(this.__type).removeItem(key);
      },

      /**
       * Deletes every stored item in the storage.
       */
      clear: function clear() {
        var storage = this.getStorage(this.__type);
        if (!storage.clear) {
          for (var i = storage.length - 1; i >= 0; i--) {
            storage.removeItem(storage.key(i));
          }
        } else {
          storage.clear();
        }
      },

      /**
       * Returns the named key at the given index.
       * @param index {Integer} The index in the storage.
       * @return {String} The key stored at the given index.
       */
      getKey: function getKey(index) {
        return this.getStorage(this.__type).key(index);
      },

      /**
       * Helper to access every stored item.
       *
       * @param callback {Function} A function which will be called for every item.
       *   The function will have two arguments, first the key and second the value
       *    of the stored data.
       * @param scope {var} The scope of the function.
       */
      forEach: function forEach(callback, scope) {
        var length = this.getLength();
        for (var i = 0; i < length; i++) {
          var key = this.getKey(i);
          callback.call(scope, key, this.getItem(key));
        }
      }
    }
  });
  qx.bom.storage.Web.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Web.js.map?dt=1555325107585