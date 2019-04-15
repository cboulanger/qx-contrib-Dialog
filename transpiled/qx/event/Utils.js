(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.event.Utils", {
    extend: qx.core.Object,

    statics: {
      ABORT: "[[ qx.event.Utils.ABORT ]]",

      /**
       * Evaluates a value, and adds it to the tracker
       *
       * @param tracker {Object} the tracker object
       * @param fn {Function|Object?} if a function, it's evaluated as a `then`, otherwise
       *  it's encapulated in a function for `then`
       * @return {qx.Promise|Object?}
       */
      track: function track(tracker, fn) {
        if (typeof fn !== "function" && !(fn instanceof qx.Promise)) {
          fn = function (value) {
            return function () {
              return value;
            };
          }(fn);
        }
        return this.then(tracker, fn);
      },

      /**
       * Helper method to store a promise in a tracker
       *
       * @param tracker {Object} the tracker object
       * @param newPromise {qx.Promise} the new promise
       * @return {qx.Promise} the new promise
       */
      __push: function __push(tracker, newPromise) {
        {
          if (tracker.promises === undefined) {
            tracker.promises = [];
          }
          var ex = null;
          try {
            throw new Error("");
          } catch (e) {
            ex = e;
          }
          tracker.promises.push({ promise: newPromise, ex: ex });
        }
        tracker.promise = newPromise;
        return tracker.promise;
      },

      /**
       * Equivalent of `promise.then()`
       *
       * @param tracker {Object} the tracker object
       * @param fn {Function} the function to call when previous promises are complete
       * @return {qx.Promise?} the new promise, or the return value from `fn` if no promises are in use
       */
      then: function then(tracker, fn) {
        if (tracker.rejected) {
          return null;
        }
        if (tracker.promise) {
          if (fn instanceof qx.Promise) {
            this.__push(tracker, tracker.promise.then(fn));
          } else {
            var self = this;
            this.__push(tracker, tracker.promise.then(function (result) {
              if (tracker.rejected) {
                return null;
              }
              result = fn(result);
              if (result === qx.event.Utils.ABORT) {
                return self.reject(tracker);
              }
              return result;
            }));
          }
          this.__addCatcher(tracker);
          return tracker.promise;
        }
        if (fn instanceof qx.Promise) {
          return this.__thenPromise(tracker, fn);
        }
        var result = fn(tracker.result);
        if (result instanceof qx.Promise) {
          return this.__thenPromise(tracker, result);
        }
        tracker.result = result;
        if (result === qx.event.Utils.ABORT) {
          return this.reject(tracker);
        }

        return result;
      },

      /**
       * Helper method to append a promise after the current one
       *
       * @param tracker {Object} the tracker object
       * @param newPromise {qx.Promise} the new promise
       * @return {qx.Promise} the new promise
       */
      __thenPromise: function __thenPromise(tracker, newPromise) {
        if (tracker.promise) {
          this.__push(tracker, tracker.promise.then(function () {
            return newPromise;
          }));
        } else {
          this.__push(tracker, newPromise);
        }
        this.__addCatcher(tracker);
        return tracker.promise;
      },

      /**
       * Rejects the tracker, aborting the promise if there is one.  The caller should stop
       * immediately because if promises are not in use and exception is not thrown.
       *
       * @param tracker {Object} the tracker object
       * @return {qx.Promise?} the last promise or the value returned by the catcher
       */
      reject: function reject(tracker) {
        if (tracker.rejected) {
          return qx.event.Utils.ABORT;
        }
        tracker.rejected = true;

        if (tracker.promise) {
          throw new Error("Rejecting Event");
        }
        var result = this.__catcher(tracker);
        return result === undefined ? this.ABORT : result;
      },

      /**
       * Helper method that adds a catcher to the tracker
       *
       * @param tracker {Object} the tracker object
       */
      __addCatcher: function __addCatcher(tracker) {
        if (tracker.promise && tracker.catch) {
          if (!tracker.promise["qx.event.Utils.hasCatcher"]) {
            this.__push(tracker, tracker.promise.catch(this.__catcher.bind(this, tracker)));
            tracker.promise["qx.event.Utils.hasCatcher"] = true;
          }
        }
      },

      /**
       * This method is added with `.catch` to every promise created; because this is added
       * all the way up the promise chain to ensure that it catches everything, this method
       * supresses multiple invocations (i.e. ignores everything except the first)
       *
       * @param tracker {Object} the tracker object
       */
      __catcher: function __catcher(tracker, err) {
        var fn = tracker.catch;
        if (fn) {
          tracker.catch = null;
          tracker.rejected = true;
          return fn(err);
        }
        return qx.event.Utils.ABORT;
      },

      /**
       * Equivalent to `.catch()`; note that unlike promises, this method must be called *before*
       * `.then()` so that it is able to handle rejections when promises are not in use; this is
       * because `Promise.catch` only catches rejections from previous promises, but because promises
       * are *always* asynchronous the `.catch` goes at the end.  For synchronous, this is nt possible
       * so `Utils.catch` must go before `Utils.then`
       *
       * @param tracker {Object} the tracker object
       * @param fn {Function} the function to call
       */
      "catch": function _catch(tracker, fn) {
        if (tracker.rejected) {
          fn();
          return;
        }

        if (tracker.catchers === undefined) {
          tracker.catchers = [fn];
        } else {
          tracker.catchers.push(fn);
        }

        if (tracker.catch) {
          tracker.catch = function (catch1, catch2) {
            return function () {
              catch1();
              catch2();
            };
          }(tracker.catch, fn);
        } else {
          tracker.catch = fn;
        }
        this.__addCatcher(tracker);
      },

      /**
       * Calls a listener, converting propagationStopped into a rejection
       *
       * @param tracker {Object} the tracker object
       * @param listener {Function} the event handler
       * @param context {Object?} the `this` for the event handler
       * @param event {Event} the event being fired
       * @returns {qx.Promise|?} the result of the handler
       */
      callListener: function callListener(tracker, listener, context, event) {
        if (tracker.rejected) {
          return qx.event.Utils.ABORT;
        }
        var tmp = listener.handler.call(context, event);
        if (event.getPropagationStopped()) {
          return qx.event.Utils.ABORT;
        }
        return tmp;
      },

      /**
       * Provides a handy way to iterate over an array which at any point could
       * become asynchronous
       *
       * @param arr {Array} an array to interate over
       * @param fn {Function?} the function to call, with parameters (item, index)
       * @param ignoreAbort {Boolean?} whether to ignore the "ABORT" return value
       * @return {qx.Promise|Object?}
       */
      series: function series(arr, fn, ignoreAbort) {
        var tracker = {};
        for (var index = 0; index < arr.length; index++) {
          var result = fn(arr[index], index);
          if (result instanceof qx.Promise) {
            for (++index; index < arr.length; index++) {
              (function (item, index) {
                result = result.then(function () {
                  var tmp = fn(item, index);
                  if (!ignoreAbort && tmp === qx.event.Utils.ABORT) {
                    throw new Error("Rejecting in series()");
                  }
                  return tmp;
                });
              })(arr[index], index);
            }
            return result;
          }

          if (!ignoreAbort && result === qx.event.Utils.ABORT) {
            return this.reject(tracker);
          }
        }

        return null;
      }
    }
  });
  qx.event.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1555325110838