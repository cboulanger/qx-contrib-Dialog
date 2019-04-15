(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.MContentPadding": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.container.Scroll", {
    extend: qx.ui.core.scroll.AbstractScrollArea,
    include: [qx.ui.core.MContentPadding],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param content {qx.ui.core.LayoutItem?null} The content widget of the scroll
     *    container.
     */
    construct: function construct(content) {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this);

      if (content) {
        this.add(content);
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Sets the content of the scroll container. Scroll containers
       * may only have one child, so it always replaces the current
       * child with the given one.
       *
       * @param widget {qx.ui.core.Widget} Widget to insert
       */
      add: function add(widget) {
        this.getChildControl("pane").add(widget);
      },

      /**
       * Returns the content of the scroll area.
       *
       * @param widget {qx.ui.core.Widget} Widget to remove
       */
      remove: function remove(widget) {
        this.getChildControl("pane").remove(widget);
      },

      /**
       * Returns the content of the scroll container.
       *
       * Scroll containers may only have one child. This
       * method returns an array containing the child or an empty array.
       *
       * @return {Object[]} The child array
       */
      getChildren: function getChildren() {
        return this.getChildControl("pane").getChildren();
      },

      /**
       * Returns the element, to which the content padding should be applied.
       *
       * @return {qx.ui.core.Widget} The content padding target.
       */
      _getContentPaddingTarget: function _getContentPaddingTarget() {
        return this.getChildControl("pane");
      }
    }
  });
  qx.ui.container.Scroll.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Scroll.js.map?dt=1555325116704