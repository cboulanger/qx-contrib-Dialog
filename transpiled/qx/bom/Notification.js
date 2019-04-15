(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
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
      "qx.locale.Manager": {},
      "qx.util.ResourceManager": {},
      "qx.util.AliasManager": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {},
      "qx.event.Timer": {}
    },
    "environment": {
      "provided": ["html.notification"],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.bom.Notification", {

    extend: qx.core.Object,
    type: "singleton",

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {

      /**
       * Whether the client supports the desktop notification API.
       *
       * @internal
       * @return {Boolean} <code>true</code> if notification API is supported
       */
      getNotification: function getNotification() {
        return window.Notification !== undefined;
      }

    },

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * This is a singleton. Use <code>getInstance()</code> to get an instance.
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__notifications = {};
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {

      /**
       * Event fired when a notification with data <code>tag</code> appeared.
       */
      "appear": "Data",

      /**
       * Event fired when a notification with data <code>tag</code> has been
       * clicked by the user.
       */
      "click": "Data",

      /**
       * Event fired when a notification with data <code>tag</code> has been
       * closed. This may happen either interactively or due to a timeout
       * defined by the instance displaying the notification.
       */
      "close": "Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __notifications: null,
      __lastId: 0,

      /**
       * Display a desktop notification using a _title_, _message_ and _icon_.
       *
       * @param title {String} The notification title
       * @param message {String} The message body
       * @param icon {String} Resource string or icon URL
       * @param expire {Number} Number of milliseconds after the message is
       *                     automatically destroyed. Leave empty for no
       *                     timeout. Note that some notification systems
       *                     tend to remove timeout-less messages after some
       *                     time.
       * @param tag {String} Multiple messages with the same tag replace each
       *                     other. Leave blank for automatic tag handling.
       * @return {String} Notification tag
       */
      show: function show(title, message, icon, expire, tag) {
        if (qx.bom.Notification.getNotification()) {

          // Generate unique tag to be able to identify the
          // notification later on.
          if (tag !== undefined) {
            tag = "id" + this.__lastId++;
          }

          // If we've the permission already, just send it
          if (Notification.permission == "granted") {
            this._show(tag, title, message, icon, expire);

            // We've not asked for permission yet. Lets do it.
          } else if (Notification.permission != "denied") {

            var that = this;
            Notification.requestPermission(function (permission) {
              if (Notification.permission === undefined) {
                Notification.permission = permission;
              }

              if (permission == "granted") {
                that._show(tag, title, message, icon, expire);
              }
            });
          }
        }

        return tag === undefined ? null : tag;
      },

      /**
       * Display a desktop notification using a _title_, _message_ and _icon_.
       *
       * @internal
       * @param tag {String} Notification tag
       * @param title {String} The notification title
       * @param message {String} The message body
       * @param icon {String} Resource string or icon URL
       * @param expire {Unsigned} Number of milliseconds after the message is
       *                     automatically destroyed. Leave empty for no
       *                     timeout. Note that some notification systems
       *                     tend to remove timeout-less messages after some
       *                     time.
       */
      _show: function _show(tag, title, message, icon, expire) {
        var lang = qx.locale.Manager.getInstance().getLocale().replace(/_.*$/, "");

        // Resolve icon path if needed and possible
        if (icon) {
          var rm = qx.util.ResourceManager.getInstance();
          var source = qx.util.AliasManager.getInstance().resolve(icon);
          if (rm.has(source)) {
            icon = rm.toUri(source);
          }

          // old versions of firefox did not display the notification if
          // an icon was specified, so we disable the icon for firefox
          // < version 46
          if (qx.core.Environment.get("engine.name") == "gecko" && qx.core.Environment.get("browser.version") < 46) {
            icon = undefined;
          }
        }

        var notification = new Notification(title, {
          body: message,
          tag: tag,
          icon: icon,
          lang: lang
        });
        var that = this;
        notification.onshow = function () {
          that.__notifications[tag] = notification;
          that.fireDataEvent("appear", tag);
        };
        notification.onclose = function () {
          that.fireDataEvent("close", tag);
          if (that.__notifications[tag]) {
            that.__notifications[tag] = null;
            delete that.__notifications[tag];
          }
        };
        notification.onclick = function () {
          that.fireDataEvent("click", tag);
          if (that.__notifications[tag]) {
            that.__notifications[tag] = null;
            delete that.__notifications[tag];
          }
        };
        notification.onerror = function () {
          that.fireDataEvent("error", tag);
          if (that.__notifications[tag]) {
            that.__notifications[tag] = null;
            delete that.__notifications[tag];
          }
        };

        // Install expire timer if exists
        if (expire) {
          qx.event.Timer.once(function () {
            notification.close();
          }, this, expire);
        }
      },

      /**
       * Actively close an active notification.
       *
       * @param tag {String} Notification tag
       */
      close: function close(tag) {
        if (this.__notifications[tag]) {
          this.__notifications[tag].close();
        }
      },

      /**
       * Tell the browser to request permission to display notifications.
       *
       * **Note:**
       *
       * This needs to be called from within an interactive event handler.
       */
      request: function request() {
        if (qx.bom.Notification.getNotification()) {
          Notification.requestPermission(function (permission) {
            if (Notification.permission === undefined) {
              Notification.permission = permission;
            }
          });
        }
      },

      /**
       * Check if we've the permission to send notifications.
       *
       * @return {String} Returns either "default", "denied" or "granted". "default"
       *                  indicates that we need to call <code>request()</code>  before
       *                  a notification can be sent.
       */
      getPermission: function getPermission() {
        return qx.bom.Notification.getNotification() ? Notification.permission : "denied";
      }

    },

    defer: function defer(statics) {
      qx.core.Environment.add("html.notification", statics.getNotification);
    }
  });
  qx.bom.Notification.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Notification.js.map?dt=1555325104936