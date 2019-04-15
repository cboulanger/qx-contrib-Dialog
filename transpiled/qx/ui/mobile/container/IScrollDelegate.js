(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.mobile.container.IScrollDelegate", {
    members: {
      /**
       * Calculates the scroll offset if container scrolls to a widget/element through <code>scrollToElement()|scrollToWidget()</code>.
       *
       * @return {Array} an array with x,y offset.
       */
      getScrollOffset: function getScrollOffset() {}
    }
  });
  qx.ui.mobile.container.IScrollDelegate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IScrollDelegate.js.map?dt=1555325121774