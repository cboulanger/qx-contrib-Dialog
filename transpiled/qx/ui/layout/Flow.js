(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.LineSizeIterator": {},
      "qx.ui.layout.Util": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.layout.Flow", {
    extend: qx.ui.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param spacingX {Integer?0} The spacing between child widgets {@link #spacingX}.
     * @param spacingY {Integer?0} The spacing between the lines {@link #spacingY}.
     * @param alignX {String?"left"} Horizontal alignment of the whole children
     *     block {@link #alignX}.
     */
    construct: function construct(spacingX, spacingY, alignX) {
      qx.ui.layout.Abstract.constructor.call(this);

      if (spacingX) {
        this.setSpacingX(spacingX);
      }

      if (spacingY) {
        this.setSpacingY(spacingY);
      }

      if (alignX) {
        this.setAlignX(alignX);
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Horizontal alignment of the whole children block. The horizontal
       * alignment of the child is completely ignored in HBoxes (
       * {@link qx.ui.core.LayoutItem#alignX}).
       */
      alignX: {
        check: ["left", "center", "right"],
        init: "left",
        apply: "_applyLayoutChange"
      },

      /**
       * Vertical alignment of each child. Can be overridden through
       * {@link qx.ui.core.LayoutItem#alignY}.
       */
      alignY: {
        check: ["top", "middle", "bottom"],
        init: "top",
        apply: "_applyLayoutChange"
      },

      /** Horizontal spacing between two children */
      spacingX: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /**
       * The vertical spacing between the lines.
       */
      spacingY: {
        check: "Integer",
        init: 0,
        apply: "_applyLayoutChange"
      },

      /** Whether the actual children list should be laid out in reversed order. */
      reversed: {
        check: "Boolean",
        init: false,
        apply: "_applyLayoutChange"
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
        var validProperties = ["lineBreak", "stretch"];
        this.assertInArray(name, validProperties, "The property '" + name + "' is not supported by the flow layout!");
      },

      // overridden
      connectToWidget: function connectToWidget(widget) {
        qx.ui.layout.Flow.prototype.connectToWidget.base.call(this, widget);

        // Necessary to be able to calculate the lines for the flow layout.
        // Otherwise the layout calculates the needed width and height by using
        // only one line of items which is leading to the wrong height. This
        // wrong height does e.g. suppress scrolling since the scroll pane does
        // not know about the correct needed height.
        if (widget) {
          widget.setAllowShrinkY(false);
        }
      },

      /**
       * The FlowLayout tries to add as many Children as possible to the current 'Line'
       * and when it sees that the next Child won't fit, it starts on a new Line, continuing
       * until all the Children have been added.
       * To enable alignX "left", "center", "right" renderLayout has to calculate the positions
       * of all a Line's children before it draws them.
       *
       * @param availWidth {Integer} Final width available for the content (in pixel)
       * @param availHeight {Integer} Final height available for the content (in pixel)
       * @param padding {Map} Map containing the padding values. Keys:
       * <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
       */
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();

        if (this.getReversed()) {
          children = children.concat().reverse();
        }

        var lineCalculator = new qx.ui.layout.LineSizeIterator(children, this.getSpacingX());

        var lineTop = padding.top;
        while (lineCalculator.hasMoreLines()) {
          var line = lineCalculator.computeNextLine(availWidth);
          this.__renderLine(line, lineTop, availWidth, padding);
          lineTop += line.height + this.getSpacingY();
        }
      },

      /**
       * Render a line in the flow layout
       *
       * @param line {Map} A line configuration as returned by
       *    {@link LineSizeIterator#computeNextLine}.
       * @param lineTop {Integer} The line's top position
       * @param availWidth {Integer} The available line width
       * @param padding {Map} Map containing the padding values. Keys:
       * <code>top</code>, <code>bottom</code>, <code>left</code>, <code>right</code>
       */
      __renderLine: function __renderLine(line, lineTop, availWidth, padding) {
        var util = qx.ui.layout.Util;

        var left = padding.left;
        if (this.getAlignX() != "left") {
          left = padding.left + availWidth - line.width;
          if (this.getAlignX() == "center") {
            left = padding.left + Math.round((availWidth - line.width) / 2);
          }
        }

        for (var i = 0; i < line.children.length; i++) {
          var child = line.children[i];
          var size = child.getSizeHint();
          var marginTop = child.getMarginTop();
          var marginBottom = child.getMarginBottom();

          var top = util.computeVerticalAlignOffset(child.getAlignY() || this.getAlignY(), marginTop + size.height + marginBottom, line.height, marginTop, marginBottom);

          var layoutProps = child.getLayoutProperties();
          if (layoutProps.stretch && layoutProps.stretch) {
            size.width += availWidth - line.width;
          }

          child.renderLayout(left + line.gapsBefore[i], lineTop + top, size.width, size.height);

          left += line.gapsBefore[i] + size.width;
        }
      },

      // overridden
      _computeSizeHint: function _computeSizeHint() {
        return this.__computeSize(Infinity);
      },

      // overridden
      hasHeightForWidth: function hasHeightForWidth() {
        return true;
      },

      // overridden
      getHeightForWidth: function getHeightForWidth(width) {
        return this.__computeSize(width).height;
      },

      /**
       * Returns the list of children fitting in the last row of the given width.
       * @param width {Number} The width to use for the calculation.
       * @return {Array} List of children in the first row.
       */
      getLastLineChildren: function getLastLineChildren(width) {
        var lineCalculator = new qx.ui.layout.LineSizeIterator(this._getLayoutChildren(), this.getSpacingX());

        var lineData = [];
        while (lineCalculator.hasMoreLines()) {
          lineData = lineCalculator.computeNextLine(width).children;
        }

        return lineData;
      },

      /**
       * Compute the preferred size optionally constrained by the available width
       *
       * @param availWidth {Integer} The available width
       * @return {Map} Map containing the preferred height and width of the layout
       */
      __computeSize: function __computeSize(availWidth) {
        var lineCalculator = new qx.ui.layout.LineSizeIterator(this._getLayoutChildren(), this.getSpacingX());

        var height = 0;
        var width = 0;
        var lineCount = 0;

        while (lineCalculator.hasMoreLines()) {
          var line = lineCalculator.computeNextLine(availWidth);
          lineCount += 1;
          width = Math.max(width, line.width);
          height += line.height;
        }

        return {
          width: width,
          height: height + this.getSpacingY() * (lineCount - 1)
        };
      }
    }
  });
  qx.ui.layout.Flow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Flow.js.map?dt=1555325120765