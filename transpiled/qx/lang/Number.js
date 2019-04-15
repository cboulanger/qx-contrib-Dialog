(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.lang.Number", {
    statics: {
      /**
       * Check whether the number is in a given range
       *
       * @param nr {Number} the number to check
       * @param vmin {Integer} lower bound of the range
       * @param vmax {Integer} upper bound of the range
       * @return {Boolean} whether the number is >= vmin and <= vmax
       */
      isInRange: function isInRange(nr, vmin, vmax) {
        return nr >= vmin && nr <= vmax;
      },

      /**
       * Check whether the number is between a given range
       *
       * @param nr {Number} the number to check
       * @param vmin {Integer} lower bound of the range
       * @param vmax {Integer} upper bound of the range
       * @return {Boolean} whether the number is > vmin and < vmax
       */
      isBetweenRange: function isBetweenRange(nr, vmin, vmax) {
        return nr > vmin && nr < vmax;
      },

      /**
       * Limit the number to a given range
       *
       * * If the number is greater than the upper bound, the upper bound is returned
       * * If the number is smaller than the lower bound, the lower bound is returned
       * * If the number is in the range, the number is returned
       *
       * @param nr {Number} the number to limit
       * @param vmin {Integer} lower bound of the range
       * @param vmax {Integer} upper bound of the range
       * @return {Integer} the limited number
       */
      limit: function limit(nr, vmin, vmax) {
        if (vmax != null && nr > vmax) {
          return vmax;
        } else if (vmin != null && nr < vmin) {
          return vmin;
        } else {
          return nr;
        }
      },

      /**
       * Checks the equality of two numbers regarding the imprecision of floats.
       *
       * @param x {Number}
       * @param y {Number}
       * @return {Boolean}
       */
      equals: function equals(x, y) {
        {
          qx.core.Assert.assertNumber(x);
          qx.core.Assert.assertNumber(y);
        }

        // 1e-14 is the relative difference.
        return x === y || Math.abs(x - y) < Number.EPSILON || Math.abs(x - y) <= Math.max(Math.abs(x), Math.abs(y)) * 1e-14;
      }
    }
  });
  qx.lang.Number.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Number.js.map?dt=1555325113900