(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.embed.Canvas", {
    extend: qx.ui.mobile.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     */
    construct: function construct() {
      qx.ui.mobile.core.Widget.constructor.call(this);
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "canvas";
      },

      /**
       * Get the canvas element [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvas">W3C-HMTL5</a>]
       *
       * @return {Element} The canvas DOM element.
       */
      getCanvas: function getCanvas() {
        return this.getContainerElement();
      },

      /**
       * Set the width attribute of the canvas element. This property controls the
       * size of the canvas coordinate space.
       *
       * @param width {Integer} canvas width
       */
      setWidth: function setWidth(width) {
        this.getContainerElement().width = width;
      },

      /**
       * Get the width attribute of the canvas element
       *
       * @return {Integer} canvas width
       */
      getWidth: function getWidth() {
        return this.getContainerElement().width;
      },

      /**
       * Set the height attribute of the canvas element. This property controls the
       * size of the canvas coordinate space.
       *
       * @param height {Integer} canvas height
       */
      setHeight: function setHeight(height) {
        this.getContainerElement().height = height;
      },

      /**
       * Get the height attribute of the canvas element
       *
       * @return {Integer} canvas height
       */
      getHeight: function getHeight() {
        return this.getContainerElement().height;
      },

      /**
       * Get the canvas' 2D rendering context
       * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvasrenderingcontext2d">W3C-HTML5</a>].
       * All drawing operations are performed on this context.
       *
       * @return {CanvasRenderingContext2D} The 2D rendering context.
       */
      getContext2d: function getContext2d() {
        return this.getContainerElement().getContext("2d");
      }
    }
  });
  qx.ui.mobile.embed.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1555325122391