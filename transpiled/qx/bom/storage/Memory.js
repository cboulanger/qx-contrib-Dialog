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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.storage.Memory", {
    statics: {
      __local: null,
      __session: null,

      /**
       * Returns an instance of {@link qx.bom.storage.Memory} which is of course
       * not persisted on reload.
       * @return {qx.bom.storage.Memory} A memory storage.
       */
      getLocal: function getLocal() {
        if (this.__local) {
          return this.__local;
        }
        return this.__local = new qx.bom.storage.Memory();
      },

      /**
       * Returns an instance of {@link qx.bom.storage.Memory} which is of course
       * not persisted on reload.
       * @return {qx.bom.storage.Memory} A memory storage.
       */
      getSession: function getSession() {
        if (this.__session) {
          return this.__session;
        }
        return this.__session = new qx.bom.storage.Memory();
      }
    },

    construct: function construct() {
      this.__storage = {};
    },

    members: {
      __storage: null,

      /**
       * Returns the internal used map.
       * @return {Map} The storage.
       * @internal
       */
      getStorage: function getStorage() {
        return this.__storage;
      },

      /**
       * Returns the amount of key-value pairs stored.
       * @return {Integer} The length of the storage.
       */
      getLength: function getLength() {
        return Object.keys(this.__storage).length;
      },

      /**
       * Store an item in the storage.
       *
       * @param key {String} The identifier key.
       * @param value {var} The data, which will be stored as JSON.
       */
      setItem: function setItem(key, value) {
        value = qx.lang.Json.stringify(value);
        this.__storage[key] = value;
      },

      /**
       * Returns the stored item.
       *
       * @param key {String} The identifier to get the data.
       * @return {var} The stored data.
       */
      getItem: function getItem(key) {
        var item = this.__storage[key];

        if (qx.lang.Type.isString(item)) {
          item = qx.lang.Json.parse(item);
        }
        return item;
      },

      /**
       * Removes an item form the storage.
       * @param key {String} The identifier.
       */
      removeItem: function removeItem(key) {
        delete this.__storage[key];
      },

      /**
       * Deletes every stored item in the storage.
       */
      clear: function clear() {
        this.__storage = {};
      },

      /**
       * Returns the named key at the given index.
       * @param index {Integer} The index in the storage.
       * @return {String} The key stored at the given index.
       */
      getKey: function getKey(index) {
        var keys = Object.keys(this.__storage);
        return keys[index];
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
  qx.bom.storage.Memory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Memory.js.map?dt=1555325107548