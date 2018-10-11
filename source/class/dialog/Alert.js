  /* ************************************************************************

   qooxdoo dialog library
  
   http://qooxdoo.org/contrib/catalog/#Dialog
  
   Copyright:
     2007-2014 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */
/*global qx dialog*/

/**
 * A dialog that alerts the user to something.
 * @asset(qx/icon/${qx.icontheme}/48/status/dialog-information.png)
 */
qx.Class.define("dialog.Alert",
{
  extend : dialog.Dialog,
 
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */     
  members :
  {
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Create the main content of the widget
     */
    _createWidgetContent : function()
    {      

      /*
       * groupbox
       */
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({        
        margin          : [ 15, 15, 15, 15 ],
        maxWidth        : 600,
        backgroundColor : "dialog-background"
      });
      
      groupboxContainer.setLayout( new qx.ui.layout.VBox(10) );
      this.add( groupboxContainer );

      var hbox = new qx.ui.container.Composite;
      var decorator = new qx.ui.decoration.Decorator();
      decorator.set({
        shadowColor: "dialog-shadow",
        shadowLength: 0,
        shadowBlurRadius: 30
      });
      this.setDecorator(decorator);      
      hbox.setBackgroundColor("dialog-background");      
      
      // Create a layout for dialog alert
      var layout = new qx.ui.layout.Grid(10, 5);
      layout.setSpacingX(18);    
      layout.setRowFlex(0, 1);    // make row 0 flexible

      layout.setColumnAlign(0, "center", "middle");      
      layout.setRowAlign(1, "center", "middle");

      // Set column widths
      [ 90, 410 ].forEach(
        function(width, index)
        {
          layout.setColumnWidth(index, width);
        });

      // Set row height
      layout.setRowHeight(0, 45);
      layout.setRowHeight(1, 25);

      hbox.setLayout(layout);
      groupboxContainer.add( hbox );
      
      /*
       * add image 
       */
      this._image = new qx.ui.basic.Image(this.getImage() || "dialog/notification-icon.png" );
      //this._image.renderLayout( 0, 0, 48, 48 );
      hbox.add( this._image, { row : 0, column : 0, rowSpan : 2 } );
      
      /*
       * Add message label
       */
      this._message = new qx.ui.basic.Label();
      this._message.set({
        backgroundColor : "dialog-background",
        rich            : true,
        width           : 200,
        marginTop       : 5,
        allowStretchX   : true
      });      
      hbox.add( this._message, { row : 0, column : 1 } );    
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();
      
      /*
       * buttons pane
       */      
      hbox.add(okButton, { row : 1, column : 1 });

      /*
       * focus OK button on appear
       */
      this.addListener("appear",function() {
        okButton.focus();
      });
    }
  }
});
