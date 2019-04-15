(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {},
      "qx.lang.Object": {},
      "qx.ui.core.queue.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.core.queue.Widget", {
    statics: {
      /** @type {Array} This contains all the queued widgets for the next flush. */
      __queue: [],

      /**
       * @type {Object} This contains a map of widgets hash ($$hash) and their
       * corresponding map of jobs.
       */
      __jobs: {},

      /**
       * Clears given job of a widget from the internal queue. If no jobs left, the
       * widget will be removed completely from queue. If job param is <code>null</code>
       * or <code>undefined</code> widget will be removed completely from queue.
       * Normally only used during interims disposes of one or a few widgets.
       *
       * @param widget {qx.ui.core.Widget} The widget to clear
       * @param job {String?} Job identifier. If not used, it will be converted to
       * "$$default".
       */
      remove: function remove(widget, job) {
        var queue = this.__queue;

        if (!queue.includes(widget)) {
          return;
        }

        var hash = widget.$$hash;

        // remove widget and all corresponding jobs, if job param is not given.
        if (job == null) {
          qx.lang.Array.remove(queue, widget);
          delete this.__jobs[hash];
          return;
        }

        if (this.__jobs[hash]) {
          delete this.__jobs[hash][job];

          if (qx.lang.Object.getLength(this.__jobs[hash]) == 0) {
            qx.lang.Array.remove(queue, widget);
          }
        }
      },

      /**
       * Adds a widget to the queue. The second param can be used to identify
       * several jobs. You can add one job at once, which will be returned as
       * an map at flushing on method {@link qx.ui.core.Widget#syncWidget}.
       *
       * @param widget {qx.ui.core.Widget} The widget to add.
       * @param job {String?} Job identifier. If not used, it will be converted to
       * "$$default".
       */
      add: function add(widget, job) {
        var queue = this.__queue;
        //add widget if not containing
        if (!queue.includes(widget)) {
          queue.unshift(widget);
        }

        //add job
        if (job == null) {
          job = "$$default";
        }
        var hash = widget.$$hash;
        if (!this.__jobs[hash]) {
          this.__jobs[hash] = {};
        }
        this.__jobs[hash][job] = true;

        qx.ui.core.queue.Manager.scheduleFlush("widget");
      },

      /**
       * Flushes the widget queue.
       *
       * This is used exclusively by the {@link qx.ui.core.queue.Manager}.
       */
      flush: function flush() {
        // Process all registered widgets
        var queue = this.__queue;
        var obj, jobs;
        for (var i = queue.length - 1; i >= 0; i--) {
          // Order is important to allow the same widget to be requeued directly
          obj = queue[i];
          jobs = this.__jobs[obj.$$hash];

          queue.splice(i, 1);
          obj.syncWidget(jobs);
        }

        // Empty check
        if (queue.length != 0) {
          return;
        }

        // Recreate the array is cheaper compared to keep a sparse array over time
        this.__queue = [];
        this.__jobs = {};
      }
    }
  });
  qx.ui.core.queue.Widget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Widget.js.map?dt=1555325117997