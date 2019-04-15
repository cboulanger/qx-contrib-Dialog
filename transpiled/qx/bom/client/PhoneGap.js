(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Environment": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": ["phonegap", "phonegap.notification"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.client.PhoneGap", {
    statics: {
      /**
       * Checks if PhoneGap/Cordova is available.
       * @return {Boolean} <code>true</code>, if it could be used.
       * @internal
       */
      getPhoneGap: function getPhoneGap() {
        return "cordova" in window || "Cordova" in window || "PhoneGap" in window;
      },

      /**
       * Checks if notifications can be displayed.
       * @return {Boolean} <code>true</code>, if it could be used.
       * @internal
       */
      getNotification: function getNotification() {
        return "notification" in navigator;
      }
    },

    defer: function defer(statics) {
      qx.core.Environment.add("phonegap", statics.getPhoneGap);
      qx.core.Environment.add("phonegap.notification", statics.getNotification);
    }
  });
  qx.bom.client.PhoneGap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PhoneGap.js.map?dt=1555325106319