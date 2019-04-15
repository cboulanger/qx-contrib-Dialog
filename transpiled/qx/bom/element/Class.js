var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.log.Logger": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.classlist": {
          "load": true,
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.bom.element.Class", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {RegExp} Regular expressions to split class names */
      __splitter: /\s+/g,

      /** @type {RegExp} String trim regular expression. */
      __trim: /^\s+|\s+$/g,

      /**
       * Adds a className to the given element
       * If successfully added the given className will be returned
       *
       * @signature function(element, name)
       * @param element {Element} The element to modify
       * @param name {String} The class name to add
       * @return {String} The added classname (if so)
       */
      add: {
        "native": function native(element, name) {
          if (name.length > 0) {
            element.classList.add(name);
          }

          return name;
        },

        "default": function _default(element, name) {
          if (!this.has(element, name)) {
            element.className += (element.className ? " " : "") + name;
          }

          return name;
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"],

      /**
       * Adds multiple classes to the given element
       *
       * @signature function(element, classes)
       * @param element {Element} DOM element to modify
       * @param classes {String[]} List of classes to add.
       * @return {String} The resulting class name which was applied
       */
      addClasses: {
        "native": function native(element, classes) {
          for (var i = 0; i < classes.length; i++) {
            if (classes[i].length > 0) {
              element.classList.add(classes[i]);
            }
          }
          return element.className;
        },

        "default": function _default(element, classes) {
          var keys = {};
          var result;

          var old = element.className;
          if (old) {
            result = old.split(this.__splitter);
            for (var i = 0, l = result.length; i < l; i++) {
              keys[result[i]] = true;
            }

            for (var i = 0, l = classes.length; i < l; i++) {
              if (!keys[classes[i]]) {
                result.push(classes[i]);
              }
            }
          } else {
            result = classes;
          }

          return element.className = result.join(" ");
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"],

      /**
       * Gets the classname of the given element
       *
       * @param element {Element} The element to query
       * @return {String} The retrieved classname
       */
      get: function get(element) {
        var className = element.className;
        if (typeof className.split !== 'function') {
          if ((typeof className === "undefined" ? "undefined" : _typeof(className)) === 'object') {
            if (qx.Bootstrap.getClass(className) == 'SVGAnimatedString') {
              className = className.baseVal;
            } else {
              {
                qx.log.Logger.warn(this, "className for element " + element + " cannot be determined");
              }
              className = '';
            }
          }
          if (typeof className === 'undefined') {
            {
              qx.log.Logger.warn(this, "className for element " + element + " is undefined");
            }
            className = '';
          }
        }
        return className;
      },

      /**
       * Whether the given element has the given className.
       *
       * @signature function(element, name)
       * @param element {Element} The DOM element to check
       * @param name {String} The class name to check for
       * @return {Boolean} true when the element has the given classname
       */
      has: {
        "native": function native(element, name) {
          return element.classList.contains(name);
        },

        "default": function _default(element, name) {
          var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
          return regexp.test(element.className);
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"],

      /**
       * Removes a className from the given element
       *
       * @signature function(element, name)
       * @param element {Element} The DOM element to modify
       * @param name {String} The class name to remove
       * @return {String} The removed class name
       */
      remove: {
        "native": function native(element, name) {
          element.classList.remove(name);
          return name;
        },

        "default": function _default(element, name) {
          var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
          element.className = element.className.replace(regexp, "$2");

          return name;
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"],

      /**
       * Removes multiple classes from the given element
       *
       * @signature function(element, classes)
       * @param element {Element} DOM element to modify
       * @param classes {String[]} List of classes to remove.
       * @return {String} The resulting class name which was applied
       */
      removeClasses: {
        "native": function native(element, classes) {
          for (var i = 0; i < classes.length; i++) {
            element.classList.remove(classes[i]);
          }
          return element.className;
        },

        "default": function _default(element, classes) {
          var reg = new RegExp("\\b" + classes.join("\\b|\\b") + "\\b", "g");
          return element.className = element.className.replace(reg, "").replace(this.__trim, "").replace(this.__splitter, " ");
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"],

      /**
       * Replaces the first given class name with the second one
       *
       * @param element {Element} The DOM element to modify
       * @param oldName {String} The class name to remove
       * @param newName {String} The class name to add
       * @return {String} The added class name
       */
      replace: function replace(element, oldName, newName) {
        if (!this.has(element, oldName)) {
          return "";
        }

        this.remove(element, oldName);
        return this.add(element, newName);
      },

      /**
       * Toggles a className of the given element
       *
       * @signature function(element, name, toggle)
       * @param element {Element} The DOM element to modify
       * @param name {String} The class name to toggle
       * @param toggle {Boolean?null} Whether to switch class on/off. Without
       *    the parameter an automatic toggling would happen.
       * @return {String} The class name
       */
      toggle: {
        "native": function native(element, name, toggle) {
          if (toggle === undefined) {
            element.classList.toggle(name);
          } else {
            toggle ? this.add(element, name) : this.remove(element, name);
          }
          return name;
        },

        "default": function _default(element, name, toggle) {
          if (toggle == null) {
            toggle = !this.has(element, name);
          }

          toggle ? this.add(element, name) : this.remove(element, name);
          return name;
        }
      }[qx.core.Environment.get("html.classlist") ? "native" : "default"]
    }
  });
  qx.bom.element.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1555325106685