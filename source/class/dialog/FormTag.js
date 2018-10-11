/* ************************************************************************

   qooxdoo dialog library
  
   http://qooxdoo.org/contrib/catalog/#Dialog
  
   Copyright:
     2018 Derrell Lipman
  
   License:
     MIT: https://opensource.org/licenses/MIT
  
   Authors:
   *  Derrell Lipman
  
************************************************************************ */

qx.Class.define("dialog.FormTag",
{
  extend : qx.ui.container.Composite,

  construct : function(layout)
  {
    this.base(arguments, layout || new qx.ui.layout.VBox() );
  },

  members :
  {
    // overridden
    // Instead of creating a <div> for the content element, use <form>
    _createContentElement : function()
    {
      return new qx.html.Element("form");
    }
  }
});
