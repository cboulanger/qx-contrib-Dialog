(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "qx.html.Canvas": {},
      "qx.event.type.Data": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.embed.Canvas", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param canvasWidth {Integer} The internal with of the canvas coordinates.
     * @param canvasHeight {Integer} The internal height of the canvas coordinates.
     */
    construct: function construct(canvasWidth, canvasHeight) {
      qx.ui.core.Widget.constructor.call(this);

      this.__deferredDraw = new qx.util.DeferredCall(this.__redraw, this);
      this.addListener("resize", this._onResize, this);

      if (canvasWidth !== undefined) {
        this.setCanvasWidth(canvasWidth);
      }

      if (canvasHeight !== undefined) {
        this.setCanvasHeight(canvasHeight);
      }
    },

    /*
     *****************************************************************************
        EVENTS
     *****************************************************************************
     */

    events: {
      /**
       * The redraw event is fired each time the canvas dimension change and the
       * canvas needs to be updated. The data field contains a map containing the
       * <code>width</code> and <code>height</code> of the canvas and the
       * rendering <code>context</code>.
       */
      "redraw": "qx.event.type.Data"
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */

    properties: {
      /** Whether canvas and widget coordinates should be synchronized */
      syncDimension: {
        check: "Boolean",
        init: false
      },

      /** The internal with of the canvas coordinates */
      canvasWidth: {
        check: "Integer",
        init: 300,
        apply: "_applyCanvasWidth"
      },

      /** The internal height of the canvas coordinates */
      canvasHeight: {
        check: "Integer",
        init: 150,
        apply: "_applyCanvasHeight"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /** @type {qx.util.DeferredCall} */
      __deferredDraw: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */

      // overridden
      _createContentElement: function _createContentElement() {
        return new qx.html.Canvas();
      },

      /**
       * This methods triggers the redraw of the canvas' content
       */
      __redraw: function __redraw() {
        var canvas = this.getContentElement();
        var height = canvas.getHeight();
        var width = canvas.getWidth();
        var context = canvas.getContext2d();

        this._draw(width, height, context);
        this.fireNonBubblingEvent("redraw", qx.event.type.Data, [{
          width: width,
          height: height,
          context: context
        }]);
      },

      // property apply
      _applyCanvasWidth: function _applyCanvasWidth(value, old) {
        this.getContentElement().setWidth(value);
        this.__deferredDraw.schedule();
      },

      // property apply
      _applyCanvasHeight: function _applyCanvasHeight(value, old) {
        this.getContentElement().setHeight(value);
        this.__deferredDraw.schedule();
      },

      /**
       * Redraw the canvas
       */
      update: function update() {
        this.__deferredDraw.schedule();
      },

      /**
       * Widget resize event handler. Updates the canvas dimension if needed.
       *
       * @param e {qx.event.type.Data} The resize event object
       */
      _onResize: function _onResize(e) {
        var data = e.getData();

        if (this.getSyncDimension()) {
          this.setCanvasHeight(data.height);
          this.setCanvasWidth(data.width);
        }
      },

      /**
       * Get the native canvas 2D rendering context
       * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvasrenderingcontext2d">W3C-HTML5</a>].
       * All drawing operations are performed on this context.
       *
       * @return {CanvasRenderingContext2D} The 2D rendering context.
       */
      getContext2d: function getContext2d() {
        return this.getContentElement().getContext2d();
      },

      /**
       * Template method, which can be used by derived classes to redraw the
       * content. It is called each time the canvas dimension change and the
       * canvas needs to be updated.
       *
       * @param width {Integer} New canvas width
       * @param height {Integer} New canvas height
       * @param context {CanvasRenderingContext2D} The rendering context to draw to
       */
      _draw: function _draw(width, height, context) {}
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this._disposeObjects("__deferredDraw");
    }
  });
  qx.ui.embed.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1555325118671