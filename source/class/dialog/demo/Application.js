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
 * This is the main application class of your custom application "dialog"
 * @asset(dialog/*)
 * @require(dialog.Dialog)
 */
qx.Class.define("dialog.demo.Application",
  {
    extend: qx.application.Standalone,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members:
      {
        /**
         * This method contains the initial application code and gets called
         * during startup of the application
         */
        main: function () {
          // Call super class
          this.base(arguments);

          // support native logging capabilities, e.g. Firebug for Firefox
          qx.log.appender.Native;

          /*
           * button data
           */
          let buttons =
            [
              {
                label: "Alert",
                id: "alert",
                method: "createAlert"
              },
              {
                label: "Warning",
                id: "warning",
                method: "createWarning"
              },
              {
                label: "Error",
                id: "error",
                method: "createError"
              },
              {
                label: "Confirm",
                id: "confirm",
                method: "createConfirm"
              },
              {
                label: "Prompt",
                id: "prompt",
                method: "createPrompt"
              },
              {
                label: "Dialog Chain",
                id: "dialog",
                method: "createDialogChain"
              },
              {
                label: "Select among choices",
                id: "select",
                method: "createSelect"
              },
              {
                label: "Form",
                id: "form",
                method: "createForm"
              },
              {
                label: "Wizard",
                id: "wizard",
                method: "createWizard"
              },
              {
                label: "Login",
                id: "login",
                method: "createLogin"
              },
              {
                label: "Progress",
                id: "progress",
                method: "createProgress"
              },
              {
                label: "Progress with Log",
                id: "progress_with_log",
                method: "createProgressWithLog"
              }
            ];

          /*
           * dialog button panel
           */
          let button_panel = new qx.ui.container.Composite();
          button_panel.setLayout(new qx.ui.layout.VBox(5));

          qx.core.Id.getInstance().register(button_panel,"buttons");
          button_panel.setObjectId("buttons");

          let title = new qx.ui.basic.Label("<h2>Dialog Demo</h2>");
          title.setRich(true);
          button_panel.add(title);

          // check box
          let blockerCheckBox = new qx.ui.form.CheckBox("Use coloured blocker (like < v.1.3)");
          blockerCheckBox.addListener("changeValue", function (e) {
            dialog.Dialog.useBlocker(e.getData());
          });
          button_panel.add(blockerCheckBox);

          // icon theme switcher
          let labelHBox = new qx.ui.basic.Label("<strong>Icon Theme</strong>");
          labelHBox.setRich(true);
          button_panel.add(labelHBox);
          let radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup();
          radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
          button_panel.add(radioButtonGroupHBox);
          radioButtonGroupHBox.addListener("changeSelection", function (e) {
            let theme = e.getData()[0].getModel();
            qx.theme.manager.Icon.getInstance().setTheme(theme);
          });

          // icon theme
          let metathemes = [];
          let iconthemes = [];
          let themes = qx.Theme.getAll();
          for (let key of Object.getOwnPropertyNames(themes)) {
            let theme = themes[key];
            if (theme.type === "meta") {
              //
            }
            if (theme.name.indexOf("dialog.theme.icon") !== -1) {
              let button = new qx.ui.form.RadioButton(theme.title);
              button.setModel(theme);
              radioButtonGroupHBox.add(button);
            }
          }

          // buttons
          button_panel.add(new qx.ui.basic.Label("Try out the following dialog widgets:"));
          buttons.forEach(function (button_data) {
            let button = new qx.ui.form.Button(button_data.label);
            button_panel.addOwnedObject(button, button_data.id);
            button.addListener("execute", function () {
              this[button_data.method](button_data.label, button);
            }, this);
            if (button_data.enabled !== undefined) {
              button.setEnabled(button_data.enabled);
            }
            button_panel.add(button);
          }, this);
          this.getRoot().add(button_panel, {left: 100, top: 100});

        },

        _replaceOwnedObject: function(owner, obj, id){
          try {
            owner.removeOwnedObject(id);
          } catch (e) {} // ignore error
          owner.addOwnedObject(obj, id);
        },

        createAlert: function (caption, button) {
          let dlg = dialog.Dialog
            .alert("Hello World!")
            .set({caption});

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

        createWarning: function (caption, button) {
          let dlg = dialog.Dialog
            .warning("I warned you!")
            .set({caption});
          this._replaceOwnedObject(button, dlg, "dialog");
        },

        createError: function (caption, button) {
          let dlg = dialog.Dialog
            .error("Error, error, error, errr....!")
            .set({caption});
          this._replaceOwnedObject(button, dlg, "dialog");
        },

        createConfirm: function (caption, button) {
          let dlg = dialog.Dialog
            .confirm("Do you really want to erase your hard drive?")
            .set({caption});
          this._replaceOwnedObject(button, dlg, "dialog1");

          dlg.promise()
            .then(result => {
              let dlg2 = dialog.Dialog.alert("Your answer was: " + result)
                  .set({caption: caption + " 2"});
              this._replaceOwnedObject(button, dlg, "dialog2");
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

        createPrompt: function (caption, button) {
          let dlg = dialog.Dialog
            .prompt("Please enter the root password for your server")
            .set({caption});
          this._replaceOwnedObject(button, dlg, "dialog1");
          dlg.promise()
            .then(result => {
              let dlg2 = dialog.Dialog.alert("Your answer was: " + result)
                .set({caption: caption + " 2"});
              this._replaceOwnedObject(button, dlg2, "dialog2");
            });
        },

        /**
         * Example for nested callbacks
         */
        createDialogChain: function (caption, button) {
          let dlg1 = dialog.Dialog
            .alert("This demostrates a series of 'nested' dialogs ")
            .set({caption});
          this._replaceOwnedObject(button, dlg1, "dialog1");
          dlg1.promise()
            .then(() => {
              let dlg2 = dialog.Dialog
                .confirm("Do you believe in the Loch Ness monster?")
                .set({caption: caption + " 2"});
              this._replaceOwnedObject(button, dlg2, "dialog2");
              return dlg2.promise();
            })
            .then(result => {
              let dlg3 = dialog.Dialog
                .confirm("You really " + (result ? "" : "don't ") + "believe in the Loch Ness monster?")
                .set({caption: caption + " 3",});
              this._replaceOwnedObject(button, dlg3, "dialog3");
              return dlg3.promise();
            })
            .then(result => {
              let dlg4 = dialog.Dialog
                .alert(result ? "I tell you a secret: It doesn't exist." : "Good to know.")
                .set({caption: caption + " 4"});
              this._replaceOwnedObject(button, dlg4, "dialog4");
              return dlg4.promise();
            });
        },

        /**
         * Offer a selection of choices to the user
         */
        createSelect: function (caption, button) {
          let dlg1 = dialog.Dialog
            .select("Select the type of record to create:")
            .set({
              caption: caption,
              options: [
                {label: "Database record", value: "database"},
                {label: "World record", value: "world"},
                {label: "Pop record", value: "pop"}
              ]
            });
          this._replaceOwnedObject(button, dlg1, "dialog1");
          dlg1.promise()
            .then(result => {
              let dlg2 = dialog.Dialog
                .alert("You selected: '" + result + "'")
                .set({caption: caption + " 2"});
              this._replaceOwnedObject(button, dlg2, "dialog2");
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

        createForm: function (caption) {
          let formData =
            {
              'username':
                {
                  'type': "TextField",
                  'label': "User Name",
                  'value': "",
                  "validation": {
                    "required": true
                  }
                },
              'address':
                {
                  'type': "TextArea",
                  'label': "Address",
                  'lines': 3,
                  'value': ""
                },
              'domain':
                {
                  'type': "SelectBox",
                  'label': "Domain",
                  'value': 1,
                  'options': [
                    {'label': "Company", 'value': 0},
                    {'label': "Home", 'value': 1}
                  ]
                },
              'commands':
                {
                  'type': "ComboBox",
                  'label': "Shell command to execute",
                  'value': "",
                  'options': [
                    {'label': "ln -s *"},
                    {'label': "rm -Rf /"}
                  ]
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
                "fractionsDigits": {min: 1, max: 7}
              }
            };

          dialog.Dialog.form("Please fill in the form", formData)
            .set({caption})
            .promise()
            .then(result => {
              this.debug(qx.util.Serializer.toJson(result));
              return dialog.Dialog
                .alert("Thank you for your input. See log for result.")
                .set({caption: caption + " 2"})
                .promise();
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

        createWizard: function (caption) {
          /*
           * wizard widget
           */
          let pageData =
            [
              {
                "message": "<p style='font-weight:bold'>Create new account</p><p>Please create a new mail account.</p><p>Select the type of account you wish to create</p>",
                "formData": {
                  "accountTypeLabel": {
                    "type": "label",
                    "label": "Please select the type of account you wish to create."
                  },
                  "accountType": {
                    "type": "radiogroup",
                    "label": "Account Type",
                    "options":
                      [
                        {"label": "E-Mail", "value": "email"},
                        {"label": ".mac", "value": ".mac"},
                        {"label": "RSS-Account", "value": "rss"},
                        {"label": "Google Mail", "value": "google"},
                        {"label": "Newsgroup Account", "value": "news"}
                      ]
                  }
                }
              },
              {
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
              },
              {
                "message": "<p style='font-weight:bold'>Account</p><p>Bla bla bla.</p>",
                "formData": {
                  "serverType": {
                    "type": "radiogroup",
                    "orientation": "horizontal",
                    "label": "Select the type of email server",
                    "options":
                      [
                        {"label": "POP", "value": "pop"},
                        {"label": "IMAP", "value": "imap"}
                      ]
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
              },
              {
                "message": "<p style='font-weight:bold'>Username</p><p>Bla bla bla.</p>",
                "formData": {
                  "emailUserName": {
                    "type": "textfield",
                    "label": "Inbox server user name:"
                  }
                }
              }
            ];
          let wizard = new dialog.Wizard({
            width: 500,
            maxWidth: 500,
            pageData: pageData,
            allowCancel: true,
            callback: map => {
              dialog.Dialog.alert("Thank you for your input. See log for result.");
              this.debug(qx.util.Serializer.toJson(map));
            },
            caption: caption
          });
          wizard.start();
        },

        /**
         * Creates a sample login widget
         */
        createLogin: function (caption, button) {
          let loginWidget = new dialog.Login({
            image: "dialog/logo.gif",
            text: "Please log in, using 'demo'/'demo'",
            checkCredentials: this.checkCredentials,
            callback: this.finalCallback.bind(this),
            showForgotPassword: true,
            caption: caption,
            forgotPasswordHandler: function () {
              window.alert("Too bad. I cannot remember it either.");
            }
          });
          this._replaceOwnedObject(button,loginWidget,"window");

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
        checkCredentials: function (username, password, callback) {
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
        finalCallback: function (err, data) {
          if (err) {
            let loginError = dialog.Dialog
              .alert(err)
              .set({ caption: "Login Error" });
            this._replaceOwnedObject(this.__loginWidget,loginError,"error");
          } else {
            let loginSuccess = dialog.Dialog
              .alert("User '" + data + "' is now logged in.")
              .set({ caption: "Login Success" });
            this._replaceOwnedObject(this.__loginWidget,loginSuccess,"success");
          }
        },

        createProgress: function (caption) {
          let progressWidget = new dialog.Progress({
            caption: caption,
            allowCancel: true
          });
          progressWidget.show()
            .promise()
            .then(function (result) {
              console.log("Progress widget returned: " + result);
            });

          let counter = 0;
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

        createProgressWithLog: function (caption) {
          let cancelled = false; // used in closures
          let progressWidget = new dialog.Progress({
            showLog: true,
            caption: caption,
            okButtonText: "Continue",
            allowCancel: true,
            hideWhenCancelled: false
          });
          progressWidget.show()
            .promise()
            .then(function (result) {
              if (!result) {
                // user clicked on "cancel" button, can also be intercepted by listening
                // to the "cancel event"
                cancelled = true;
              }
              console.log("Progress widget returned: " + result);
            });
          let counter = 0;
          let abortMessage = false;
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
              let msg = cancelled ? "Cancelled." : "Completed.";
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