(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "dialog.Dialog": {
        "require": true
      },
      "dialog.FormTag": {},
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.Grid": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.Button": {},
      "qx.lang.Function": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("dialog.Login", {
    extend: dialog.Dialog,
    properties: {

      /**
       * A html text that is displayed below the image (if present) and above the
       * login
       */
      text: {
        check: "String",
        nullable: true,
        apply: "_applyText"
      },

      /**
       * The name of the font in the theme that should be applied to
       * the text
       */
      textFont: {
        check: "String",
        nullable: true,
        init: "bold",
        apply: "_applyTextFont"
      },

      /**
       * An asyncronous function to check the given credentials.
       * The function signature is (username, password, callback). In case the
       * login fails, the callback must be called with a string that can be
       * alerted to the user or the error object if the problem is not due to
       * authentication itself. If the login succeeds, the argument must be
       * undefined or null. You can pass a second argument containing user
       * information.
       */
      checkCredentials: {
        check: "Function",
        nullable: false
      },

      /**
       * Whether to show a button with "Forgot Password?"
       */
      showForgotPassword: {
        check: "Boolean",
        nullable: false,
        init: false,
        event: "changeShowForgotPassword"
      },

      /**
       * The function that is called when the user clicks on the "Forgot Password?"
       * button
       */
      forgotPasswordHandler: {
        check: "Function"
      }
    },

    events: {
      /**
       * Event dispatched when login was successful
       */
      loginSuccess: "qx.event.type.Data",

      /**
       * Data event dispatched when login failed, event data
       * contains a reponse message
       */
      loginFailure: "qx.event.type.Data"
    },

    members: {
      _text: null,
      _username: null,
      _password: null,

      /**
       * Apply function used by proterty {@link #text}
       * @param value {String} New value
       * @param old {String} Old value
       */
      _applyText: function _applyText(value, old) {
        this._text.setValue(value);
        this._text.setVisibility(value ? "visible" : "excluded");
      },

      /**
       * Apply function used by proterty {@link #textFont}
       * @param value {String} New value
       */
      _applyTextFont: function _applyTextFont(value) {
        this._text.setFont(value);
      },

      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        // wrap fields in form tag to avoid Chrome warnings, see https://github.com/cboulanger/qx-contrib-Dialog/issues/19
        var formTag = new dialog.FormTag();
        var container = this._createDialogContainer();
        container.getLayout().setAlignX("center");
        formTag.add(container, { flex: 1 });
        this.add(formTag);
        this._image = new qx.ui.basic.Image();
        this._image.setVisibility("excluded");
        container.add(this._image);
        this._text = new qx.ui.basic.Label();
        this._text.setAllowStretchX(true);
        this._text.setVisibility("excluded");
        this.setTextFont("bold");
        container.add(this._text);
        var form = new qx.ui.container.Composite();
        var gridLayout = new qx.ui.layout.Grid(9, 5);
        gridLayout.setColumnAlign(0, "right", "top");
        gridLayout.setColumnAlign(2, "right", "top");
        gridLayout.setColumnMinWidth(0, 50);
        gridLayout.setColumnFlex(1, 2);
        form.setLayout(gridLayout);
        form.setAlignX("center");
        form.setMinWidth(200);
        form.setMaxWidth(400);
        container.add(form);
        var labels = [this.tr("Name"), this.tr("Password")];
        for (var i = 0; i < labels.length; i++) {
          form.add(new qx.ui.basic.Label(labels[i]).set({
            allowShrinkX: false,
            paddingTop: 3
          }), {
            row: i,
            column: 0
          });
        }
        this._username = new qx.ui.form.TextField();
        this._password = new qx.ui.form.PasswordField();
        this._password.getContentElement().setAttribute("autocomplete", "password");
        this._password.addListener("keypress", function (e) {
          if (e.getKeyIdentifier() === "Enter") {
            this._callCheckCredentials();
          }
        }, this);
        form.add(this._username.set({
          allowShrinkX: false,
          paddingTop: 3
        }), {
          row: 0,
          column: 1
        });
        form.add(this._password.set({
          allowShrinkX: false,
          paddingTop: 3
        }), {
          row: 1,
          column: 1
        });
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setAllowStretchX(true);
        this._message.setVisibility("excluded");
        container.add(this._message);

        // buttons
        var buttonPane = this._createButtonPane();

        // login
        var loginButton = this._loginButton = new qx.ui.form.Button(this.tr("Login"));
        loginButton.setAllowStretchX(false);
        loginButton.addListener("execute", this._callCheckCredentials, this);

        // cancel
        var cancelButton = this._createCancelButton();

        // forgot password
        var forgotPasswordButton = new qx.ui.form.Button(this.tr("Forgot Password?"));
        forgotPasswordButton.addListener("click", function () {
          this.getForgotPasswordHandler()();
        }, this);
        this.bind("showForgotPassword", forgotPasswordButton, "visibility", {
          converter: function converter(v) {
            return v ? "visible" : "excluded";
          }
        });

        buttonPane.add(loginButton);
        buttonPane.add(cancelButton);
        buttonPane.add(forgotPasswordButton);
        form.add(buttonPane, {
          row: 3,
          column: 1
        });
        // object ids
        form.setQxObjectId("form");
        this.addOwnedQxObject(form);
        this._username.setQxObjectId("username");
        form.addOwnedQxObject(this._username);
        this._password.setQxObjectId("password");
        form.addOwnedQxObject(this._password);
        loginButton.setQxObjectId("login");
        buttonPane.addOwnedQxObject(loginButton);
        forgotPasswordButton.setQxObjectId("forgot-password");
        buttonPane.addOwnedQxObject(forgotPasswordButton);
        this.addOwnedQxObject(forgotPasswordButton);
      },

      /**
       * Calls the checkCredentials callback function with username, password and
       * the final callback, bound to the context object.
       */
      _callCheckCredentials: function _callCheckCredentials() {
        this.getCheckCredentials()(this._username.getValue(), this._password.getValue(), typeof Function.prototype.bind === "function" ? this._handleCheckCredentials.bind(this) : qx.lang.Function.bind(this._handleCheckCredentials, this));
      },

      /**
       * Handle click on cancel button
       */
      _handleCancel: function _handleCancel() {
        this.hide();
      },

      /**
       * Handler function called from the function that checks the credentials
       * with the result of the authentication process.
       * @param err {String|Error|null} If null, the authentication was successful
       * and the "loginSuccess" event is dispatched. If String or Error, the
       * "loginFailure" event is dispatched with the error message/object.
       * Finally, the callback function in the callback property is called with
       * null (success) or the error value.
       * @param data {unknown|undefined} Optional second argument wich can contain
       * user information
       */
      _handleCheckCredentials: function _handleCheckCredentials(err, data) {
        //this._password.setValue("");
        this.setMessage(null);
        if (err) {
          this.fireDataEvent("loginFailure", err);
          this._username.addListenerOnce('focus', function () {
            qx.event.Timer.once(function () {
              this._username.selectAllText();
            }, this, 100);
          }, this);
          this._password.addListenerOnce('focus', function () {
            qx.event.Timer.once(function () {
              this._password.selectAllText();
            }, this, 100);
          }, this);
        } else {
          this.fireDataEvent("loginSuccess", data);
          this.hide();
        }
        if (this.getCallback()) {
          this.getCallback()(err, data);
        }
      },

      /**
       * @override
       */
      hide: function hide() {
        this._password.setValue("");
        this.setMessage(null);
        dialog.Login.prototype.hide.base.call(this);
      }
    }
  });
  dialog.Login.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Login.js.map?dt=1555325129692