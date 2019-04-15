(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "require": true
      },
      "qx.ui.layout.Util": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.layout.Canvas", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {

      /**
       * If desktop mode is active, the children's minimum sizes are ignored
       * by the layout calculation. This is necessary to prevent the desktop
       * from growing if e.g. a window is moved beyond the edge of the desktop
       */
      desktop: {
        check: "Boolean",
        init: false
      }
    },

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
        var layoutProperties = {
          top: 1,
          left: 1,
          bottom: 1,
          right: 1,
          width: 1,
          height: 1,
          edge: 1
        };

        this.assert(layoutProperties[name] == 1, "The property '" + name + "' is not supported by the Canvas layout!");

        if (name == "width" || name == "height") {
          this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
        } else {
          if (typeof value === "number") {
            this.assertInteger(value);
          } else if (qx.lang.Type.isString(value)) {
            this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
          } else {
            this.fail("Bad format of layout property '" + name + "': " + value + ". The value must be either an integer or an percent string.");
          }
        }
      },

      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();

        var child, size, props;
        var left, top, right, bottom, width, height;
        var marginTop, marginRight, marginBottom, marginLeft;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          size = child.getSizeHint();
          props = child.getLayoutProperties();

          // Cache margins
          marginTop = child.getMarginTop();
          marginRight = child.getMarginRight();
          marginBottom = child.getMarginBottom();
          marginLeft = child.getMarginLeft();

          // **************************************
          //   Processing location
          // **************************************

          left = props.left != null ? props.left : props.edge;
          if (qx.lang.Type.isString(left)) {
            left = Math.round(parseFloat(left) * availWidth / 100);
          }

          right = props.right != null ? props.right : props.edge;
          if (qx.lang.Type.isString(right)) {
            right = Math.round(parseFloat(right) * availWidth / 100);
          }

          top = props.top != null ? props.top : props.edge;
          if (qx.lang.Type.isString(top)) {
            top = Math.round(parseFloat(top) * availHeight / 100);
          }

          bottom = props.bottom != null ? props.bottom : props.edge;
          if (qx.lang.Type.isString(bottom)) {
            bottom = Math.round(parseFloat(bottom) * availHeight / 100);
          }

          // **************************************
          //   Processing dimension
          // **************************************

          // Stretching has higher priority than dimension data
          if (left != null && right != null) {
            width = availWidth - left - right - marginLeft - marginRight;

            // Limit computed value
            if (width < size.minWidth) {
              width = size.minWidth;
            } else if (width > size.maxWidth) {
              width = size.maxWidth;
            }

            // Add margin
            left += marginLeft;
          } else {
            // Layout data has higher priority than data from size hint
            width = props.width;

            if (width == null) {
              width = size.width;
            } else {
              width = Math.round(parseFloat(width) * availWidth / 100);

              // Limit computed value
              if (width < size.minWidth) {
                width = size.minWidth;
              } else if (width > size.maxWidth) {
                width = size.maxWidth;
              }
            }

            if (right != null) {
              left = availWidth - width - right - marginRight - marginLeft;
            } else if (left == null) {
              left = marginLeft;
            } else {
              left += marginLeft;
            }
          }

          // Stretching has higher priority than dimension data
          if (top != null && bottom != null) {
            height = availHeight - top - bottom - marginTop - marginBottom;

            // Limit computed value
            if (height < size.minHeight) {
              height = size.minHeight;
            } else if (height > size.maxHeight) {
              height = size.maxHeight;
            }

            // Add margin
            top += marginTop;
          } else {
            // Layout data has higher priority than data from size hint
            height = props.height;

            if (height == null) {
              height = size.height;
            } else {
              height = Math.round(parseFloat(height) * availHeight / 100);

              // Limit computed value
              if (height < size.minHeight) {
                height = size.minHeight;
              } else if (height > size.maxHeight) {
                height = size.maxHeight;
              }
            }

            if (bottom != null) {
              top = availHeight - height - bottom - marginBottom - marginTop;
            } else if (top == null) {
              top = marginTop;
            } else {
              top += marginTop;
            }
          }

          left += padding.left;
          top += padding.top;

          // Apply layout
          child.renderLayout(left, top, width, height);
        }
      },

      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var neededWidth = 0,
            neededMinWidth = 0;
        var neededHeight = 0,
            neededMinHeight = 0;

        var width, minWidth;
        var height, minHeight;

        var children = this._getLayoutChildren();
        var child, props, hint;
        var desktop = this.isDesktop();

        var left, top, right, bottom;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          props = child.getLayoutProperties();
          hint = child.getSizeHint();

          // Cache margins
          var marginX = child.getMarginLeft() + child.getMarginRight();
          var marginY = child.getMarginTop() + child.getMarginBottom();

          // Compute width
          width = hint.width + marginX;
          minWidth = hint.minWidth + marginX;

          left = props.left != null ? props.left : props.edge;
          if (left && typeof left === "number") {
            width += left;
            minWidth += left;
          }

          right = props.right != null ? props.right : props.edge;
          if (right && typeof right === "number") {
            width += right;
            minWidth += right;
          }

          neededWidth = Math.max(neededWidth, width);
          neededMinWidth = desktop ? 0 : Math.max(neededMinWidth, minWidth);

          // Compute height
          height = hint.height + marginY;
          minHeight = hint.minHeight + marginY;

          top = props.top != null ? props.top : props.edge;
          if (top && typeof top === "number") {
            height += top;
            minHeight += top;
          }

          bottom = props.bottom != null ? props.bottom : props.edge;
          if (bottom && typeof bottom === "number") {
            height += bottom;
            minHeight += bottom;
          }

          neededHeight = Math.max(neededHeight, height);
          neededMinHeight = desktop ? 0 : Math.max(neededMinHeight, minHeight);
        }

        return {
          width: neededWidth,
          minWidth: neededMinWidth,
          height: neededHeight,
          minHeight: neededMinHeight
        };
      }
    }
  });
  qx.ui.layout.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1555325120478