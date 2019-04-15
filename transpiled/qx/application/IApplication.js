(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.application.IApplication", {
    members: {
      /**
       * Called when the application relevant classes are loaded and ready.
       *
       */
      main: function main() {},

      /**
       * Called when the application's main method was executed to handle
       * "final" tasks like rendering or retrieving data.
       *
       */
      finalize: function finalize() {},

      /**
       * Called in the document.beforeunload event of the browser. If the method
       * returns a string value, the user will be asked by the browser, whether
       * he really wants to leave the page. The return string will be displayed in
       * the message box.
       *
       * @return {String?null} message text on unloading the page
       */
      close: function close() {},

      /**
       * This method contains the last code which is run inside the page and may contain cleanup code.
       *
       */
      terminate: function terminate() {}
    }
  });
  qx.application.IApplication.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IApplication.js.map?dt=1555325104189