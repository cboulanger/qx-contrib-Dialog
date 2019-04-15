(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.layout.Basic", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        LAYOUT INTERFACE
      ---------------------------------------------------------------------------
      */

      // overridden
      verifyLayoutProperty: function verifyLayoutProperty(item, name, value) {
        this.assert(name == "left" || name == "top", "The property '" + name + "' is not supported by the Basic layout!");
        this.assertInteger(value);
      },

      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();
        var child, size, props, left, top;

        // Render children
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();
          props = child.getLayoutProperties();

          left = padding.left + (props.left || 0) + child.getMarginLeft();
          top = padding.top + (props.top || 0) + child.getMarginTop();

          child.renderLayout(left, top, size.width, size.height);
        }
      },

      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();
        var child, size, props;
        var neededWidth = 0,
            neededHeight = 0;
        var localWidth, localHeight;

        // Iterate over children
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();
          props = child.getLayoutProperties();

          localWidth = size.width + (props.left || 0) + child.getMarginLeft() + child.getMarginRight();
          localHeight = size.height + (props.top || 0) + child.getMarginTop() + child.getMarginBottom();

          if (localWidth > neededWidth) {
            neededWidth = localWidth;
          }

          if (localHeight > neededHeight) {
            neededHeight = localHeight;
          }
        }

        // Return hint
        return {
          width: neededWidth,
          height: neededHeight
        };
      }
    }
  });
  qx.ui.layout.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1555325120423