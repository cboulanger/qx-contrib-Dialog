(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.type.BaseArray": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.util.StringBuilder", {
    extend: qx.type.BaseArray,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Creates a new StringBuilder with the given length or as a concatenation of the given arguments substrings.
     *
     * <pre class="javascript">
     * var sb1 = new qx.util.StringBuilder(length);
     * var sb2 = new qx.util.StringBuilder(item0, item1, ..., itemN);
     * </pre>
     *
     *
     * * <code>length</code>: The initial length of the StringBuilder.
     * * <code>itemN</code>:  A substring that will make up the newly created StringBuilder.
     * The StringBuilder's length property is set to the number of arguments.
     *
     * @param length_or_items {Integer|var?null} The initial length of the StringBuilder
     *        OR an argument list of values.
     */
    construct: function construct(length_or_items) {
      qx.type.BaseArray.apply(this, arguments);
    },

    /*
    *****************************************************************************
      MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Removes all content
       *
       */
      clear: function clear() {
        this.length = 0;
      },

      /**
       * Returns the concatted strings.
       *
       * @return {String} Concatted strings
       */
      get: function get() {
        return this.join("");
      },

      /**
       * Adds new strings. Supports multiple arguments.
       *
       * @signature function(varargs)
       * @param varargs {String} The separate strings to add
       */
      add: null,

      /**
       * Whether the string builder is empty
       *
       * @return {Boolean} <code>true</code> when the builder is empty
       */
      isEmpty: function isEmpty() {
        return this.length === 0;
      },

      /**
       * Returns the size of the strings
       *
       * @return {Integer} The string length
       */
      size: function size() {
        return this.join("").length;
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */

    defer: function defer(statics, members) {
      members.add = members.push;
      members.toString = members.get;
      members.valueOf = members.get;
    }
  });
  qx.util.StringBuilder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StringBuilder.js.map?dt=1555325128928