qooxdoo Dialog widgets
======================

see http://qooxdoo.org/contrib/catalog/#Dialog

A set of often used dialog widgets for the qooxdoo framework.

- Alert
- Confirm
- Form
- Login
- Prompt
- Select
- Wizard
- Progress

See demo/default/source/class/dialog/demo/Application.js for examples how to use
the widgets.

Change log
----------

v1.3
- bumped qooxdoo version to 5.1
- changed base widget from qx.ui.GroupBox to a modal qx.ui.window.Window (merged
  from jbruwes/qooxdialog).
  - Added caption parameter to shorthand methods.
  - Since a modal window has its own blocker, the  default coloured blocker has
  been removed. If you want the old behavior, call `dialog.Dialog.useBlocker(true)`.

v1.2
- fixed a bug that prevented submitting the login dialog by pressing enter
  (patch by @novij)
- added "Forgot Password?" button to login widget

v1.1
- compatible with qooxdoo v4.0
- Progress dialog widget added

v1.0
- compatible with qooxdoo v3.5
