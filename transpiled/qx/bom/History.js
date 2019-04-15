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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Event": {
        "require": true
      },
      "qx.bom.client.Browser": {},
      "qx.bom.HashHistory": {},
      "qx.bom.client.Engine": {},
      "qx.bom.IframeHistory": {},
      "qx.bom.NativeHistory": {},
      "qx.lang.Type": {},
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "event.hashchange": {
          "load": true,
          "className": "qx.bom.client.Event"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.History", {
    extend: qx.core.Object,
    type: "abstract",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this._baseUrl = window.location.href.split('#')[0] + '#';

      this._titles = {};
      this._setInitialState();
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Fired when the user moved in the history. The data property of the event
       * holds the state, which was passed to {@link #addToHistory}.
       */
      "request": "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * @type {Boolean} Whether the browser supports the 'hashchange' event natively.
       */
      SUPPORTS_HASH_CHANGE_EVENT: qx.core.Environment.get("event.hashchange"),

      /**
       * Get the singleton instance of the history manager.
       *
       * @return {History}
       */
      getInstance: function getInstance() {
        var runsInIframe = !(window == window.top);

        if (!this.$$instance) {
          // in iframe + IE9
          if (runsInIframe && qx.core.Environment.get("browser.documentmode") == 9) {
            this.$$instance = new qx.bom.HashHistory();
          }

          // in iframe + IE<9
          else if (runsInIframe && qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
              this.$$instance = new qx.bom.IframeHistory();
            }

            // browser with hashChange event
            else if (this.SUPPORTS_HASH_CHANGE_EVENT) {
                this.$$instance = new qx.bom.NativeHistory();
              }

              // IE without hashChange event
              else if (qx.core.Environment.get("engine.name") == "mshtml") {
                  this.$$instance = new qx.bom.IframeHistory();
                }

                // fallback
                else {
                    this.$$instance = new qx.bom.NativeHistory();
                  }
        }
        return this.$$instance;
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Property holding the current title
       */
      title: {
        check: "String",
        event: "changeTitle",
        nullable: true,
        apply: "_applyTitle"
      },

      /**
       * Property holding the current state of the history.
       */
      state: {
        check: "String",
        event: "changeState",
        nullable: true,
        apply: "_applyState"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _titles: null,

      // property apply
      _applyState: function _applyState(value, old) {
        this._writeState(value);
      },

      /**
       * Populates the 'state' property with the initial state value
       */
      _setInitialState: function _setInitialState() {
        this.setState(this._readState());
      },

      /**
       * Encodes the state value into a format suitable as fragment identifier.
       *
       * @param value {String} The string to encode
       * @return {String} The encoded string
       */
      _encode: function _encode(value) {
        if (qx.lang.Type.isString(value)) {
          return encodeURIComponent(value);
        }

        return "";
      },

      /**
       * Decodes a fragment identifier into a string
       *
       * @param value {String} The fragment identifier
       * @return {String} The decoded fragment identifier
       */
      _decode: function _decode(value) {
        if (qx.lang.Type.isString(value)) {
          return decodeURIComponent(value);
        }

        return "";
      },

      // property apply
      _applyTitle: function _applyTitle(title) {
        if (title != null) {
          document.title = title || "";
        }
      },

      /**
       * Adds an entry to the browser history.
       *
       * @param state {String} a string representing the state of the
       *          application. This command will be delivered in the data property of
       *          the "request" event.
       * @param newTitle {String ? null} the page title to set after the history entry
       *          is done. This title should represent the new state of the application.
       */
      addToHistory: function addToHistory(state, newTitle) {
        if (!qx.lang.Type.isString(state)) {
          state = state + "";
        }

        if (qx.lang.Type.isString(newTitle)) {
          this.setTitle(newTitle);
          this._titles[state] = newTitle;
        }

        if (this.getState() !== state) {
          this._writeState(state);
        }
      },

      /**
       * Navigates back in the browser history.
       * Simulates a back button click.
       */
      navigateBack: function navigateBack() {
        qx.event.Timer.once(function () {
          history.back();
        }, this, 100);
      },

      /**
       * Navigates forward in the browser history.
       * Simulates a forward button click.
       */
      navigateForward: function navigateForward() {
        qx.event.Timer.once(function () {
          history.forward();
        }, this, 100);
      },

      /**
       * Called on changes to the history using the browser buttons.
       *
       * @param state {String} new state of the history
       */
      _onHistoryLoad: function _onHistoryLoad(state) {
        this.setState(state);
        this.fireDataEvent("request", state);
        if (this._titles[state] != null) {
          this.setTitle(this._titles[state]);
        }
      },

      /**
       * Browser dependent function to read the current state of the history
       *
       * @return {String} current state of the browser history
       */
      _readState: function _readState() {
        throw new Error("Abstract method call");
      },

      /**
       * Save a state into the browser history.
       *
       * @param state {String} state to save
       */
      _writeState: function _writeState(state) {
        throw new Error("Abstract method call");
      },

      /**
       * Sets the fragment identifier of the window URL
       *
       * @param value {String} the fragment identifier
       */
      _setHash: function _setHash(value) {
        var url = this._baseUrl + (value || "");
        var loc = window.location;

        if (url != loc.href) {
          loc.href = url;
        }
      },

      /**
       * Returns the fragment identifier of the top window URL. For gecko browsers we
       * have to use a regular expression to avoid encoding problems.
       *
       * @return {String} the fragment identifier
       */
      _getHash: function _getHash() {
        var hash = /#(.*)$/.exec(window.location.href);
        return hash && hash[1] ? hash[1] : "";
      }
    }
  });
  qx.bom.History.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=History.js.map?dt=1555325104633