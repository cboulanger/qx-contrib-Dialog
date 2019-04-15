(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.History": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.event.GlobalError": {},
      "qx.bom.Event": {},
      "qx.event.Idle": {},
      "qx.lang.Type": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.NativeHistory", {
    extend: qx.bom.History,
    implement: [qx.core.IDisposable],

    construct: function construct() {
      qx.bom.History.constructor.call(this);
      this.__attachListeners();
    },

    members: {
      __checkOnHashChange: null,

      /**
       * Attach hash change listeners
       */
      __attachListeners: function __attachListeners() {
        if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT) {
          var boundFunc = qx.lang.Function.bind(this.__onHashChange, this);
          this.__checkOnHashChange = qx.event.GlobalError.observeMethod(boundFunc);
          qx.bom.Event.addNativeListener(window, "hashchange", this.__checkOnHashChange);
        } else {
          qx.event.Idle.getInstance().addListener("interval", this.__onHashChange, this);
        }
      },

      /**
       * Remove hash change listeners
       */
      __detatchListeners: function __detatchListeners() {
        if (qx.bom.History.SUPPORTS_HASH_CHANGE_EVENT) {
          qx.bom.Event.removeNativeListener(window, "hashchange", this.__checkOnHashChange);
        } else {
          qx.event.Idle.getInstance().removeListener("interval", this.__onHashChange, this);
        }
      },

      /**
       * hash change event handler
       */
      __onHashChange: function __onHashChange() {
        var currentState = this._readState();

        if (qx.lang.Type.isString(currentState) && currentState != this.getState()) {
          this._onHistoryLoad(currentState);
        }
      },

      /**
       * Browser dependent function to read the current state of the history
       *
       * @return {String} current state of the browser history
       */
      _readState: function _readState() {
        return this._decode(this._getHash());
      },

      /**
       * Save a state into the browser history.
       *
       * @param state {String} state to save
       */
      _writeState: qx.core.Environment.select("engine.name", {
        "opera": function opera(state) {
          qx.event.Timer.once(function () {
            this._setHash(this._encode(state));
          }, this, 0);
        },

        "default": function _default(state) {
          this._setHash(this._encode(state));
        }
      })
    },

    destruct: function destruct() {
      this.__detatchListeners();
    }
  });
  qx.bom.NativeHistory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NativeHistory.js.map?dt=1555325104906