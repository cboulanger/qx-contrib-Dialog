(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.list.renderer.group.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.basic.Image": {},
      "qx.ui.mobile.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.mobile.list.renderer.group.Default", {
    extend: qx.ui.mobile.list.renderer.group.Abstract,

    construct: function construct(layout) {
      qx.ui.mobile.list.renderer.group.Abstract.constructor.call(this, layout || new qx.ui.mobile.layout.HBox().set({
        alignY: "middle"
      }));
      this._init();
    },

    members: {
      __image: null,
      __title: null,
      __rightContainer: null,

      /**
       * Returns the image widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Image} The image widget
       */
      getImageWidget: function getImageWidget() {
        return this.__image;
      },

      /**
       * Returns the title widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Label} The title widget
       */
      getTitleWidget: function getTitleWidget() {
        return this.__title;
      },

      /**
       * Sets the source of the image widget.
       *
       * @param source {String} The source to set
       */
      setImage: function setImage(source) {
        this.__image.setSource(source);
      },

      /**
       * Sets the value of the title widget.
       *
       * @param title {String} The value to set
       */
      setTitle: function setTitle(title) {
        if (title && title.translate) {
          this.__title.setValue(title.translate());
        } else {
          this.__title.setValue(title);
        }
      },

      /**
       * Setter for the data attribute <code></code>
       * @param groupTitle {String} the title of the group
       */
      setGroup: function setGroup(groupTitle) {
        this._setAttribute("data-group", groupTitle);
      },

      /**
       * Inits the widgets for the renderer.
       *
       */
      _init: function _init() {
        this.__image = this._createImage();
        this.add(this.__image);

        this.__rightContainer = this._createRightContainer();
        this.add(this.__rightContainer, { flex: 1 });

        this.__title = this._createTitle();
        this.__rightContainer.add(this.__title);
      },

      /**
       * Creates and returns the right container composite. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.container.Composite} the right container.
       */
      _createRightContainer: function _createRightContainer() {
        return new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());
      },

      /**
       * Creates and returns the image widget. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.basic.Image} the image widget.
       */
      _createImage: function _createImage() {
        var image = new qx.ui.mobile.basic.Image();
        image.setAnonymous(true);
        image.addCssClass("group-item-image");
        return image;
      },

      /**
       * Creates and returns the title widget. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.basic.Label} the title widget.
       */
      _createTitle: function _createTitle() {
        var title = new qx.ui.mobile.basic.Label();
        title.setWrap(false);
        title.addCssClass("group-item-title");
        return title;
      },

      // overridden
      reset: function reset() {
        this.__image.setSource(null);
        this.__title.setValue("");
      }
    },

    destruct: function destruct() {
      this._disposeObjects("__image", "__title", "__rightContainer");
    }
  });
  qx.ui.mobile.list.renderer.group.Default.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Default.js.map?dt=1555325123216