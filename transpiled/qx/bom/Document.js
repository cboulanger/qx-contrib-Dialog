(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.Viewport": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.Document", {
    statics: {
      /**
       * Whether the document is in quirks mode (e.g. non XHTML, HTML4 Strict or missing doctype)
       *
       * @signature function(win)
       * @param win {Window?window} The window to query
       * @return {Boolean} true when containing document is in quirks mode
       */
      isQuirksMode: qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(win) {
          if (qx.core.Environment.get("engine.version") >= 8) {
            return (win || window).document.documentMode === 5;
          } else {
            return (win || window).document.compatMode !== "CSS1Compat";
          }
        },

        "webkit": function webkit(win) {
          if (document.compatMode === undefined) {
            var el = (win || window).document.createElement("div");
            el.style.cssText = "position:absolute;width:0;height:0;width:1";
            return el.style.width === "1px" ? true : false;
          } else {
            return (win || window).document.compatMode !== "CSS1Compat";
          }
        },

        "default": function _default(win) {
          return (win || window).document.compatMode !== "CSS1Compat";
        }
      }),

      /**
       * Whether the document is in standard mode (e.g. XHTML, HTML4 Strict or doctype defined)
       *
       * @param win {Window?window} The window to query
       * @return {Boolean} true when containing document is in standard mode
       */
      isStandardMode: function isStandardMode(win) {
        return !this.isQuirksMode(win);
      },

      /**
       * Returns the width of the document.
       *
       * Internet Explorer in standard mode stores the proprietary <code>scrollWidth</code> property
       * on the <code>documentElement</code>, but in quirks mode on the body element. All
       * other known browsers simply store the correct value on the <code>documentElement</code>.
       *
       * If the viewport is wider than the document the viewport width is returned.
       *
       * As the html element has no visual appearance it also can not scroll. This
       * means that we must use the body <code>scrollWidth</code> in all non mshtml clients.
       *
       * Verified to correctly work with:
       *
       * * Mozilla Firefox 2.0.0.4
       * * Opera 9.2.1
       * * Safari 3.0 beta (3.0.2)
       * * Internet Explorer 7.0
       *
       * @param win {Window?window} The window to query
       * @return {Integer} The width of the actual document (which includes the body and its margin).
       *
       * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
       * if an element use negative value for top and left to be outside the viewport!
       * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
       */
      getWidth: function getWidth(win) {
        var doc = (win || window).document;
        var view = qx.bom.Viewport.getWidth(win);
        var scroll = this.isStandardMode(win) ? doc.documentElement.scrollWidth : doc.body.scrollWidth;
        return Math.max(scroll, view);
      },

      /**
       * Returns the height of the document.
       *
       * Internet Explorer in standard mode stores the proprietary <code>scrollHeight</code> property
       * on the <code>documentElement</code>, but in quirks mode on the body element. All
       * other known browsers simply store the correct value on the <code>documentElement</code>.
       *
       * If the viewport is higher than the document the viewport height is returned.
       *
       * As the html element has no visual appearance it also can not scroll. This
       * means that we must use the body <code>scrollHeight</code> in all non mshtml clients.
       *
       * Verified to correctly work with:
       *
       * * Mozilla Firefox 2.0.0.4
       * * Opera 9.2.1
       * * Safari 3.0 beta (3.0.2)
       * * Internet Explorer 7.0
       *
       * @param win {Window?window} The window to query
       * @return {Integer} The height of the actual document (which includes the body and its margin).
       *
       * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
       * if an element use negative value for top and left to be outside the viewport!
       * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
       */
      getHeight: function getHeight(win) {
        var doc = (win || window).document;
        var view = qx.bom.Viewport.getHeight(win);
        var scroll = this.isStandardMode(win) ? doc.documentElement.scrollHeight : doc.body.scrollHeight;
        return Math.max(scroll, view);
      }
    }
  });
  qx.bom.Document.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Document.js.map?dt=1555325104361