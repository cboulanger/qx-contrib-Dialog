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
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.layout.Grow", {
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
        this.assert(false, "The property '" + name + "' is not supported by the Grow layout!");
      },

      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();
        var child, size, width, height;

        // Render children
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();

          width = availWidth;
          if (width < size.minWidth) {
            width = size.minWidth;
          } else if (width > size.maxWidth) {
            width = size.maxWidth;
          }

          height = availHeight;
          if (height < size.minHeight) {
            height = size.minHeight;
          } else if (height > size.maxHeight) {
            height = size.maxHeight;
          }

          child.renderLayout(padding.left, padding.top, width, height);
        }
      },

      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();
        var child, size;
        var neededWidth = 0,
            neededHeight = 0;
        var minWidth = 0,
            minHeight = 0;
        var maxWidth = Infinity,
            maxHeight = Infinity;

        // Iterate over children
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();

          neededWidth = Math.max(neededWidth, size.width);
          neededHeight = Math.max(neededHeight, size.height);

          minWidth = Math.max(minWidth, size.minWidth);
          minHeight = Math.max(minHeight, size.minHeight);

          maxWidth = Math.min(maxWidth, size.maxWidth);
          maxHeight = Math.min(maxHeight, size.maxHeight);
        }

        // Return hint
        return {
          width: neededWidth,
          height: neededHeight,

          minWidth: minWidth,
          minHeight: minHeight,

          maxWidth: maxWidth,
          maxHeight: maxHeight
        };
      }
    }
  });
  qx.ui.layout.Grow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Grow.js.map?dt=1555325120960