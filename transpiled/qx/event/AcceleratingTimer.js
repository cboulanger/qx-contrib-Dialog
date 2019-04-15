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
      "qx.event.Timer": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.event.AcceleratingTimer", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this.__timer = new qx.event.Timer(this.getInterval());
      this.__timer.addListener("interval", this._onInterval, this);
    },

    events: {
      /** This event if fired each time the interval time has elapsed */
      "interval": "qx.event.type.Event"
    },

    properties: {
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 100
      },

      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 500
      },

      /** This configures the minimum value for the timer interval. */
      minimum: {
        check: "Integer",
        init: 20
      },

      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      decrease: {
        check: "Integer",
        init: 2
      }
    },

    members: {
      __timer: null,
      __currentInterval: null,

      /**
       * Reset and start the timer.
       */
      start: function start() {
        this.__timer.setInterval(this.getFirstInterval());
        this.__timer.start();
      },

      /**
       * Stop the timer
       */
      stop: function stop() {
        this.__timer.stop();
        this.__currentInterval = null;
      },

      /**
       * Interval event handler
       */
      _onInterval: function _onInterval() {
        this.__timer.stop();

        if (this.__currentInterval == null) {
          this.__currentInterval = this.getInterval();
        }

        this.__currentInterval = Math.max(this.getMinimum(), this.__currentInterval - this.getDecrease());

        this.__timer.setInterval(this.__currentInterval);
        this.__timer.start();

        this.fireEvent("interval");
      }
    },

    destruct: function destruct() {
      this._disposeObjects("__timer");
    }
  });
  qx.event.AcceleratingTimer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AcceleratingTimer.js.map?dt=1555325110560