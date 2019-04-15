(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {},
      "qx.Class": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Bootstrap.define("qx.Annotation", {
    statics: {
      /**
       * Returns a list of annotations, exclusively from this class
       * @param clazz {Class} the class to inspect
       * @param name {String} the name (eg method name) to look for
       * @param group {String} the group to look in if applicable (eg "methods")
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      __getOwnAnnos: function __getOwnAnnos(clazz, name, group, annoClass) {
        if (clazz.$$annotations === undefined) {
          return [];
        }
        var annos = group ? clazz.$$annotations[group] : clazz.$$annotations;
        var match = annos && annos[name];
        if (!match) {
          return [];
        }
        if (annoClass) {
          match = match.filter(function (anno) {
            return anno instanceof annoClass;
          });
        }
        return match;
      },

      /**
       * Returns a list of annotations, from this class and superclasses
       * @param clazz {Class} the starting class to inspect
       * @param name {String} the name (eg method name) to look for
       * @param group {String} the group to look in if applicable (eg "methods")
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      __getAnnos: function __getAnnos(clazz, name, group, annoClass) {
        var result = [];
        for (var tmp = clazz; tmp; tmp = tmp.superclass) {
          if (tmp.$$annotations !== undefined) {
            var annos = group ? tmp.$$annotations[group] : tmp.$$annotations;
            var src = annos && annos[name];
            if (src) {
              if (annoClass) {
                src = src.filter(function (anno) {
                  return anno instanceof annoClass;
                });
              }
              qx.lang.Array.append(result, src);
            }
          }
        }
        return result;
      },

      /**
       * Returns the class annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnClass: function getOwnClass(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@", null, annoClass);
      },

      /**
       * Returns the class annotations, from this class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getClass: function getClass(clazz, annoClass) {
        return this.__getAnnos(clazz, "@", null, annoClass);
      },

      /**
       * Returns the class constructor's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnConstructor: function getOwnConstructor(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@construct", null, annoClass);
      },

      /**
       * Returns the class constructor's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getConstructor: function getConstructor(clazz, annoClass) {
        return this.__getAnnos(clazz, "@construct", null, annoClass);
      },

      /**
       * Returns the class destructor's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnDestructor: function getOwnDestructor(clazz, annoClass) {
        return this.__getOwnAnnos(clazz, "@destruct", null, annoClass);
      },

      /**
       * Returns the class destructor's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getDestructor: function getDestructor(clazz, annoClass) {
        return this.__getAnnos(clazz, "@destruct", null, annoClass);
      },

      /**
       * Returns the class member's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} member name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnMember: function getOwnMember(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "members", annoClass);
      },

      /**
       * Returns the class member's annotations, from the class and superclass
       * @param clazz {Class} the class to inspect
       * @param name {String} member name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getMember: function getMember(clazz, name, annoClass) {
        return this.__getAnnos(clazz, name, "members", annoClass);
      },

      /**
       * Returns the class property's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} property name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getOwnProperty: function getOwnProperty(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "properties", annoClass);
      },

      /**
       * Returns the class property's annotations, from the class and superclasses
       * @param clazz {Class} the class to inspect
       * @param name {String} property name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getProperty: function getProperty(clazz, name, annoClass) {
        return this.__getAnnos(clazz, name, "properties", annoClass);
      },

      /**
       * Returns a list of property names that implement a given annotation.
       * @param clazz {Class} the class to inspect
       * @param annotation {String|Object} annotation to look for
       * @return {String[]} the property names, never null
       */
      getPropertiesByAnnotation: function getPropertiesByAnnotation(clazz, annotation) {
        var properties = [];

        qx.Class.getProperties(clazz).forEach(function (property) {
          if (qx.Annotation.getProperty(clazz, property).includes(annotation)) {
            properties.push(property);
          }
        });

        return properties;
      },

      /**
       * Returns the class static's annotations, exclusively from the class
       * @param clazz {Class} the class to inspect
       * @param name {String} static name
       * @param annoClass {Class?} optional class which the annotations being returned must implement 
       * @return {Object[]} the annotations, never null
       */
      getStatic: function getStatic(clazz, name, annoClass) {
        return this.__getOwnAnnos(clazz, name, "statics", annoClass);
      }
    }
  });
  qx.Annotation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Annotation.js.map?dt=1555325101931