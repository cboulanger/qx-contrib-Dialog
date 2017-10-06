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
 * A widget with a progress bar and an optional log for messages.
 */
qx.Class.define("dialog.Progress", {
  extend: dialog.Dialog,
  properties: {

    /**
     * The percentage of the progress, 0-100
     */
    progress: {
      check: function(value) {
        return qx.lang.Type.isNumber(value) && value >= 0 && value <= 100;
      },
      init: 0,
      nullable: false,
      event: "changeProgress",
      apply: "_applyProgress"
    },

    /**
     * The content of the log
     */
    logContent: {
      check: "String",
      init: "",
      event: "changeLogContent"
    },

    /**
     * New text that should be written to the log
     */
    newLogText: {
      check: "String",
      nullable: false,
      event: "changeNewLogText",
      apply: "_applyNewLogText"
    },

    /**
     * Whether or not the progress bar is visible
     * (default: true)
     */
    showProgressBar: {
      check: "Boolean",
      nullable: false,
      init: true,
      event: "changeShowProgressBar"
    },

    /**
     * Whether or not the log is visible
     * (default: false)
     */
    showLog: {
      check: "Boolean",
      nullable: false,
      init: false,
      event: "changeShowLog"
    },

    /**
     * The text of the OK button. If null, hide the button.
     * (default: null)
     */
    okButtonText: {
      check: "String",
      nullable: true,
      init: null,
      event: "changeOkButtonText",
      apply: "_applyOkButtonText"
    },

    /**
     * Whether to hide the widget when the progress is at 100%
     * (default:true)
     */
    hideWhenCompleted: {
      check: "Boolean",
      nullable: false,
      init: true
    },

    /**
     * Whether to hide the widget when the cancel button is clicked
     * (default: true)
     */
    hideWhenCancelled: {
      check: "Boolean",
      nullable: false,
      init: true
    }
  },
  members: {
    /**
     * Applies the 'show' property
     */
    _applyShow: function(value, old) {
      if (value === true) {
        this.show();
      } else if (value === false) {
        this.hide();
      }
    },

    /**
     * Applies the 'progress' property
     */
    _applyProgress: function(value, old) {
      if (value == 100) {
        if (this.isHideWhenCompleted()) {
          this._handleOk();
        } else {
          this._cancelButton.setEnabled(false);
        }
      }
    },

    /**
     * Adds new text to the log
     */
    _applyNewLogText: function(value, old) {
      if (value) {
        var content = this.getLogContent();
        this.setLogContent(content ? content + "\n" + value : value);
      }
    },

    /**
     * Apply the OK Button text
     */
    _applyOkButtonText: function(value, old) {
      if (value === null) {
        this._okButton.setVisibility("excluded");
        return;
      }
      this._okButton.setLabel(value);
      this._okButton.show();
      this.setHideWhenCompleted(false);
    },
    _progressBar: null,
    _logView: null,

    /**
     * Create the content of the dialog.
     * Extending classes must implement this method.
     */
    _createWidgetContent: function() {
      var container = new qx.ui.container.Composite().set({ width: 300 });
      container.setLayout(new qx.ui.layout.VBox(5));
      this.add(container);
      var hbox = new qx.ui.container.Composite();
      hbox.set({
        layout: new qx.ui.layout.HBox(10),
        height: 30
      });
      container.add(hbox);
      this._progressBar = new qx.ui.indicator.ProgressBar();
      this._progressBar.set({
        maxHeight: 20,
        alignY: "middle"
      });
      this.bind("progress", this._progressBar, "value");
      hbox.add(this._progressBar, {
        flex: 1
      });
      this._cancelButton = this._createCancelButton();
      this._cancelButton.set({
        icon: null,
        maxHeight: 20,
        alignY: "middle",
        visibility: "excluded"
      });
      hbox.add(this._cancelButton);
      this.bind("showProgressBar", hbox, "visibility", {
        converter: function(v) {
          return v ? "visible" : "excluded";
        }
      });
      this._message = new qx.ui.basic.Label();
      this._message.set({
        rich: true,
        textAlign: "center"
      });
      container.add(this._message);
      this._logView = new qx.ui.form.TextArea();
      this._logView.set({
        visibility: "excluded",
        height: 200
      });
      container.add(this._logView, {
        flex: 1
      });
      this.bind("showLog", this._logView, "visibility", {
        converter: function(v) {
          return v ? "visible" : "excluded";
        }
      });
      this.bind("logContent", this._logView, "value");
      this._logView.bind("value", this, "logContent");
      this._okButton = this._createOkButton();
      this._okButton.set({
        visibility: "excluded",
        enabled: false,
        alignX: "center",
        icon: null
      });
      this._progressBar.addListener(
        "complete",
        function() {
          this._okButton.setEnabled(true);
        },
        this
      );
      container.add(this._okButton, {});
    },

    /**
     * Handle click on cancel button. Calls callback with
     * an "undefined" argument
     * @override Overridden to be able to observe hideWhenCancelled
     * property
     */
    _handleCancel: function() {
      if (this.isHideWhenCancelled()) {
        this.hide();
      }
      this.fireEvent("cancel");
      if (this.isAllowCancel() && this.getCallback()) {
        this.getCallback().call(this.getContext());
      }
      this.resetCallback();
    }
  }
});
