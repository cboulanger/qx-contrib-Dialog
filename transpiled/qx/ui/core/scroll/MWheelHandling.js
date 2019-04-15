(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qx.ui.core.scroll.MWheelHandling", {
    members: {
      /**
       * Mouse wheel event handler
       *
       * @param e {qx.event.type.Mouse} Mouse event
       */
      _onMouseWheel: function _onMouseWheel(e) {
        var showX = this._isChildControlVisible("scrollbar-x");
        var showY = this._isChildControlVisible("scrollbar-y");

        var scrollbarY = showY ? this.getChildControl("scrollbar-y", true) : null;
        var scrollbarX = showX ? this.getChildControl("scrollbar-x", true) : null;

        var deltaY = e.getWheelDelta("y");
        var deltaX = e.getWheelDelta("x");

        var endY = !showY;
        var endX = !showX;

        // y case
        if (scrollbarY) {

          var steps = parseInt(deltaY);
          if (steps !== 0) {
            scrollbarY.scrollBySteps(steps);
          }

          var position = scrollbarY.getPosition();
          var max = scrollbarY.getMaximum();

          // pass the event to the parent if the scrollbar is at an edge
          if (steps < 0 && position <= 0 || steps > 0 && position >= max) {
            endY = true;
          }
        }

        // x case
        if (scrollbarX) {
          var steps = parseInt(deltaX);
          if (steps !== 0) {
            scrollbarX.scrollBySteps(steps);
          }

          var position = scrollbarX.getPosition();
          var max = scrollbarX.getMaximum();
          // pass the event to the parent if the scrollbar is at an edge
          if (steps < 0 && position <= 0 || steps > 0 && position >= max) {
            endX = true;
          }
        }

        // pass the event to the parent if both scrollbars are at the end
        if (!endY && deltaX === 0 || !endX && deltaY === 0 || (!endX || !endY) && deltaX !== 0 && deltaY !== 0) {
          // Stop bubbling and native event only if a scrollbar is visible
          e.stop();
        }
      }
    }
  });
  qx.ui.core.scroll.MWheelHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MWheelHandling.js.map?dt=1555325118105