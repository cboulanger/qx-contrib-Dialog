(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.event.IEventDispatcher", {
    members: {
      /**
       * Whether the dispatcher is responsible for the this event.
       *
       * @param target {Element|Event} The event dispatch target
       * @param event {qx.event.type.Event} The event object
       * @param type {String} the event type
       * @return {Boolean} Whether the event dispatcher is responsible for the this event
       */
      canDispatchEvent: function canDispatchEvent(target, event, type) {
        this.assertInstance(event, qx.event.type.Event);
        this.assertString(type);
      },

      /**
       * This function dispatches the event to the event listeners.
       *
       * @param target {Element|Event} The event dispatch target
       * @param event {qx.event.type.Event} event object to dispatch
       * @param type {String} the event type
       * @return {qx.Promise?} a promise, if one or more of the event handlers returned a promise
       */
      dispatchEvent: function dispatchEvent(target, event, type) {
        this.assertInstance(event, qx.event.type.Event);
        this.assertString(type);
      }
    }
  });
  qx.event.IEventDispatcher.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IEventDispatcher.js.map?dt=1555325110609