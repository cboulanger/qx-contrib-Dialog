(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.RingBuffer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.log.appender.RingBuffer", {
    extend: qx.util.RingBuffer,

    /**
     * @param maxMessages {Integer?50} Maximum number of messages in the buffer
     */
    construct: function construct(maxMessages) {
      this.setMaxMessages(maxMessages || 50);
    },

    members: {

      /**
       * Set the maximum number of messages to hold. If null the number of
       * messages is not limited.
       *
       * Warning: Changing this property will clear the events logged so far.
       *
       * @param maxMessages {Integer} the maximum number of messages to hold
       */
      setMaxMessages: function setMaxMessages(maxMessages) {
        this.setMaxEntries(maxMessages);
      },

      /**
       * Get the maximum number of messages to hold
       *
       * @return {Integer} the maximum number of messages
       */
      getMaxMessages: function getMaxMessages() {
        return this.getMaxEntries();
      },

      /**
       * Processes a single log entry
       *
       * @param entry {Map} The entry to process
       */
      process: function process(entry) {
        this.addEntry(entry);
      },

      /**
       * Returns all stored log events
       *
       * @return {Array} array of stored log events
       */
      getAllLogEvents: function getAllLogEvents() {
        return this.getAllEntries();
      },

      /**
       * Returns log events which have been logged previously.
       *
       * @param count {Integer} The number of events to retrieve. If there are
       *    more events than the given count, the oldest ones will not be returned.
       *
       * @param startingFromMark {Boolean ? false} If true, only entries since the last call to mark()
       *                                           will be returned
       * @return {Array} array of stored log events
       */
      retrieveLogEvents: function retrieveLogEvents(count, startingFromMark) {
        return this.getEntries(count, startingFromMark);
      },

      /**
       * Clears the log history
       */
      clearHistory: function clearHistory() {
        this.clear();
      }
    }
  });
  qx.log.appender.RingBuffer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RingBuffer.js.map?dt=1555325114474