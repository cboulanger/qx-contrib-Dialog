(function () {
  var $$dbClassInfo = {
    'dependsOn': {
      'qx.core.Environment': {
        'defer': 'load',
        'require': true
      },
      'qx.Bootstrap': {
        'usage': 'dynamic',
        'require': true
      },
      'qx.bom.client.EcmaScript': {
        'defer': 'runtime'
      }
    },
    'environment': {
      'provided': [],
      'required': {
        'ecmascript.string.trim': {
          'defer': true,
          'className': 'qx.bom.client.EcmaScript'
        },
        'ecmascript.string.startsWith': {
          'defer': true,
          'className': 'qx.bom.client.EcmaScript'
        },
        'ecmascript.string.endsWith': {
          'defer': true,
          'className': 'qx.bom.client.EcmaScript'
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.lang.normalize.String", {

    statics: {

      /**
       * Removes whitespace from both ends of the string.
       *
       * <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim">MDN documentation</a> |
       * <a href="http://es5.github.com/#x15.5.4.20">Annotated ES5 Spec</a>
       *
       * @return {String} The trimmed string
       */
      trim: function trim() {
        return this.replace(/^\s+|\s+$/g, '');
      },

      /**
       * Determines whether a string begins with the characters of another
       * string, returning true or false as appropriate.
       *
       * @param searchString {String} The characters to be searched for at the
       *   start of this string.
       * @param position {Integer?0} The position in this string at which to
       *   begin searching for <code>searchString</code>.
       * @return {Boolean} Whether the string begins with the other string.
       */
      startsWith: function startsWith(searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
      },

      /**
       * Determines whether a ends with the characters of another string,
       * returning true or false as appropriate.
       *
       * @param searchString {String} The characters to be searched for at the
       *   end of this string.
       * @param position {Integer?length} Search within this string as if this
       *   string were only this long; defaults to this string's actual length,
       *   clamped within the range established by this string's length.
       * @return {Boolean} Whether the string ends with the other string.
       */
      endsWith: function endsWith(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      }

    },

    defer: function defer(statics) {
      // trim
      if (!qx.core.Environment.get("ecmascript.string.trim")) {
        String.prototype.trim = statics.trim;
      }
      // startsWith
      if (!qx.core.Environment.get("ecmascript.string.startsWith")) {
        String.prototype.startsWith = statics.startsWith;
      }
      // endsWith
      if (!qx.core.Environment.get("ecmascript.string.endsWith")) {
        String.prototype.endsWith = statics.endsWith;
      }
    }
  });
  qx.lang.normalize.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1555325114171