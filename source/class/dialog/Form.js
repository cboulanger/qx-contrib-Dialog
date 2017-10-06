/* ************************************************************************

   qooxdoo dialog library
   https://github.com/cboulanger/qx-contrib-Dialog

   Copyright:
     2007-2017 Christian Boulanger and others

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */
/*global qx dialog*/

/**
 * A dialog with a form that is constructed on-the-fly
 *
 * @require(dialog.FormRenderer)
 * @require(qx.util.Serializer)
 * @require(qx.util.Validate)
 */
qx.Class.define("dialog.Form", {
  extend: dialog.Dialog,
  properties: {
    /**
     * Data to create a form with multiple fields.
     * So far implemented:
     *   TextField / TextArea
     *   ComboBox
     *   SelectBox
     *   RadioGroup
     *   CheckBox
     *
     * <pre>
     * {
     *  "username" : {
     *     'type'  : "TextField",
     *     'label' : "User Name",
     *     'value' : ""
     *   },
     *   "address" : {
     *     'type'  : "TextArea",
     *     'label' : "Address",
     *     'lines' : 3
     *   },
     *   "domain" : {
     *     'type'  : "SelectBox",
     *     'label' : "Domain",
     *     'value' : 1,
     *     'options' : [
     *       { 'label' : "Company", 'value' : 0 },
     *       { 'label' : "Home",    'value' : 1 }
     *     ]
     *   },
     *   "commands" : {
     *    'type'  : "ComboBox",
     *     'label' : "Shell command to execute",
     *     'options' : [
     *       { 'label' : "ln -s *" },
     *       { 'label' : "rm -Rf /" }
     *     ]
     *   }
     * }
     * </pre>
     *
     */
    formData: {
      check: "Map",
      nullable: true,
      event: "changeFormData",
      apply: "_applyFormData"
    },

    /**
     * The model of the result data
     */
    model: {
      check: "qx.core.Object",
      nullable: true,
      event: "changeModel"
    },

    /**
     * The default width of the column with the field labels
     */
    labelColumnWidth: {
      check: "Integer",
      nullable: false,
      init: 100
    }
  },

  members: {
    _formContainer: null,
    _form: null,
    _formValidator: null,
    _formController: null,

    /**
     * Return the form
     * @return {qx.ui.form.Form}
     */
    getForm: function() {
      return this._form;
    },

    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      var container = new qx.ui.container.Composite();
      container.setLayout(new qx.ui.layout.VBox(10));
      this.add(container);
      var hbox = new qx.ui.container.Composite();
      hbox.setLayout(new qx.ui.layout.HBox(10));
      container.add(hbox);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setMinWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, {
        flex: 1
      });
      this._formContainer = new qx.ui.container.Composite();
      this._formContainer.setLayout(new qx.ui.layout.Grow());
      container.add(this._formContainer, {
        flex: 1
      });
      var buttonPane = new qx.ui.container.Composite();
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      container.add(buttonPane);
      var okButton = this._createOkButton();
      buttonPane.add(okButton);
      var cancelButton = this._createCancelButton();
      buttonPane.add(cancelButton);
    },

    /**
     * Constructs the form on-the-fly
     * @param formData {Map} The form data map
     * @param old {Map|null} The old value
     * @lint ignoreDeprecated(alert,eval)
     */
    _applyFormData: function(formData, old) {
      if (this._formController) {
        try {
          this.getModel().removeAllBindings();
          this._formController.dispose();
        } catch (e) {}
      }
      if (this._form) {
        try {
          this._form.getValidationManager().removeAllBindings();
          this._form.dispose();
        } catch (e) {}
      }
      this._formContainer.removeAll();
      if (!formData) {
        return;
      }
      if (this.getModel()) {
        this.getModel().removeAllBindings();
        this.getModel().dispose();
      }
      var modelData = {};
      for (var key in formData) {
        modelData[key] = formData[key].value !== undefined
          ? formData[key].value
          : null;
      }
      var model = qx.data.marshal.Json.createModel(modelData);
      this.setModel(model);
      this._form = new qx.ui.form.Form();
      this._formController = new qx.data.controller.Object(this.getModel());
      this._onFormReady(this._form);
      for (var key in formData) {
        var fieldData = formData[key];
        var formElement = null;
        switch (fieldData.type.toLowerCase()) {
          case "groupheader":
            this._form.addGroupHeader(fieldData.value);
            break;
          case "textarea":
            formElement = new qx.ui.form.TextArea();
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;
          case "textfield":
            formElement = new qx.ui.form.TextField();
            if (fieldData.maxLength)
              formElement.setMaxLength(fieldData.maxLength);
            formElement.setLiveUpdate(true);
            break;
          case "datefield":
            formElement = new qx.ui.form.DateField();
            if (fieldData.dateFormat) {
              formElement.setDateFormat(fieldData.dateFormat);
            }
            break;
          case "passwordfield":
            formElement = new qx.ui.form.PasswordField();
            break;
          case "combobox":
            formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function(item) {
              var listItem = new qx.ui.form.ListItem(item.label, item.icon);
              formElement.add(listItem);
            });
            break;
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            model = qx.data.marshal.Json.createModel(fieldData.options);
            new qx.data.controller.List(model, formElement, "label");
            break;
          case "radiogroup":
            formElement = new qx.ui.form.RadioGroup();
            if (fieldData.orientation) {
              formElement.setUserData("orientation", fieldData.orientation);
            }
            fieldData.options.forEach(function(item) {
              var radioButton = new qx.ui.form.RadioButton(item.label);
              radioButton.setUserData(
                "value",
                item.value !== undefined ? item.value : item.label
              );
              formElement.add(radioButton);
            }, this);
            break;
          case "label":
            formElement = new qx.ui.form.TextField(); // dummy
            formElement.setUserData("excluded", true);
            break;
          case "checkbox":
            formElement = new qx.ui.form.CheckBox(fieldData.label);
            break;
          default:
            this.error("Invalid form field type:" + fieldData.type);
        }
        formElement.setUserData("key", key);
        var _this = this;
        switch (fieldData.type.toLowerCase()) {
          case "textarea":
          case "textfield":
          case "passwordfield":
          case "combobox":
          case "datefield":
            this._formController.addTarget(
              formElement,
              "value",
              key,
              true,
              null,
              {
                converter: function(value) {
                  _this._form.getValidationManager().validate();
                  return value;
                }
              }
            );
            break;
          case "checkbox":
            this._formController.addTarget(
              formElement,
              "value",
              key,
              true,
              null
            );
            break;
          case "selectbox":
            this._formController.addTarget(
              formElement,
              "selection",
              key,
              true,
              {
                converter: qx.lang.Function.bind(function(value) {
                  var selected = null;
                  var selectables = this.getSelectables();
                  selectables.forEach(function(selectable) {
                    if (selectable.getModel().getValue() === value) {
                      selected = selectable;
                    }
                  }, this);
                  if (!selected) {
                    return [selectables[0]];
                  }
                  return [selected];
                }, formElement)
              },
              {
                converter: qx.lang.Function.bind(function(selection) {
                  var value = selection[0].getModel().getValue();
                  return value;
                }, formElement)
              }
            );
            break;
          case "radiogroup":
            this._formController.addTarget(
              formElement,
              "selection",
              key,
              true,
              {
                converter: qx.lang.Function.bind(function(value) {
                  var selectables = this.getSelectables();
                  var selection = [];
                  if (value) {
                    selectables.forEach(function(selectable) {
                      var sValue = selectable.getUserData("value");
                      if (sValue === value) {
                        selection = [selectable];
                      }
                    }, this);
                  }
                  return selection;
                }, formElement)
              },
              {
                converter: function(selection) {
                  var value = selection[0].getUserData("value");
                  return value;
                }
              }
            );
            break;
        }
        var validator = null;
        if (formElement && fieldData.validation) {
          if (fieldData.validation.required) {
            formElement.setRequired(true);
          }
          if (fieldData.validation.validator) {
            validator = fieldData.validation.validator;
            if (typeof validator == "string") {
              if (qx.util.Validate[validator]) {
                validator = qx.util.Validate[validator]();
              } else if (validator.charAt(0) == "/") {
                validator = qx.util.Validate.regExp(
                  new RegExp(validator.substr(1, validator.length - 2)),
                  fieldData.validation.errorMessage
                );
              } else {
                this.error("Invalid string validator.");
              }
            } else if (
              !(validator instanceof qx.ui.form.validation.AsyncValidator) &&
              typeof validator != "function"
            ) {
              this.error("Invalid validator.");
            }
          }
          if (fieldData.validation.service) {
            var service = fieldData.validation.service;
            _this = this;
            validator = new qx.ui.form.validation.AsyncValidator(function(
              validatorObj,
              value
            ) {
              if (!validatorObj.__asyncInProgress) {
                validatorObj.__asyncInProgress = true;
                qx.core.Init
                  .getApplication()
                  .getRpcManager()
                  .execute(service.name, service.method, [value], function(
                    response
                  ) {
                    try {
                      var valid = response &&
                        typeof response == "object" &&
                        response.data
                        ? response.data
                        : response;
                      validatorObj.setValid(valid);
                      validatorObj.__asyncInProgress = false;
                    } catch (e) {
                      alert(e);
                    }
                  });
              }
            });
          }
        }
        if (fieldData.width !== undefined) {
          formElement.setWidth(fieldData.width);
        }
        if (fieldData.placeholder !== undefined) {
          formElement.setPlaceholder(fieldData.placeholder);
        }
        if (qx.lang.Type.isObject(fieldData.events)) {
          for (var type in fieldData.events) {
            try {
              var func = eval("(" + fieldData.events[type] + ")"); // eval is evil, I know.
              if (!qx.lang.Type.isFunction(func)) {
                throw new Error();
              }
              formElement.addListener(type, func, formElement);
            } catch (e) {
              this.warn(
                "Invalid '" +
                  type +
                  "' event handler for form element '" +
                  key +
                  "'."
              );
            }
          }
        }
        var label = fieldData.label;
        this._form.add(formElement, label, validator);
      }
      var view = new dialog.FormRenderer(this._form);
      view.getLayout().setColumnFlex(0, 0);
      view.getLayout().setColumnMaxWidth(0, this.getLabelColumnWidth());
      view.getLayout().setColumnFlex(1, 1);
      view.setAllowGrowX(true);
      this._formContainer.add(view);
      this._form.getValidationManager().validate();
    },

    /**
     * Create OK Button
     * unlike our superclass, we do not add an appear listener to focus OK
     * cherry-picked from from https://github.com/derrell/qx-contrib-Dialog/commit/c656f1cb98cbd1e61456566b63b5a4926dfe9cef
     * @override
     * @return {qx.ui.form.Button}
     */
    _createOkButton: function() {
      var okButton = (this._okButton = new qx.ui.form.Button(this.tr("OK")));
      okButton.setIcon("dialog/273-checkmark.svg");
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);
      return okButton;
    },

    /**
     * Hook for subclasses to do something with the form, for example
     * in order to attach bindings to the validation manager.
     * Default behavior: bind the enabled state of the "OK" button to the
     * validity of the current form.
     * @param form {qx.ui.form.Form} The form to bind
     */
    _onFormReady: function(form) {
      form.getValidationManager().bind("valid", this._okButton, "enabled", {
        converter: function(value) {
          return value || false;
        }
      });
    },

    /**
     * Handle click on ok button. Calls callback with the result map
     * @override
     */
    _handleOk: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(
          this.getContext(),
          qx.util.Serializer.toNativeObject(this.getModel())
        );
      }
      this.resetCallback();
    }
  }
});
