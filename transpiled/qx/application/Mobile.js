(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.core.Init": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.application.IApplication": {
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.bom.client.Scroll": {},
      "qx.application.Routing": {},
      "qx.ui.mobile.core.Root": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.application.Mobile", {
    extend: qx.core.Object,
    implement: [qx.application.IApplication],
    include: qx.locale.MTranslation,

    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fired when the lifecycle method {@link #start} of any {@link qx.ui.mobile.page.Page page} is called */
      "start": "qx.event.type.Event",

      /** Fired when the lifecycle method {@link #stop} of any {@link qx.ui.mobile.page.Page page} is called */
      "stop": "qx.event.type.Event",

      /**
       * Fired when the method {@link qx.ui.mobile.page.Page#back} is called. It is possible to prevent
       * the <code>back</code> event on {@link qx.ui.mobile.page.Page} by calling the
       * {@link qx.event.type.Event#preventDefault}. Data indicating whether the action
       * was triggered by a key event or not.
       */
      "back": "qx.event.type.Data",

      /** Fired when a {@link qx.ui.mobile.dialog.Popup popup} appears on screen. */
      "popup": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __root: null,
      __routing: null,

      // interface method
      main: function main() {
        this.__root = this._createRootWidget();

        if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
          this.__root.setShowScrollbarY(false);
        }
      },

      /**
       * Returns the application's root widget.
       *
       * @return {qx.ui.mobile.core.Widget} The application's root widget.
       */
      getRoot: function getRoot() {
        return this.__root;
      },

      /**
       * Returns the application's routing.
       *
       * @return {qx.application.Routing} The application's routing.
       */
      getRouting: function getRouting() {
        if (!this.__routing) {
          this.__routing = new qx.application.Routing();
        }
        return this.__routing;
      },

      /**
       * Creates the application's root widget. Override this function to create
       * your own root widget.
       *
       * @return {qx.ui.mobile.core.Widget} The application's root widget.
       */
      _createRootWidget: function _createRootWidget() {
        return new qx.ui.mobile.core.Root();
      },

      // interface method
      finalize: function finalize() {
        // empty
      },

      // interface method
      close: function close() {
        // empty
      },

      // interface method
      terminate: function terminate() {
        // empty
      }
    }
  });
  qx.application.Mobile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mobile.js.map?dt=1555325104214