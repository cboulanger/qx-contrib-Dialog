(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.html.Root", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Creates a root element
     *
     * @param elem {Element?null} DOM element to use
     */
    construct: function construct(elem) {
      qx.html.Element.constructor.call(this);

      if (elem != null) {
        this.useElement(elem);
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Sets the element to an already existing node. It will be
       * assumed that this DOM element is already visible e.g.
       * like a normal displayed element in the document's body.
       *
       * @param elem {Element} the dom element to set
       * @throws {Error} if the element is assigned again
       */
      useElement: function useElement(elem) {
        // Base call
        qx.html.Root.prototype.useElement.base.call(this, elem);

        // Mark as root
        this.setRoot(true);

        // Register for synchronization
        qx.html.Element._modified[this.$$hash] = this;
      }
    }
  });
  qx.html.Root.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Root.js.map?dt=1555325112825