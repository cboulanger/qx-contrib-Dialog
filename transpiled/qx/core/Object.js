var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.core.ObjectRegistry": {
        "require": true,
        "construct": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.data.MBinding": {
        "require": true
      },
      "qx.core.MLogging": {
        "require": true
      },
      "qx.core.MEvent": {
        "require": true
      },
      "qx.core.MProperty": {
        "require": true
      },
      "qx.core.MObjectId": {
        "require": true
      },
      "qx.core.MAssert": {
        "require": true
      },
      "qx.core.IDisposable": {
        "construct": true
      },
      "qx.core.Property": {
        "require": true
      },
      "qx.Bootstrap": {},
      "qx.util.DisposeUtil": {},
      "qx.event.Registration": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.dispose.level": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.core.Object", {
    extend: Object,
    include: qx.core.Environment.filter({
      "module.databinding": qx.data.MBinding,
      "module.logger": qx.core.MLogging,
      "module.events": qx.core.MEvent,
      "module.property": qx.core.MProperty,
      "module.objectid": qx.core.MObjectId,
      "qx.debug": qx.core.MAssert
    }),

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance
     */
    construct: function construct() {
      if (false || qx.Class.hasInterface(this.constructor, qx.core.IDisposable)) {
        qx.core.ObjectRegistry.register(this);
      } else {
        qx.core.ObjectRegistry.toHashCode(this);
      }
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** Internal type */
      $$type: "Object"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __Property: true ? qx.core.Property : null,

      /*
      ---------------------------------------------------------------------------
        BASICS
      ---------------------------------------------------------------------------
      */

      /**
       * Return unique hash code of object
       *
       * @return {Integer} unique hash code of the object
       */
      toHashCode: function toHashCode() {
        return this.$$hash;
      },

      /**
       * Returns a string representation of the qooxdoo object.
       *
       * @return {String} string representation of the object
       */
      toString: function toString() {
        return this.classname + "[" + this.$$hash + "]";
      },

      /**
       * Call the same method of the super class.
       *
       * @param args {IArguments} the arguments variable of the calling method
       * @param varargs {var?} variable number of arguments passed to the overwritten function
       * @return {var} the return value of the method of the base class.
       */
      base: function base(args, varargs) {
        {
          if (!qx.Bootstrap.isFunction(args.callee.base)) {
            throw new Error("Cannot call super class. Method is not derived: " + args.callee.displayName);
          }
        }

        if (arguments.length === 1) {
          return args.callee.base.call(this);
        } else {
          return args.callee.base.apply(this, Array.prototype.slice.call(arguments, 1));
        }
      },

      /**
       * Returns the static class (to access static members of this class)
       *
       * @param args {arguments} the arguments variable of the calling method
       * @return {var} the return value of the method of the base class.
       */
      self: function self(args) {
        return args.callee.self;
      },

      /*
      ---------------------------------------------------------------------------
        CLONE SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * EXPERIMENTAL - NOT READY FOR PRODUCTION
       *
       * Returns a clone of this object. Copies over all user configured
       * property values. Do not configure a parent nor apply the appearance
       * styles directly.
       *
       * @return {qx.core.Object} The clone
       */
      clone: function clone() {

        var clazz = this.constructor;
        var clone = new clazz();
        var props = qx.Class.getProperties(clazz);
        var user = this.__Property.$$store.user;
        var setter = this.__Property.$$method.set;
        var name;

        // Iterate through properties
        for (var i = 0, l = props.length; i < l; i++) {
          name = props[i];
          if (this.hasOwnProperty(user[name])) {
            clone[setter[name]](this[user[name]]);
          }
        }

        // Return clone
        return clone;
      },

      /*
      ---------------------------------------------------------------------------
        USER DATA
      ---------------------------------------------------------------------------
      */

      /** @type {Map} stored user data */
      __userData: null,

      /**
       * Store user defined data inside the object.
       *
       * @param key {String} the key
       * @param value {Object} the value of the user data
       */
      setUserData: function setUserData(key, value) {
        if (!this.__userData) {
          this.__userData = {};
        }

        this.__userData[key] = value;
      },

      /**
       * Load user defined data from the object
       *
       * @param key {String} the key
       * @return {Object} the user data
       */
      getUserData: function getUserData(key) {
        if (!this.__userData) {
          return null;
        }
        var data = this.__userData[key];
        return data === undefined ? null : data;
      },

      /*
      ---------------------------------------------------------------------------
        DISPOSER
      ---------------------------------------------------------------------------
      */

      /**
       * Returns true if the object is disposed.
       *
       * @return {Boolean} Whether the object has been disposed
       */
      isDisposed: function isDisposed() {
        return this.$$disposed || false;
      },

      /**
       * Returns true if the object is being disposed, ie this.dispose() has started but 
       * not finished
       *
       * @return {Boolean} Whether the object is being disposed
       */
      isDisposing: function isDisposing() {
        return this.$$disposing || false;
      },

      /**
       * Dispose this object
       *
       */
      dispose: function dispose() {
        // Check first
        if (this.$$disposed) {
          return;
        }

        // Mark as disposed (directly, not at end, to omit recursions)
        this.$$disposed = true;
        this.$$disposing = true;
        this.$$instance = null;
        this.$$allowconstruct = null;

        // Debug output
        {
          if (qx.core.Environment.get("qx.debug.dispose.level") > 2) {
            qx.Bootstrap.debug(this, "Disposing " + this.classname + "[" + this.toHashCode() + "]");
          }
        }

        // Deconstructor support for classes
        var clazz = this.constructor;
        var mixins;

        while (clazz.superclass) {
          // Processing this class...
          if (clazz.$$destructor) {
            clazz.$$destructor.call(this);
          }

          // Destructor support for mixins
          if (clazz.$$includes) {
            mixins = clazz.$$flatIncludes;

            for (var i = 0, l = mixins.length; i < l; i++) {
              if (mixins[i].$$destructor) {
                mixins[i].$$destructor.call(this);
              }
            }
          }

          // Jump up to next super class
          clazz = clazz.superclass;
        }

        this.$$disposing = false;

        // Additional checks
        {
          if (qx.core.Environment.get("qx.debug.dispose.level") > 0) {
            var key, value;
            for (key in this) {
              value = this[key];

              // Check for Objects but respect values attached to the prototype itself
              if (value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && !qx.Bootstrap.isString(value)) {
                // Check prototype value
                // undefined is the best, but null may be used as a placeholder for
                // private variables (hint: checks in qx.Class.define). We accept both.
                if (this.constructor.prototype[key] != null) {
                  continue;
                }

                if (qx.core.Environment.get("qx.debug.dispose.level") > 1) {
                  qx.Bootstrap.warn(this, "Missing destruct definition for '" + key + "' in " + this.classname + "[" + this.toHashCode() + "]: " + value);
                  delete this[key];
                }
              }
            }
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        DISPOSER UTILITIES
      ---------------------------------------------------------------------------
      */

      /**
       * Disconnects and disposes given objects from instance.
       * Only works with qx.core.Object based objects e.g. Widgets.
       *
       * @param varargs {arguments} Names of fields (which store objects) to dispose
       */
      _disposeObjects: function _disposeObjects(varargs) {
        qx.util.DisposeUtil.disposeObjects(this, arguments);
      },

      /**
       * Disconnects and disposes given singleton objects from instance.
       * Only works with qx.core.Object based objects e.g. Widgets.
       *
       * @param varargs {arguments} Names of fields (which store objects) to dispose
       */
      _disposeSingletonObjects: function _disposeSingletonObjects(varargs) {
        qx.util.DisposeUtil.disposeObjects(this, arguments, true);
      },

      /**
       * Disposes all members of the given array and deletes
       * the field which refers to the array afterwards.
       *
       * @param field {String} Name of the field which refers to the array
       */
      _disposeArray: function _disposeArray(field) {
        qx.util.DisposeUtil.disposeArray(this, field);
      },

      /**
       * Disposes all members of the given map and deletes
       * the field which refers to the map afterwards.
       *
       * @param field {String} Name of the field which refers to the map
       */
      _disposeMap: function _disposeMap(field) {
        qx.util.DisposeUtil.disposeMap(this, field);
      }
    },

    /*
    *****************************************************************************
       ENVIRONMENT SETTINGS
    *****************************************************************************
    */

    environment: {
      "qx.debug.dispose.level": 0
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      {
        if (!qx.core.ObjectRegistry.inShutDown) {
          // Cleanup event listeners
          qx.event.Registration.removeAllListeners(this);
        } else {
          // on shutdown, just clear the internal listener map
          qx.event.Registration.deleteAllListeners(this);
        }
      }

      // Cleanup object registry
      qx.core.ObjectRegistry.unregister(this);

      // Cleanup user data
      this.__userData = null;

      // only of properties are available
      {
        // Cleanup properties
        var clazz = this.constructor;
        var properties;
        var store = this.__Property.$$store;
        var storeUser = store.user;
        var storeTheme = store.theme;
        var storeInherit = store.inherit;
        var storeUseinit = store.useinit;
        var storeInit = store.init;

        while (clazz) {
          properties = clazz.$$properties;
          if (properties) {
            for (var name in properties) {
              if (properties[name].dereference) {
                this[storeUser[name]] = this[storeTheme[name]] = this[storeInherit[name]] = this[storeUseinit[name]] = this[storeInit[name]] = undefined;
              }
            }
          }

          clazz = clazz.superclass;
        }
      }
    }
  });
  qx.core.Object.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Object.js.map?dt=1555325108039