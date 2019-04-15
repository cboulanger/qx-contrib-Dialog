(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.progressive.headfoot.Abstract", {
    type: "abstract",
    extend: qx.ui.container.Composite,

    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.HBox());
    },

    members: {

      __progressive: null,

      /**
       * Join this header/footer to a Progressive.  This makes the Progressive
       * object available to the header/footer through the _progressive member.
       *
       * @param progressive {qx.ui.progressive.Progressive}
       *   Progressive object to which we're being joined.
       *
       */
      join: function join(progressive) {
        this.__progressive = progressive;
      }
    },

    destruct: function destruct() {
      this.__progressive = null;
    }
  });
  qx.ui.progressive.headfoot.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1555325123487