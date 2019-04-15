(function () {
  var $$dbClassInfo = {
    'dependsOn': {
      'qx.Class': {
        'usage': 'dynamic',
        'require': true
      },
      'qx.core.Object': {
        'construct': true,
        'require': true
      },
      'qx.lang.Type': {
        'construct': true
      },
      'qx.lang.Array': {
        'construct': true
      },
      'qx.Promise': {},
      'qx.util.ResourceManager': {},
      'qx.bom.request.Script': {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.util.DynamicScriptLoader", {
    extend: qx.core.Object,

    /**
     * Create a loader for the given scripts.
     *
     * @param scriptArr {Array|String} the uri name(s) of the script(s) to load 
     */

    construct: function construct(scriptArr) {
      qx.core.Object.constructor.call(this);
      this.__started = false;
      this.__QUEUE = qx.lang.Type.isString(scriptArr) ? [scriptArr] : qx.lang.Array.clone(scriptArr);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * fired when a script is loaded successfully. The data contains 'script' and 'status' keys.
       */
      loaded: 'qx.event.type.Data',

      /**
       * fired when a specific script fails loading.  The data contains 'script' and 'status' keys.
       */
      failed: 'qx.event.type.Data',

      /**
       * fired when all given scripts are loaded, each time loadScriptsDynamic is called.
       */
      ready: 'qx.event.type.Event'
    },

    statics: {
      /**
       * Map of scripts being added at the present time. Key is script name; value is instance of this class which
       * is loading it.
       */
      __IN_PROGRESS: {},
      /**
       * Map of scripts that have fully loaded. Key is script name; value is true
       */
      __LOADED: {}
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      /**
       * Array of the scripts to be loaded
       */
      __QUEUE: null,

      /**
       * True if start has been called.
       */
      __started: null,

      /**
       * Start loading scripts. This may only be called once!
       * @return {Promise?} a promise which will be resolved after load of all scripts if promise support is enabled; nothing (undefined) if promises are not enabled.
       */
      start: function start() {
        return new qx.Promise(function (resolve, reject) {
          this.addListenerOnce("ready", resolve, this);
          this.addListenerOnce("failed", function (e) {
            reject(new Error(e.getData()));
          }, this);
          if (this.isDisposed()) {
            reject(new Error('disposed'));
          }
          if (this.__started) {
            reject(new Error('you can only call start once per instance'));
          }
          this.__started = true;
          this.__loadScripts();
        }, this);
      },

      /**
       * Chain loading scripts.
       *
       * Recursively called until the array of scripts is consumed
       *
       */
      __loadScripts: function __loadScripts() {
        var DynamicScriptLoader = qx.util.DynamicScriptLoader;
        var script;
        var dynLoader;
        var id1, id2;
        var uri;
        var loader;

        script = this.__QUEUE.shift();
        if (!script) {
          this.fireEvent("ready");
          return;
        }

        if (DynamicScriptLoader.__LOADED[script]) {
          this.fireDataEvent('loaded', {
            script: script,
            status: 'preloaded'
          });
          this.__loadScripts();
          return;
        }

        dynLoader = DynamicScriptLoader.__IN_PROGRESS[script];
        if (dynLoader) {

          id1 = dynLoader.addListener('loaded', function (e) {
            if (this.isDisposed()) {
              return;
            }
            var data = e.getData();
            if (data.script === script) {
              dynLoader.removeListenerById(id2);
              dynLoader.removeListenerById(id1);
              this.fireDataEvent('loaded', data);
              this.__loadScripts();
            }
          }, this);

          id2 = dynLoader.addListener('failed', function (e) {
            if (this.isDisposed()) {
              return;
            }
            var data = e.getData();
            dynLoader.removeListenerById(id1);
            dynLoader.removeListenerById(id2);
            this.fireDataEvent('failed', {
              script: script,
              status: 'loading of ' + data.script + ' failed while waiting for ' + script
            });
          }, this);

          return;
        }

        uri = qx.util.ResourceManager.getInstance().toUri(script);

        loader = new qx.bom.request.Script();

        loader.on("load", function (request) {
          if (this.isDisposed()) {
            return;
          }
          DynamicScriptLoader.__LOADED[script] = true;
          delete DynamicScriptLoader.__IN_PROGRESS[script];
          this.fireDataEvent('loaded', {
            script: script,
            status: request.status
          });
          this.__loadScripts();
        }, this);

        var onError = function onError(request) {
          if (this.isDisposed()) {
            return;
          }
          delete DynamicScriptLoader.__IN_PROGRESS[script];
          this.fireDataEvent('failed', {
            script: script,
            status: request.status
          });
        };

        loader.on("error", onError, this);
        loader.on("timeout", onError, this);

        // this.debug("Loading " + script + " started");
        loader.open("GET", uri);
        DynamicScriptLoader.__IN_PROGRESS[script] = this;
        loader.send();
      }
    },
    destruct: function destruct() {
      var DynamicScriptLoader = qx.util.DynamicScriptLoader;
      for (var key in DynamicScriptLoader.__IN_PROGRESS) {
        if (DynamicScriptLoader.__IN_PROGRESS[key] === this) {
          delete DynamicScriptLoader.__IN_PROGRESS[key];
        }
      }
      this.__QUEUE = undefined;
    }
  });
  qx.util.DynamicScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DynamicScriptLoader.js.map?dt=1555325128685