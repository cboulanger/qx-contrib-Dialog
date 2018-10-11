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
 * Confirmation popup singleton
 */
qx.Class.define("dialog.Confirm",
{
  extend : dialog.Dialog,
  
  /*
  *****************************************************************************
     STATIC METHODS
  *****************************************************************************
  */     
  statics:
  {
    /**
     * Returns singleton instance of this class. This method has to
     * be part of any subclass extending this widget.
     */
    getInstance : function()
    {
      return this.superclass.getInstance(this.classname);
    }
  },
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
		/**
		 * Label used for the "yes button"
		 */
    yesButtonLabel :
    {
      check : "String",
      nullable : false,
      init : "Yes",
      event : "changeYesButtonLabel"
    },

		/**
		 * Icon used for the "yes button"
		 */
    yesButtonIcon :
    {
      check : "String",
      nullable : true,
      // init : "icon/22/actions/dialog-ok.png",
      event : "changeYesButtonIcon"
    },    
    
		/**
		 * Label used for the "no button"
		 */
    noButtonLabel :
    {
      check : "String",
      nullable : false,
      init : "No",
      event : "changeNoButtonLabel"
    },

		/**
		 * Icon used for the "no button"
		 */
    noButtonIcon :
    {
      check : "String",
      nullable : true,
      // init : "icon/22/actions/dialog-cancel.png",
      event : "changeNoButtonIcon"
    },
    
		/**
		 * This property controls the display of a cancel button
		 */
    allowCancel :
    {
      refine : true,
      init : false
    }
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */     
  members :
  {
    
    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */
    _yesButton : null,
    _noButton  : null,
    
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
      var decorator = new qx.ui.decoration.Decorator();
      decorator.set({
        shadowColor       : "dialog-shadow",
        shadowLength      : 0,
        shadowBlurRadius  : 30
      });
      this.setDecorator(decorator);
      
      groupboxContainer.setLayout( new qx.ui.layout.VBox(10) );
      this.add( groupboxContainer );

      var hbox = new qx.ui.container.Composite;
      hbox.setBackgroundColor("dialog-background");
      // Create a layout for dialog alert
      var layout = new qx.ui.layout.Grid(10, 5);
      layout.setSpacingX(21);
      layout.setRowFlex(0, 1);// make row 0 flexible
      hbox.setLayout(layout);

      layout.setColumnAlign(0, "left", "top");
      layout.setColumnAlign(1, "left", "middle");
      layout.setRowAlign(1, "center", "bottom");


      // Set column widths
      [ 95, 410 ].forEach(
        function(width, index)
        {
          layout.setColumnWidth(index, width);
        });

      // Set row height
      layout.setRowHeight(0, 45);
      layout.setRowHeight(1, 25);

      groupboxContainer.add( hbox );
      
      /*
       * add image 
       */
      this._image = new qx.ui.basic.Image(this.getImage() || "dialog/notification-icon.png");
      this._image.renderLayout( 0, 0, 48, 48 );
      hbox.add( this._image, { row : 0, column : 0, rowSpan : 2 });
      
      /*
       * Add message label
       */
      this._message = new qx.ui.basic.Label();
      this._message.set({
        backgroundColor : "dialog-background",
        rich            : true,        
        allowStretchX   : true
      }); 
      hbox.add( this._message, { row : 0, column : 1 } );
      
      /* 
       * Yes button 
       */
      var yesButton = this._yesButton =  new qx.ui.form.Button;      
      yesButton.set({
        allowStretchX : true,
        width         : 70,
        height        : 25
      });
      yesButton.addListener("execute", this._handleYes, this );
      this.bind("yesButtonLabel", yesButton, "label");
      this.bind("yesButtonIcon",  yesButton, "icon");
      yesButton.setLabel( this.tr("Yes") );
      
      /* 
       * No button 
       */
      var noButton = this._noButton = new qx.ui.form.Button;      
      noButton.set({
        allowStretchX : true,
        width         : 70,
        height        : 25,
        marginLeft    : 10
      });
      noButton.addListener("execute", this._handleNo, this );
      this.bind("noButtonLabel",noButton, "label" );
      this.bind("noButtonIcon", noButton, "icon" );
      noButton.setLabel( this.tr("No") );
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      
      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.set({
        layout          : bpLayout,
        backgroundColor : "dialog-background"
      });
      buttonPane.add( yesButton );
      buttonPane.add( noButton );
      buttonPane.add( cancelButton );
      hbox.add(buttonPane, { row : 1, column : 1 });
    },
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on yes button. Calls callback with
     * a "true" value
     */
    _handleYes : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback().call(this.getContext(),true);
      }
      this.resetCallback();
    },  

    /**
     * Handle click on no button. Calls callback with 
     * a "false" value
     */
    _handleNo : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback().call(this.getContext(),false);
      }
    } 
  }
});
