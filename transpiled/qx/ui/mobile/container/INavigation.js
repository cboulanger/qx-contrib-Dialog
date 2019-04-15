(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Interface.define("qx.ui.mobile.container.INavigation", {
    members: {
      /**
       * Returns the title widget that is merged into the navigation bar.
       *
       * @return {qx.ui.mobile.navigationbar.Title} The title of the navigation bar
       */
      getTitleWidget: function getTitleWidget() {},

      /**
       * Returns the left container that is merged into the navigation bar.
       *
       * @return {qx.ui.mobile.container.Composite} The left container of the navigation bar
       */
      getLeftContainer: function getLeftContainer() {},

      /**
       * Returns the right container that is merged into the navigation bar.
       *
       * @return {qx.ui.mobile.container.Composite} The right container of the navigation bar
       */
      getRightContainer: function getRightContainer() {}
    }
  });
  qx.ui.mobile.container.INavigation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=INavigation.js.map?dt=1555325121769