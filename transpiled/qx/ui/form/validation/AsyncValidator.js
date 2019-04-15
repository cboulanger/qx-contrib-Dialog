(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.ui.form.validation.AsyncValidator", {
    extend: qx.core.Object,

    /**
     * @param validator {Function} The validator function, which has to be
     *   asynchronous.
     */
    construct: function construct(validator) {
      qx.core.Object.constructor.call(this);
      // save the validator function
      this.__validatorFunction = validator;
    },

    members: {
      __validatorFunction: null,
      __item: null,
      __manager: null,
      __usedForForm: null,

      /**
       * The validate function should only be called by
       * {@link qx.ui.form.validation.Manager}.
       *
       * It stores the given information and calls the validation function set in
       * the constructor. The method is used for form fields only. Validating a
       * form itself will be invokes with {@link #validateForm}.
       *
       * @param item {qx.ui.core.Widget} The form item which should be validated.
       * @param value {var} The value of the form item.
       * @param manager {qx.ui.form.validation.Manager} A reference to the form
       *   manager.
       * @param context {var?null} The context of the validator.
       *
       * @internal
       */
      validate: function validate(item, value, manager, context) {
        // mark as item validator
        this.__usedForForm = false;
        // store the item and the manager
        this.__item = item;
        this.__manager = manager;
        // invoke the user set validator function
        this.__validatorFunction.call(context || this, this, value);
      },

      /**
       * The validateForm function should only be called by
       * {@link qx.ui.form.validation.Manager}.
       *
       * It stores the given information and calls the validation function set in
       * the constructor. The method is used for forms only. Validating a
       * form item will be invokes with {@link #validate}.
       *
       * @param items {qx.ui.core.Widget[]} All form items of the form manager.
       * @param manager {qx.ui.form.validation.Manager} A reference to the form
       *   manager.
       * @param context {var?null} The context of the validator.
       *
       * @internal
       */
      validateForm: function validateForm(items, manager, context) {
        this.__usedForForm = true;
        this.__manager = manager;
        this.__validatorFunction.call(context, items, this);
      },

      /**
       * This method should be called within the asynchronous callback to tell the
       * validator the result of the validation.
       *
       * @param valid {Boolean} The boolean state of the validation.
       * @param message {String?} The invalidMessage of the validation.
       */
      setValid: function setValid(valid, message) {
        // valid processing
        if (this.__usedForForm) {
          // message processing
          if (message !== undefined) {
            this.__manager.setInvalidMessage(message);
          }
          this.__manager.setFormValid(valid);
        } else {
          // message processing
          if (message !== undefined) {
            this.__item.setInvalidMessage(message);
          }
          this.__manager.setItemValid(this.__item, valid);
        }
      }
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */

    destruct: function destruct() {
      this.__manager = this.__item = null;
    }
  });
  qx.ui.form.validation.AsyncValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AsyncValidator.js.map?dt=1555325120153