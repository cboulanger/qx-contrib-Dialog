(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.IDesktop": {},
      "qx.ui.window.Window": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.window.IWindowManager", {
    members: {
      /**
       * Connect the window manager to the window desktop
       *
       * @param desktop {qx.ui.window.IDesktop|null} The connected desktop or null
       */
      setDesktop: function setDesktop(desktop) {
        if (desktop !== null) {
          this.assertInterface(desktop, qx.ui.window.IDesktop);
        }
      },

      /**
       * Inform the window manager about a new active window
       *
       * @param active {qx.ui.window.Window} new active window
       * @param oldActive {qx.ui.window.Window} old active window
       */
      changeActiveWindow: function changeActiveWindow(active, oldActive) {},

      /**
       * Update the window order and modality blocker
       */
      updateStack: function updateStack() {},

      /**
       * Ask the manager to bring a window to the front.
       *
       * @param win {qx.ui.window.Window} window to bring to front
       */
      bringToFront: function bringToFront(win) {
        this.assertInstance(win, qx.ui.window.Window);
      },

      /**
       * Ask the manager to send a window to the back.
       *
       * @param win {qx.ui.window.Window} window to sent to back
       */
      sendToBack: function sendToBack(win) {
        this.assertInstance(win, qx.ui.window.Window);
      }
    }
  });
  qx.ui.window.IWindowManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IWindowManager.js.map?dt=1555325128162