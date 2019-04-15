var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.core.Environment", {
    statics: {

      /** Map containing the synchronous check functions. */
      _checks: {},
      /** Map containing the asynchronous check functions. */
      _asyncChecks: {},

      /** Internal cache for all checks. */
      __cache: {},

      /**
       * Internal map for environment keys to check methods.
       * Gets populated dynamically at runtime.
       */
      _checksMap: {},

      _defaults: {
        // an always-true key (e.g. for use in qx.core.Environment.filter() calls)
        "true": true,
        // old settings retTrue
        "qx.allowUrlSettings": false,
        "qx.allowUrlVariants": false,
        "qx.debug.property.level": 0,
        // old variants
        // make sure to reflect all changes to qx.debug here in the bootstrap class!
        "qx.debug": true,
        "qx.debug.ui.queue": true,
        "qx.debug.touchpad.detection": false,
        "qx.aspects": false,
        "qx.dynlocale": true,
        "qx.dyntheme": true,
        "qx.blankpage": "qx/static/blank.html",
        "qx.debug.databinding": false,
        "qx.debug.dispose": false,
        // generator optimization vectors
        "qx.optimization.basecalls": false,
        "qx.optimization.comments": false,
        "qx.optimization.privates": false,
        "qx.optimization.strings": false,
        "qx.optimization.variables": false,
        "qx.optimization.variants": false,
        // qooxdoo modules
        "module.databinding": true,
        "module.logger": true,
        "module.property": true,
        "module.events": true,
        "module.objectid": true,
        "qx.nativeScrollBars": false,
        "qx.automaticMemoryManagement": true,
        "qx.promise": true,
        "qx.promise.warnings": true,
        "qx.promise.longStackTraces": true
      },

      /**
       * The default accessor for the checks. It returns the value the current
       * environment has for the given key. The key could be something like
       * "qx.debug", "css.textoverflow" or "io.ssl". A complete list of
       * checks can be found in the class comment of this class.
       *
       * Please keep in mind that the result is cached. If you want to run the
       * check function again in case something could have been changed, take a
       * look at the {@link #invalidateCacheKey} function.
       *
       * @param key {String} The name of the check you want to query.
       * @return {var} The stored value depending on the given key.
       *   (Details in the class doc)
       */
      get: function get(key) {
        // check the cache
        if (this.__cache[key] != undefined) {
          return this.__cache[key];
        }

        // search for a matching check
        var check = this._checks[key];
        if (check) {
          // execute the check and write the result in the cache
          var value = check();
          this.__cache[key] = value;
          return value;
        }

        // try class lookup
        var classAndMethod = this._getClassNameFromEnvKey(key);
        if (classAndMethod[0] != undefined) {
          var clazz = classAndMethod[0];
          var method = classAndMethod[1];
          var value = clazz[method](); // call the check method
          this.__cache[key] = value;
          return value;
        }

        // debug flag
        if (qx.Bootstrap.DEBUG) {
          qx.Bootstrap.warn(key + " is not a valid key. Please see the API-doc of " + "qx.core.Environment for a list of predefined keys.");
          qx.Bootstrap.trace(this);
        }
      },

      /**
       * Maps an environment key to a check class and method name.
       *
       * @param key {String} The name of the check you want to query.
       * @return {Array} [className, methodName] of
       *  the corresponding implementation.
       */
      _getClassNameFromEnvKey: function _getClassNameFromEnvKey(key) {

        var envmappings = this._checksMap;
        if (envmappings[key] != undefined) {
          var implementation = envmappings[key];
          // separate class from method
          var lastdot = implementation.lastIndexOf(".");
          if (lastdot > -1) {
            var classname = implementation.slice(0, lastdot);
            var methodname = implementation.slice(lastdot + 1);
            var clazz = qx.Bootstrap.getByName(classname);
            if (clazz != undefined) {
              return [clazz, methodname];
            }
          }
        }
        return [undefined, undefined];
      },

      /**
       * Invokes the callback as soon as the check has been done. If no check
       * could be found, a warning will be printed.
       *
       * @param key {String} The key of the asynchronous check.
       * @param callback {Function} The function to call as soon as the check is
       *   done. The function should have one argument which is the result of the
       *   check.
       * @param self {var} The context to use when invoking the callback.
       */
      getAsync: function getAsync(key, callback, self) {
        // check the cache
        var env = this;
        if (this.__cache[key] != undefined) {
          // force async behavior
          window.setTimeout(function () {
            callback.call(self, env.__cache[key]);
          }, 0);
          return;
        }

        var check = this._asyncChecks[key];
        if (check) {
          check(function (result) {
            env.__cache[key] = result;
            callback.call(self, result);
          });
          return;
        }

        // try class lookup
        var classAndMethod = this._getClassNameFromEnvKey(key);
        if (classAndMethod[0] != undefined) {
          var clazz = classAndMethod[0];
          var method = classAndMethod[1];
          clazz[method](function (result) {
            // call the check method
            env.__cache[key] = result;
            callback.call(self, result);
          });
          return;
        }

        // debug flag
        if (qx.Bootstrap.DEBUG) {
          qx.Bootstrap.warn(key + " is not a valid key. Please see the API-doc of " + "qx.core.Environment for a list of predefined keys.");
          qx.Bootstrap.trace(this);
        }
      },

      /**
       * Returns the proper value dependent on the check for the given key.
       *
       * @param key {String} The name of the check the select depends on.
       * @param values {Map} A map containing the values which should be returned
       *   in any case. The "default" key could be used as a catch all statement.
       * @return {var} The value which is stored in the map for the given
       *   check of the key.
       */
      select: function select(key, values) {
        return this.__pickFromValues(this.get(key), values);
      },

      /**
       * Selects the proper function dependent on the asynchronous check.
       *
       * @param key {String} The key for the async check.
       * @param values {Map} A map containing functions. The map keys should
       *   contain all possibilities which could be returned by the given check
       *   key. The "default" key could be used as a catch all statement.
       *   The called function will get one parameter, the result of the query.
       * @param self {var} The context which should be used when calling the
       *   method in the values map.
       */
      selectAsync: function selectAsync(key, values, self) {
        this.getAsync(key, function (result) {
          var value = this.__pickFromValues(key, values);
          value.call(self, result);
        }, this);
      },

      /**
       * Internal helper which tries to pick the given key from the given values
       * map. If that key is not found, it tries to use a key named "default".
       * If there is also no default key, it prints out a warning and returns
       * undefined.
       *
       * @param key {String} The key to search for in the values.
       * @param values {Map} A map containing some keys.
       * @return {var} The value stored as values[key] usually.
       */
      __pickFromValues: function __pickFromValues(key, values) {
        var value = values[key];
        if (values.hasOwnProperty(key)) {
          return value;
        }

        // check for piped values
        for (var id in values) {
          if (id.indexOf("|") != -1) {
            var ids = id.split("|");
            for (var i = 0; i < ids.length; i++) {
              if (ids[i] == key) {
                return values[id];
              }
            };
          }
        }

        if (values["default"] !== undefined) {
          return values["default"];
        }

        if (qx.Bootstrap.DEBUG) {
          throw new Error('No match for variant "' + key + '" (' + (typeof key === "undefined" ? "undefined" : _typeof(key)) + ' type)' + ' in variants [' + qx.Bootstrap.keys(values) + '] found, and no default ("default") given');
        }
      },

      /**
       * Takes a given map containing the check names as keys and converts
       * the map to an array only containing the values for check evaluating
       * to <code>true</code>. This is especially handy for conditional
       * includes of mixins.
       * @param map {Map} A map containing check names as keys and values.
       * @return {Array} An array containing the values.
       */
      filter: function filter(map) {
        var returnArray = [];

        for (var check in map) {
          if (this.get(check)) {
            returnArray.push(map[check]);
          }
        }

        return returnArray;
      },

      /**
       * Invalidates the cache for the given key.
       *
       * @param key {String} The key of the check.
       */
      invalidateCacheKey: function invalidateCacheKey(key) {
        delete this.__cache[key];
      },

      /**
       * Add a check to the environment class. If there is already a check
       * added for the given key, the add will be ignored.
       *
       * @param key {String} The key for the check e.g. html.featurexyz.
       * @param check {var} It could be either a function or a simple value.
       *   The function should be responsible for the check and should return the
       *   result of the check.
       */
      add: function add(key, check) {
        // ignore already added checks.
        if (this._checks[key] == undefined) {
          // add functions directly
          if (check instanceof Function) {
            if (!this._checksMap[key] && check.displayName) {
              this._checksMap[key] = check.displayName.substr(0, check.displayName.length - 2);
            }
            this._checks[key] = check;
            // otherwise, create a check function and use that
          } else {
            this._checks[key] = this.__createCheck(check);
          }
        }
      },

      /**
       * Adds an asynchronous check to the environment. If there is already a check
       * added for the given key, the add will be ignored.
       *
       * @param key {String} The key of the check e.g. html.featureabc
       * @param check {Function} A function which should check for a specific
       *   environment setting in an asynchronous way. The method should take two
       *   arguments. First one is the callback and the second one is the context.
       */
      addAsync: function addAsync(key, check) {
        if (this._checks[key] == undefined) {
          this._asyncChecks[key] = check;
        }
      },

      /**
       * Returns all currently defined synchronous checks.
       *
       * @internal
       * @return {Map} The map of synchronous checks
       */
      getChecks: function getChecks() {
        return this._checks;
      },

      /**
       * Returns all currently defined asynchronous checks.
       *
       * @internal
       * @return {Map} The map of asynchronous checks
       */
      getAsyncChecks: function getAsyncChecks() {
        return this._asyncChecks;
      },

      /**
       * Initializer for the default values of the framework settings.
       */
      _initDefaultQxValues: function _initDefaultQxValues() {
        var createFuncReturning = function createFuncReturning(val) {
          return function () {
            return val;
          };
        };

        for (var prop in this._defaults) {
          this.add(prop, createFuncReturning(this._defaults[prop]));
        }
      },

      /**
       * Import checks from global qx.$$environment into the Environment class.
       */
      __importFromGenerator: function __importFromGenerator() {
        // import the environment map
        if (qx && qx.$$environment) {
          for (var key in qx.$$environment) {
            var value = qx.$$environment[key];

            this._checks[key] = this.__createCheck(value);
          }
        }
      },

      /**
       * Checks the URL for environment settings and imports these into the
       * Environment class.
       */
      __importFromUrl: function __importFromUrl() {
        if (window.document && window.document.location) {
          var urlChecks = window.document.location.search.slice(1).split("&");

          for (var i = 0; i < urlChecks.length; i++) {
            var check = urlChecks[i].split(":");
            if (check.length != 3 || check[0] != "qxenv") {
              continue;
            }

            var key = check[1];
            var value = decodeURIComponent(check[2]);

            // implicit type conversion
            if (value == "true") {
              value = true;
            } else if (value == "false") {
              value = false;
            } else if (/^(\d|\.)+$/.test(value)) {
              value = parseFloat(value);
            }

            this._checks[key] = this.__createCheck(value);
          }
        }
      },

      /**
       * Internal helper which creates a function returning the given value.
       *
       * @param value {var} The value which should be returned.
       * @return {Function} A function which could be used by a test.
       */
      __createCheck: function __createCheck(value) {
        return qx.Bootstrap.bind(function (value) {
          return value;
        }, null, value);
      }
    },

    defer: function defer(statics) {
      // create default values for the environment class
      statics._initDefaultQxValues();
      // load the checks from the generator
      statics.__importFromGenerator();
      // load the checks from the url
      if (statics.get("qx.allowUrlSettings") === true) {
        statics.__importFromUrl();
      }
    }
  });
  qx.core.Environment.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Environment.js.map?dt=1555325107836