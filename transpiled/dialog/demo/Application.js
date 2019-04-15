(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "dialog.Dialog": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "qx.log.appender.Native": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.core.Id": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.layout.HBox": {},
      "qx.theme.manager.Icon": {},
      "qx.Theme": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.Button": {},
      "qx.util.format.DateFormat": {},
      "qx.util.Serializer": {},
      "qx.util.Validate": {},
      "dialog.Wizard": {},
      "dialog.Login": {},
      "dialog.Progress": {},
      "qx.lang.Function": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.demo.Application", {
    extend: qx.application.Standalone,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * This method contains the initial application code and gets called
       * during startup of the application
       */
      main: function main() {

        dialog.demo.Application.prototype.main.base.call(this);
        qx.log.appender.Native;

        /*
         * button data
         */
        var buttons = [{
          label: "Alert",
          id: "alert",
          method: "createAlert"
        }, {
          label: "Warning",
          id: "warning",
          method: "createWarning"
        }, {
          label: "Error",
          id: "error",
          method: "createError"
        }, {
          label: "Confirm",
          id: "confirm",
          method: "createConfirm"
        }, {
          label: "Prompt",
          id: "prompt",
          method: "createPrompt"
        }, {
          label: "Dialog Chain",
          id: "dialog",
          method: "createDialogChain"
        }, {
          label: "Select among choices",
          id: "select",
          method: "createSelect"
        }, {
          label: "Form",
          id: "form",
          method: "createForm"
        }, {
          label: "Wizard",
          id: "wizard",
          method: "createWizard"
        }, {
          label: "Login",
          id: "login",
          method: "createLogin"
        }, {
          label: "Progress",
          id: "progress",
          method: "createProgress"
        }, {
          label: "Progress with Log",
          id: "progress_with_log",
          method: "createProgressWithLog"
        }];

        /*
         * dialog button panel
         */
        var button_panel = new qx.ui.container.Composite();
        button_panel.setLayout(new qx.ui.layout.VBox(5));
        button_panel.setQxObjectId("buttons");
        qx.core.Id.getInstance().register(button_panel);

        var title = new qx.ui.basic.Label("<h2>Dialog Demo</h2>");
        title.setRich(true);
        button_panel.add(title);

        // check box
        var blockerCheckBox = new qx.ui.form.CheckBox("Use coloured blocker (like < v.1.3)");
        blockerCheckBox.addListener("changeValue", function (e) {
          dialog.Dialog.useBlocker(e.getData());
        });
        button_panel.add(blockerCheckBox);

        // icon theme switcher
        var labelHBox = new qx.ui.basic.Label("<strong>Icon Theme</strong>");
        labelHBox.setRich(true);
        button_panel.add(labelHBox);
        var radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup();
        radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
        button_panel.add(radioButtonGroupHBox);
        radioButtonGroupHBox.addListener("changeSelection", function (e) {
          var theme = e.getData()[0].getModel();
          qx.theme.manager.Icon.getInstance().setTheme(theme);
        });

        // icon theme
        var metathemes = [];
        var iconthemes = [];
        var themes = qx.Theme.getAll();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.getOwnPropertyNames(themes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var theme = themes[key];
            if (theme.type === "meta") {
              //
            }
            if (theme.name.indexOf("dialog.theme.icon") !== -1) {
              var button = new qx.ui.form.RadioButton(theme.title);
              button.setModel(theme);
              radioButtonGroupHBox.add(button);
            }
          }

          // buttons
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

        button_panel.add(new qx.ui.basic.Label("Try out the following dialog widgets:"));
        buttons.forEach(function (button_data) {
          var button = new qx.ui.form.Button(button_data.label);
          button.setQxObjectId(button_data.id);
          button_panel.addOwnedQxObject(button);
          button.addListener("execute", function () {
            this[button_data.method](button_data.label, button);
          }, this);
          if (button_data.enabled !== undefined) {
            button.setEnabled(button_data.enabled);
          }
          button_panel.add(button);
        }, this);
        this.getRoot().add(button_panel, { left: 100, top: 100 });
      },

      _replaceOwnedObject: function _replaceOwnedObject(owner, obj) {
        var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'dialog';

        try {
          owner.removeOwnedQxObject(id);
        } catch (e) {} // ignore error
        obj.setQxObjectId(id);
        owner.addOwnedQxObject(obj);
      },

      createAlert: function createAlert(caption, button) {
        var dlg = dialog.Dialog.alert("Hello World!").set({ caption: caption });

        //    old style:
        //      dialog.Dialog.alert(  "Hello World!", null, null, caption );
        //    or:
        //      (new dialog.Alert({
        //        message: "Hello World!",
        //        caption: caption
        //      })).show();

        // next line is for automated UI tests only, not needed for "normal" usage
        this._replaceOwnedObject(button, dlg, "dialog");
      },

      createWarning: function createWarning(caption, button) {
        var dlg = dialog.Dialog.warning("I warned you!").set({ caption: caption });
        this._replaceOwnedObject(button, dlg, "dialog");
      },

      createError: function createError(caption, button) {
        var dlg = dialog.Dialog.error("Error, error, error, errr....!").set({ caption: caption });
        this._replaceOwnedObject(button, dlg, "dialog");
      },

      createConfirm: function createConfirm(caption, button) {
        var _this = this;

        var dlg = dialog.Dialog.confirm("Do you really want to erase your hard drive?").set({ caption: caption });
        this._replaceOwnedObject(button, dlg, "dialog1");

        dlg.promise().then(function (result) {
          var dlg2 = dialog.Dialog.alert("Your answer was: " + result).set({ caption: caption + " 2" });
          _this._replaceOwnedObject(button, dlg, "dialog2");
        });
        //    old style:
        //      dialog.Dialog.confirm("Do you really want to erase your hard drive?", function(result){
        //        dialog.Dialog.alert("Your answer was: " + result, null, null, caption );
        //      }, this, caption);
        //    or:
        //      (new dialog.Confirm({
        //        message: "Do you really want to erase your hard drive?",
        //        callback: function(result)
        //        {
        //          (new dialog.Alert({
        //            message: "Your answer was:" + result,
        //            caption: caption
        //          })).show();
        //        },
        //        caption: caption
        //      })).show();
      },

      createPrompt: function createPrompt(caption, button) {
        var _this2 = this;

        var dlg = dialog.Dialog.prompt("Please enter the root password for your server").set({ caption: caption });
        this._replaceOwnedObject(button, dlg, "dialog1");
        dlg.promise().then(function (result) {
          var dlg2 = dialog.Dialog.alert("Your answer was: " + result).set({ caption: caption + " 2" });
          _this2._replaceOwnedObject(button, dlg2, "dialog2");
        });
      },

      /**
       * Example for nested callbacks
       */
      createDialogChain: function createDialogChain(caption, button) {
        var _this3 = this;

        var dlg1 = dialog.Dialog.alert("This demostrates a series of 'nested' dialogs ").set({ caption: caption });
        this._replaceOwnedObject(button, dlg1, "dialog1");
        dlg1.promise().then(function () {
          var dlg2 = dialog.Dialog.confirm("Do you believe in the Loch Ness monster?").set({ caption: caption + " 2" });
          _this3._replaceOwnedObject(button, dlg2, "dialog2");
          return dlg2.promise();
        }).then(function (result) {
          var dlg3 = dialog.Dialog.confirm("You really " + (result ? "" : "don't ") + "believe in the Loch Ness monster?").set({ caption: caption + " 3" });
          _this3._replaceOwnedObject(button, dlg3, "dialog3");
          return dlg3.promise();
        }).then(function (result) {
          var dlg4 = dialog.Dialog.alert(result ? "I tell you a secret: It doesn't exist." : "Good to know.").set({ caption: caption + " 4" });
          _this3._replaceOwnedObject(button, dlg4, "dialog4");
          return dlg4.promise();
        });
      },

      /**
       * Offer a selection of choices to the user
       */
      createSelect: function createSelect(caption, button) {
        var _this4 = this;

        var dlg1 = dialog.Dialog.select("Select the type of record to create:").set({
          caption: caption,
          options: [{ label: "Database record", value: "database" }, { label: "World record", value: "world" }, { label: "Pop record", value: "pop" }]
        });
        this._replaceOwnedObject(button, dlg1, "dialog1");
        dlg1.promise().then(function (result) {
          var dlg2 = dialog.Dialog.alert("You selected: '" + result + "'").set({ caption: caption + " 2" });
          _this4._replaceOwnedObject(button, dlg2, "dialog2");
          return dlg2.promise();
        });

        //    old style:
        //      (new dialog.Select({
        //        message: "Select the type of record to create:",
        //        options: [
        //          { label:"Database record", value:"database" },
        //          { label:"World record", value:"world" },
        //          { label:"Pop record", value:"pop" }
        //        ],
        //        allowCancel: true,
        //        caption: caption,
        //        callback: function(result){
        //          (new dialog.Alert({
        //            message: "You selected: '" + result + "'"
        //          })).show();
        //        }
        //      })).show();
      },

      createForm: function createForm(caption, button) {
        var _this5 = this;

        var formData = {
          'username': {
            'type': "TextField",
            'label': "User Name",
            'value': "",
            "validation": {
              "required": true
            }
          },
          'address': {
            'type': "TextArea",
            'label': "Address",
            'lines': 3,
            'value': ""
          },
          'domain': {
            'type': "SelectBox",
            'label': "Domain",
            'value': 1,
            'options': [{ 'label': "Company", 'value': 0 }, { 'label': "Home", 'value': 1 }]
          },
          'commands': {
            'type': "ComboBox",
            'label': "Shell command to execute",
            'value': "",
            'options': [{ 'label': "ln -s *" }, { 'label': "rm -Rf /" }]
          },
          'save_details': {
            'type': "Checkbox",
            'label': "Save form details",
            'value': true
          },
          "executeDate": {
            "type": "datefield",
            "dateFormat": new qx.util.format.DateFormat("dd.MM.yyyy HH:mm"),
            "value": new Date(),
            "label": "Execute At"
          },
          "area": {
            "type": "spinner",
            "label": "Area",
            "value": 25.5,
            "min": -10,
            "max": 100,
            "step": 0.5,
            "fractionsDigits": { min: 1, max: 7 }
          }
        };

        var form = dialog.Dialog.form("Please fill in the form", formData).set({ caption: caption });
        form.setQxObjectId("dialog");
        button.addOwnedQxObject(form);
        form.promise().then(function (result) {
          _this5.debug(qx.util.Serializer.toJson(result));
          return dialog.Dialog.alert("Thank you for your input. See log for result.").set({ caption: caption + " 2" }).promise();
        });

        //    same as:
        //    (new dialog.Form({
        //      message: "Please fill in the form",
        //      formData: formData,
        //      allowCancel: true,
        //      caption: caption,
        //      callback: function( result )
        //      {
        //        dialog.alert("Thank you for your input:" + qx.util.Json.stringify(result).replace(/\\/g,"") );
        //      }
        //    })).show();
      },

      createWizard: function createWizard(caption) {
        var _this6 = this;

        /*
         * wizard widget
         */
        var pageData = [{
          "message": "<p style='font-weight:bold'>Create new account</p><p>Please create a new mail account.</p><p>Select the type of account you wish to create</p>",
          "formData": {
            "accountTypeLabel": {
              "type": "label",
              "label": "Please select the type of account you wish to create."
            },
            "accountType": {
              "type": "radiogroup",
              "label": "Account Type",
              "options": [{ "label": "E-Mail", "value": "email" }, { "label": ".mac", "value": ".mac" }, { "label": "RSS-Account", "value": "rss" }, { "label": "Google Mail", "value": "google" }, { "label": "Newsgroup Account", "value": "news" }]
            }
          }
        }, {
          "message": "<p style='font-weight:bold'>Identity</p><p>This information will be sent to the receiver of your messages.</p>",
          "formData": {
            "label1": {
              "type": "label",
              "label": "Please enter your name as it should appear in the 'From' field of the sent message. "
            },
            "fullName": {
              "type": "textfield",
              "label": "Your Name",
              "validation": {
                "required": true
              }
            },
            "label2": {
              "type": "label",
              "label": "Please enter your email address. This is the address used by others to send you messages."
            },
            "email": {
              "type": "textfield",
              "label": "E-Mail Address",
              "validation": {
                "required": true,
                "validator": qx.util.Validate.email()
              }
            },
            "birthday": {
              "type": "datefield",
              "label": "Birthday"
            }
          }
        }, {
          "message": "<p style='font-weight:bold'>Account</p><p>Bla bla bla.</p>",
          "formData": {
            "serverType": {
              "type": "radiogroup",
              "orientation": "horizontal",
              "label": "Select the type of email server",
              "options": [{ "label": "POP", "value": "pop" }, { "label": "IMAP", "value": "imap" }]
            },
            "serverAddressLabel": {
              "type": "label",
              "label": "Please enter the server for the account."
            },
            "serverAddress": {
              "type": "textfield",
              "label": "E-Mail Server",
              "validation": {
                "required": true
              }
            }
          }
        }, {
          "message": "<p style='font-weight:bold'>Username</p><p>Bla bla bla.</p>",
          "formData": {
            "emailUserName": {
              "type": "textfield",
              "label": "Inbox server user name:"
            }
          }
        }];
        var wizard = new dialog.Wizard({
          width: 500,
          maxWidth: 500,
          pageData: pageData,
          allowCancel: true,
          callback: function callback(map) {
            dialog.Dialog.alert("Thank you for your input. See log for result.");
            _this6.debug(qx.util.Serializer.toJson(map));
          },
          caption: caption
        });
        wizard.start();
      },

      /**
       * Creates a sample login widget
       */
      createLogin: function createLogin(caption, button) {
        var loginWidget = new dialog.Login({
          image: "dialog/logo.gif",
          text: "Please log in, using 'demo'/'demo'",
          checkCredentials: this.checkCredentials,
          callback: this.finalCallback.bind(this),
          showForgotPassword: true,
          caption: caption,
          forgotPasswordHandler: function forgotPasswordHandler() {
            window.alert("Too bad. I cannot remember it either.");
          }
        });
        this._replaceOwnedObject(button, loginWidget, "window");

        // you can optionally attach event listeners, for example to
        // do some animation (for example, an Mac OS-like "shake" effect)
        loginWidget.addListener("loginSuccess", function (e) {
          // do something to indicated that the user has logged in!
        });
        loginWidget.addListener("loginFailure", function (e) {
          // User rejected! Shake your login widget!
        });
        loginWidget.show();
        this.__loginWidget = loginWidget;
      },

      /**
       * Sample asyncronous function for checking credentials that takes the
       * username, password and a callback function as parameters. After performing
       * the authentication, the callback is called with the result, which should
       * be undefined or null if successful, and the error message if the
       * authentication failed. If the problem was not the authentication, but some
       * other exception, you could pass an error object.
       * @param username {String}
       * @param password {String}
       * @param callback {Function} The callback function that needs to be called with
       * (err, data) as arguments
       */
      checkCredentials: function checkCredentials(username, password, callback) {
        if (username === "demo" && password === "demo") {
          callback(null, username);
        } else {
          callback("Wrong username or password!");
        }
      },

      /**
       * Sample final callback to react on the result of the authentication
       * @param err {String|Error|undefined|null}
       * @param data
       */
      finalCallback: function finalCallback(err, data) {
        if (err) {
          var loginError = dialog.Dialog.alert(err).set({ caption: "Login Error" });
          this._replaceOwnedObject(this.__loginWidget, loginError, "error");
        } else {
          var loginSuccess = dialog.Dialog.alert("User '" + data + "' is now logged in.").set({ caption: "Login Success" });
          this._replaceOwnedObject(this.__loginWidget, loginSuccess, "success");
        }
      },

      createProgress: function createProgress(caption) {
        var progressWidget = new dialog.Progress({
          caption: caption,
          allowCancel: true
        });
        progressWidget.show().promise().then(function (result) {
          console.log("Progress widget returned: " + result);
        });

        var counter = 0;
        (function incrementProgress() {
          progressWidget.set({
            progress: counter,
            message: counter + "% completed",
            allowCancel: true
          });
          if (counter++ === 100) return;
          qx.lang.Function.delay(incrementProgress, 100);
        })();
      },

      createProgressWithLog: function createProgressWithLog(caption) {
        var cancelled = false; // used in closures
        var progressWidget = new dialog.Progress({
          showLog: true,
          caption: caption,
          okButtonText: "Continue",
          allowCancel: true,
          hideWhenCancelled: false
        });
        progressWidget.show().promise().then(function (result) {
          if (!result) {
            // user clicked on "cancel" button, can also be intercepted by listening
            // to the "cancel event"
            cancelled = true;
          }
          console.log("Progress widget returned: " + result);
        });
        var counter = 0;
        var abortMessage = false;
        (function textProgress() {
          if (cancelled) {
            progressWidget.set({
              progress: counter,
              message: "Aborting..."
            });
            if (!abortMessage) {
              progressWidget.setNewLogText("Aborting...");
              abortMessage = true;
            }
          } else {
            progressWidget.set({
              progress: counter,
              message: counter + "% completed"
            });
            if (counter % 10 === 0) {
              progressWidget.setNewLogText(counter + "% completed");
            }
          }

          if (counter++ === 100) {
            var msg = cancelled ? "Cancelled." : "Completed.";
            progressWidget.set({
              newLogText: msg,
              message: msg
            });
            return;
          }
          if (cancelled) {
            qx.lang.Function.delay(textProgress, 5);
          } else {
            qx.lang.Function.delay(textProgress, 100);
          }
        })();
      }
    }
  });
  dialog.demo.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1555325101874