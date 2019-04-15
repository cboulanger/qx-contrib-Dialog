(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.util.DeferredCallManager": {
        "require": true,
        "construct": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.util.DeferredCall", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param callback {Function} The callback
     * @param context {Object?window} the context in which the function will be called.
     */
    construct: function construct(callback, context) {
      qx.core.Object.constructor.call(this);

      this.__callback = callback;
      this.__context = context || null;
      this.__manager = qx.util.DeferredCallManager.getInstance();
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {

      __callback: null,
      __context: null,
      __manager: null,

      /**
       * Prevent the callback from being called.
       */
      cancel: function cancel() {
        this.__manager.cancel(this);
      },

      /**
       * Issue a deferred call of the callback.
       */
      schedule: function schedule() {
        this.__manager.schedule(this);
      },

      /**
       * Calls the callback directly.
       */
      call: function call() {
        {
          // warn if the context is disposed
          var context = this.__context;
          if (context && context.isDisposed && context.isDisposed()) {
            this.warn("The context object '" + context + "' of the defered call '" + this + "'is already disposed.");
          }
        }

        this.__context ? this.__callback.apply(this.__context) : this.__callback();
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */

    destruct: function destruct() {
      this.cancel();
      this.__context = this.__callback = this.__manager = null;
    }
  });
  qx.util.DeferredCall.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DeferredCall.js.map?dt=1555325128603