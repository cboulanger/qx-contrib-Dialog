(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "dialog.Form": {
        "require": true
      },
      "qx.ui.layout.VBox": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.core.Widget": {},
      "qx.ui.layout.Grow": {},
      "qx.ui.form.Button": {},
      "qx.data.marshal.Json": {},
      "qx.util.Serializer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.Wizard", {
    extend: dialog.Form,
    properties: {
      /**
       * An array of maps that sets the properties of this widget
       */
      pageData: {
        check: "Array",
        apply: "_applyPageData"
      },

      /**
       * The number of the page in the wizard
       */
      page: {
        check: "Integer",
        apply: "_applyPage",
        init: 0
      },

      /**
       * Whether to allow the user to go to the previous
       * wizard page
       */
      allowBack: {
        check: "Boolean",
        init: false,
        event: "changeAllowBack"
      },

      /**
       * Whether to allow the user to go to the next
       * wizard page
       */
      allowNext: {
        check: "Boolean",
        init: false,
        event: "changeAllowNext"
      },

      /**
       * Whether to allow the user to finish the wizard. Automatically
       * set to 'true' on the last page of the wizard. The "Finish" button
       * is enabled if this property is 'true' AND all the form entries pass
       * the validation tests.
       */
      allowFinish: {
        check: "Boolean",
        init: false,
        event: "changeAllowFinish"
      }
    },

    members: {
      _backButton: null,
      _nextButton: null,
      _finishButton: null,

      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();
        container.setPadding(0);
        container.setLayout(new qx.ui.layout.VBox(0));
        this.add(container);
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setMinWidth(100);
        this._message.setAllowGrowX(true);
        hbox.add(this._message, {
          flex: 1
        });
        var line = new qx.ui.core.Widget();
        line.setHeight(2);
        line.setBackgroundColor("gray");
        container.add(line);
        var formContainer = this._formContainer = new qx.ui.container.Composite();
        formContainer.setPadding(16);
        formContainer.setLayout(new qx.ui.layout.Grow());
        formContainer.setMinWidth(300);
        formContainer.setMinHeight(200);
        container.add(formContainer);
        line = new qx.ui.core.Widget();
        line.setHeight(2);
        line.setMarginBottom(5);
        line.setBackgroundColor("gray");
        container.add(line);
        var buttonPane = this._createButtonPane();
        buttonPane.getLayout().setAlignX("right");
        container.add(buttonPane);
        this._backButton = new qx.ui.form.Button("< " + this.tr("Back"));
        this._backButton.addListener("execute", this.goBack, this);
        this.bind("allowBack", this._backButton, "enabled");
        this._backButton.setEnabled(false);
        buttonPane.add(this._backButton);
        this._nextButton = new qx.ui.form.Button(this.tr("Next") + " >");
        this._nextButton.addListener("execute", this.goForward, this);
        this._nextButton.setEnabled(false);
        buttonPane.add(this._nextButton);
        var cancelButton = this._createCancelButton();
        buttonPane.add(cancelButton);
        this._finishButton = new qx.ui.form.Button(this.tr("Finish"));
        this._finishButton.addListener("execute", this.finish, this);
        this._finishButton.setEnabled(false);
        buttonPane.add(this._finishButton);

        this._backButton.setQxObjectId("back");
        this.addOwnedQxObject(this._backButton);
        this._nextButton.setQxObjectId("next");
        this.addOwnedQxObject(this._nextButton);
        this._finishButton.setQxObjectId("finish");
        this.addOwnedQxObject(this._finishButton);
      },

      /**
       * Add bindings to the validation manager to control the state of
       * the wizard buttons.
       * @param form {qx.ui.form.Form} The form to bind
       */
      _onFormReady: function _onFormReady(form) {
        var _this = this;
        form.getValidationManager().bind("valid", this._nextButton, "enabled", {
          converter: function converter(value) {
            return !!(value && _this.getAllowNext());
          }
        });
        form.getValidationManager().bind("valid", this._finishButton, "enabled", {
          converter: function converter(value) {
            return !!(value && _this.getAllowFinish());
          }
        });
      },

      /**
       * Apply the page data. This initializes the response
       * data model
       * @param pageData {Array} The new page data
       * @param old {Array} The old page data
       */
      _applyPageData: function _applyPageData(pageData, old) {
        var _this2 = this;

        this._backButton.setEnabled(false);
        this._nextButton.setEnabled(false);
        this._finishButton.setEnabled(false);
        if (pageData) {
          (function () {
            var modelData = {};
            pageData.forEach(function (pData) {
              var formData = pData.formData;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = Object.getOwnPropertyNames(formData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var key = _step.value;

                  modelData[key] = formData[key].value || null;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            });
            var model = qx.data.marshal.Json.createModel(modelData);
            _this2.setModel(model);
          })();
        } else {
          this.setFormData(null);
          this.setModel(null);
        }
      },

      /**
       * Go to a given wizard page. This recreates the
       * form.
       * @param page {Integer} The new page
       * @param old {Integer} The old page
       */
      _applyPage: function _applyPage(page, old) {
        var pageData = this.getPageData()[page];
        this.setFormData(null);
        delete pageData.pageData;
        delete pageData.page;
        var length = this.getPageData().length;
        this.setAllowNext(page < length - 1);
        this.setAllowBack(page > 0);
        if (!this.getAllowFinish()) {
          this.setAllowFinish(page === length - 1);
        }
        this.set(pageData);
      },

      /**
       * Starts the wizard
       */
      start: function start() {
        this.show();
        this.setPage(0);
      },

      /**
       * Goes to the previous wizard button
       */
      goBack: function goBack() {
        var page = this.getPage();
        if (page === 0) {
          this.error("Cannot go back!");
        }
        this.setPage(--page);
      },

      /**
       * Goes to the next wizard page
       */
      goForward: function goForward() {
        var page = this.getPage();
        if (page > this.getPageData().length - 2) {
          this.error("Cannot go forward!");
        }
        this.setPage(++page);
      },

      /**
       * Finishes the wizard. Calls callback with the result data map
       */
      finish: function finish() {
        this.hide();
        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), qx.util.Serializer.toNativeObject(this.getModel()));
        }
        this.resetCallback();
      }
    }
  });
  dialog.Wizard.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Wizard.js.map?dt=1555325129643