(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Scroll": {},
      "qx.ui.mobile.core.Root": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Mixin.define("qx.ui.mobile.container.MScrollHandling", {
    members: {
      /**
       * Returns the parent scroll container of this widget.
       * @return {qx.ui.mobile.container.Scroll} the parent scroll container or <code>null</code>
       */
      _getParentScrollContainer: function _getParentScrollContainer() {
        var scroll = this;
        while (!(scroll instanceof qx.ui.mobile.container.Scroll)) {
          if (scroll.getLayoutParent) {
            var layoutParent = scroll.getLayoutParent();
            if (layoutParent === null || layoutParent instanceof qx.ui.mobile.core.Root) {
              return null;
            }
            scroll = layoutParent;
          } else {
            return null;
          }
        }
        return scroll;
      }
    }
  });
  qx.ui.mobile.container.MScrollHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MScrollHandling.js.map?dt=1555325121847