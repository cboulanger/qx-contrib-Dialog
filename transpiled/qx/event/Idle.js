(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.event.Idle", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    type: "singleton",

    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** This event if fired each time the interval time has elapsed */
      "interval": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Interval for the timer, which periodically fires the "interval" event,
       * in milliseconds.
       */
      timeoutInterval: {
        check: "Number",
        init: 100,
        apply: "_applyTimeoutInterval"
      }
    },

    members: {

      __timer: null,

      // property apply
      _applyTimeoutInterval: function _applyTimeoutInterval(value) {
        if (this.__timer) {
          this.__timer.setInterval(value);
        }
      },

      /**
       * Fires an "interval" event
       */
      _onInterval: function _onInterval() {
        this.fireEvent("interval");
      },

      /**
       * Starts the timer but only if there are listeners for the "interval" event
       */
      __startTimer: function __startTimer() {
        if (!this.__timer && this.hasListener("interval")) {
          var timer = new qx.event.Timer(this.getTimeoutInterval());
          timer.addListener("interval", this._onInterval, this);
          timer.start();

          this.__timer = timer;
        }
      },

      /**
       * Stops the timer but only if there are no listeners for the interval event
       */
      __stopTimer: function __stopTimer() {
        if (this.__timer && !this.hasListener("interval")) {
          this.__timer.stop();
          this.__timer.dispose();
          this.__timer = null;
        }
      },

      /*
       * @Override
       */
      addListener: function addListener(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.addListener.base.call(this, type, listener, self, capture);
        this.__startTimer();
        return result;
      },

      /*
       * @Override
       */
      addListenerOnce: function addListenerOnce(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.addListenerOnce.base.call(this, type, listener, self, capture);
        this.__startTimer();
        return result;
      },

      /*
       * @Override
       */
      removeListener: function removeListener(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.removeListener.base.call(this, type, listener, self, capture);
        this.__stopTimer();
        return result;
      },

      /*
       * @Override
       */
      removeListenerById: function removeListenerById(id) {
        var result = qx.event.Idle.prototype.removeListenerById.base.call(this, id);
        this.__stopTimer();
        return result;
      }

    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      if (this.__timer) {
        this.__timer.stop();
      }

      this.__timer = null;
    }

  });
  qx.event.Idle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Idle.js.map?dt=1555325110631