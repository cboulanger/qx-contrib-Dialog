(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.client.OperatingSystem": {},
      "qx.bom.client.Browser": {},
      "qx.event.type.GeoPosition": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.GeoLocation", {
    extend: qx.core.Object,
    type: "singleton",

    construct: function construct() {
      this._geolocation = navigator.geolocation;
    },

    events: {
      /** Fired when the position is updated */
      "position": "qx.event.type.GeoPosition",

      /** Fired when an error occurs */
      "error": "qx.event.type.Data"
    },

    members: {
      _watchId: null,
      _geolocation: null,

      /**
       * Retrieves the current position and calls the "position" event.
       *
       * @param enableHighAccuracy {Boolean} provide the best possible results
       * @param timeout {Integer} maximum time in ms that is allowed to pass from
       * the call to getCurrentPosition() or watchPosition() until the corresponding
       * callback is invoked.
       * @param maximumAge {Integer} cache the position for a specified time.
       */
      getCurrentPosition: function getCurrentPosition(enableHighAccuracy, timeout, maximumAge) {
        var successHandler = qx.lang.Function.bind(this._successHandler, this);
        var errorHandler;

        if (qx.core.Environment.get("os.name") === "android" && qx.core.Environment.get("browser.name").indexOf("chrome") !== -1) {
          errorHandler = function () {
            var boundDefaultHandler = this._errorHandler.bind(this);
            this._geolocation.getCurrentPosition(successHandler, boundDefaultHandler, {
              enableHighAccuracy: enableHighAccuracy,
              timeout: timeout,
              maximumAge: maximumAge
            });
          }.bind(this);
        } else {
          errorHandler = qx.lang.Function.bind(this._errorHandler, this);
        }

        this._geolocation.getCurrentPosition(successHandler, errorHandler, {
          enableHighAccuracy: enableHighAccuracy,
          timeout: timeout,
          maximumAge: maximumAge
        });
      },

      /**
       * Starts to watch the position. Calls the "position" event, when the position changed.
       *
       * @param enableHighAccuracy {Boolean} provide the best possible results
       * @param timeout {Integer} maximum time in ms that is allowed to pass from
       * the call to getCurrentPosition() or watchPosition() until the corresponding
       * callback is invoked.
       * @param maximumAge {Integer} cache the position for a specified time.
       */
      startWatchPosition: function startWatchPosition(enableHighAccuracy, timeout, maximumAge) {
        this.stopWatchPosition();

        var errorHandler = qx.lang.Function.bind(this._errorHandler, this);
        var successHandler = qx.lang.Function.bind(this._successHandler, this);

        this._watchId = this._geolocation.watchPosition(successHandler, errorHandler, {
          enableHighAccuracy: enableHighAccuracy,
          timeout: timeout,
          maximumAge: maximumAge
        });
      },

      /**
       * Stops watching the position.
       */
      stopWatchPosition: function stopWatchPosition() {
        if (this._watchId != null) {
          this._geolocation.clearWatch(this._watchId);
          this._watchId = null;
        }
      },

      /**
       * Success handler.
       *
       * @param position {Object} position event
       */
      _successHandler: function _successHandler(position) {
        this.fireEvent("position", qx.event.type.GeoPosition, [position]);
      },

      /**
       * The Error handler.
       *
       * @param error {Object} error event
       */
      _errorHandler: function _errorHandler(error) {
        this.fireDataEvent("error", error);
      }
    },

    destruct: function destruct() {
      this.stopWatchPosition();
    }
  });
  qx.bom.GeoLocation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GeoLocation.js.map?dt=1555325104591