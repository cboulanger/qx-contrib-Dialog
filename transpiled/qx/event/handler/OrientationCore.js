(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.Event": {},
      "qx.bom.Viewport": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.event.handler.OrientationCore", {

    extend: Object,
    implement: [qx.core.IDisposable],

    /**
     *
     * @param targetWindow {Window} DOM window object
     * @param emitter {qx.event.Emitter} Event emitter object
     */
    construct: function construct(targetWindow, emitter) {
      this._window = targetWindow || window;
      this.__emitter = emitter;
      this._initObserver();
    },

    members: {
      __emitter: null,
      _window: null,
      _currentOrientation: null,
      __onNativeWrapper: null,
      __nativeEventType: null,

      /*
      ---------------------------------------------------------------------------
        OBSERVER INIT
      ---------------------------------------------------------------------------
      */

      /**
       * Initializes the native orientation change event listeners.
       */
      _initObserver: function _initObserver() {
        this.__onNativeWrapper = qx.lang.Function.listener(this._onNative, this);

        // Handle orientation change event for Android devices by the resize event.
        // See http://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
        // for more information.
        this.__nativeEventType = qx.bom.Event.supportsEvent(this._window, "orientationchange") ? "orientationchange" : "resize";

        qx.bom.Event.addNativeListener(this._window, this.__nativeEventType, this.__onNativeWrapper);
      },

      /*
      ---------------------------------------------------------------------------
        OBSERVER STOP
      ---------------------------------------------------------------------------
      */

      /**
       * Disconnects the native orientation change event listeners.
       */
      _stopObserver: function _stopObserver() {
        qx.bom.Event.removeNativeListener(this._window, this.__nativeEventType, this.__onNativeWrapper);
      },

      /*
      ---------------------------------------------------------------------------
        NATIVE EVENT OBSERVERS
      ---------------------------------------------------------------------------
      */

      /**
       * Handler for the native orientation change event.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} The touch event from the browser.
       */
      _onNative: function _onNative(domEvent) {
        var orientation = qx.bom.Viewport.getOrientation();

        if (this._currentOrientation != orientation) {
          this._currentOrientation = orientation;
          var mode = qx.bom.Viewport.isLandscape() ? "landscape" : "portrait";

          domEvent._orientation = orientation;
          domEvent._mode = mode;

          if (this.__emitter) {
            this.__emitter.emit("orientationchange", domEvent);
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      this._stopObserver();
      this.__manager = this.__emitter = null;
    }

  });
  qx.event.handler.OrientationCore.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OrientationCore.js.map?dt=1555325111699