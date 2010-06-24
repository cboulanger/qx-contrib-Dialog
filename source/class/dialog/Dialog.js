/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/* ************************************************************************
#asset(qx/icon/${qx.icontheme}/22/actions/dialog-cancel.png)
#asset(qx/icon/${qx.icontheme}/22/actions/dialog-ok.png)
#asset(qx/icon/${qx.icontheme}/48/status/dialog-information.png)

#ignore(dialog.alert)
#ignore(dialog.confirm)
#ignore(dialog.prompt)
#ignore(dialog.select)
************************************************************************ */


/**
 * Base class for dialog widgets
 */
qx.Class.define("dialog.Dialog",
{
  extend : qx.ui.container.Composite,
  
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */     
  statics :
  {
  
    /**
     * Returns a dialog instance by type
     * @param type {String}
     * @return dialog.Dialog
     */
    getInstanceByType : function(type)
    {      
       try 
       {
         return new dialog[qx.lang.String.firstUp(type)];
       }
       catch(e)
       {
         this.error(type + " is not a valid dialog type");
       }
    },
    
    /**
     * Initialize the package
     * @deprecated
     */    
    init : function()
    {
      qx.core.Init.getApplication().warn("Initializing the Dialog package is no longer necessary. Please remove calls to 'dialog.Dialog.init()', which is now deprecated.");
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
     * Callback function that will be called when the user 
     * has interacted with the widget. See sample callback
     * method supplied in the source code of each dialog 
     * widget.
     */
    callback : 
    {
      check : "Function",
      nullable : true
    },
    
    /**
     * A banner image/logo that is displayed on the widget,
     * if applicable
     */
    image : 
    {
      check : "String",
      nullable : true,
      apply : "_applyImage"
    },
    
    /**
     * The message that is displayed
     */
    message :
    {
      check : "String",
      nullable : true,
      apply : "_applyMessage"
    }, 
    
    /**
     * Whether to block the ui while the widget is displayed
     */
    useBlocker :
    {
      check : "Boolean",
      init : true
    },
    
    /**
     * The blocker's color
     */
    blockerColor :
    {
      check : "String",
      init : "black"
    },
    
    /**
     * The blocker's opacity
     */
    blockerOpacity :
    {
      check : "Number",
      init : 0.5
    },
    
    /**
     * Whether to allow cancelling the dialog
     */
    allowCancel :
    {
      check : "Boolean",
      init : true,
      event : "changeAllowCancel"
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    
  events : 
  {   
    /**
    * Event dispatched when widget is shown
    */
   "show" : "qx.event.type.Event",
   
   /**
    * Data event dispatched when widget is hidden
    */
   "hide"  : "qx.event.type.Event"   
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */   
  
  /**
   * @param properties {Map|String|undefined} If you supply a map, all the 
   * corresponding properties will be set. If a string is given, use it 
   * as to set the 'message' property.
   */
  construct: function( properties )
  {
    this.base(arguments);
    
    /*
     * basic settings
     */
    this.set({
      'visibility' : "hidden",
      'decorator'  : "shadow-popup"
    });
    this.setLayout( new qx.ui.layout.Grow() );
    
    /*
     * automatically add to application's root
     */
    var root = qx.core.Init.getApplication().getRoot();
    root.add(this);
    
    /*
     * make sure the dialog is above any opened window
     */
    var maxWindowZIndex = 1E5;
    var windows = root.getWindows();
    for (var i = 0; i < windows.length; i++) {
      var zIndex = windows[i].getZIndex();
      maxWindowZIndex = Math.max(maxWindowZIndex, zIndex);
    }
    this.setZIndex( maxWindowZIndex +1 );
    
    /*
     * make it a focus root
     */
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
    
    /* 
     * resize event 
     */
    this.getApplicationRoot().addListener("resize", function(e)
    {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
        marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
      });
    }, this);
    
    /* 
     * appear event 
     */
    this.addListener("appear", function(e)
    {
      var bounds = this.getBounds();
      this.set({
        marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
        marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
      });
    }, this);   
    
    /*
     * create widget content
     */
    this._createWidgetContent();
    
    /*
     * set properties if given
     */
    if ( typeof properties == "object" )
    {
      this.set(properties);
    }
    /*
     * if argument is a string, assume it is a message
     */
    else if ( typeof properties == "string" )
    {
      this.setMessage(properties);
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
    _image : null,
    _message : null,
    _okButton : null,
    _cancelButton : null,       
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */  
    
 
    /**
     * Extending classes must implement this method.
     */
    _createWidgetContent : function()
    {
      this.error("_createWidgetContent not implemented!");
    },  
    
    /**
     * Create a cancel button
     * @return {qx.ui.form.Button}
     */    
    _createOkButton : function()
    {
      var okButton = this._okButton =  new qx.ui.form.Button(this.tr("OK"));
      okButton.setIcon("icon/22/actions/dialog-ok.png")
      okButton.setAllowStretchX(false);
      okButton.addListener("execute", this._handleOk, this);  
      return okButton;
    },
    
    /**
     * Create a cancel button, which is hidden by default and will be shown
     * if allowCancel property is set to true.
     * @return {qx.ui.form.Button}
     */
    _createCancelButton : function()
    {
      var cancelButton = this._cancelButton =  new qx.ui.form.Button(this.tr("Cancel"));
      cancelButton.setAllowStretchX(false);
      cancelButton.setIcon("icon/22/actions/dialog-cancel.png");
      cancelButton.addListener("execute", this._handleCancel, this);  
      this.bind("allowCancel",cancelButton,"visibility",{
        converter : function( value )
        {
          return value ? "visible" : "excluded";
        }
      });      
      return cancelButton;
    },

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */ 
    _applyImage : function( value, old )
    {
      this._image.setSource( value );
      this._image.setVisibility( value ? "visible" : "excluded" );
    }, 
    
    _applyMessage : function( value, old )
    {
      this._message.setValue( value );
      this._message.setVisibility( value ? "visible" : "excluded" );
    },     
    
    /*
    ---------------------------------------------------------------------------
      API METHODS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Show the widget. Overriding methods must call this parent method
     */
    show : function()
    {
      if ( this.isUseBlocker() )
      {
        var root = this.getApplicationRoot();
        root.setBlockerOpacity( this.getBlockerOpacity() );
        root.setBlockerColor( this.getBlockerColor() );  
        root.blockContent( this.getZIndex()-1 );
      }    
      this.setVisibility("visible");
      this.fireEvent("show");
    },
    
    /**
     * Hide the widget. Overriding methods must call this parent method
     */    
    hide : function()
    {
      this.setVisibility("hidden");
      if ( this.isUseBlocker() )
      {
        this.getApplicationRoot().unblockContent();
      }
      this.fireEvent("hide");
    },
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on ok button. Calls callback with a "true" argument
     */
    _handleOk : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback()(true);
      }
      this.resetCallback();
    },  

    /**
     * Handle click on cancel button. Calls callback with 
     * an "undefined" argument
     */
    _handleCancel : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback()();
      }
      this.resetCallback();
    } 
  },
  
  /*
  *****************************************************************************
     DEFERRED ACTION
  *****************************************************************************
  */   
  defer : function()
  {
    /*
     * create shortcut methods
     */
    dialog.alert = function( message, callback )
    {
      (new dialog.Alert({
        "message" : message,
        "callback" : callback || null
      })).show();      
    }      
    dialog.confirm = function( message, callback )
    {
      (new dialog.Confirm({
        "message" : message,
        "callback" : callback || null
      })).show();      
    }      
    dialog.prompt = function( message, callback )
    {
      (new dialog.Prompt({
        "message" : message,
        "callback" : callback || null
      })).show();      
    }
    dialog.select = function( message, options, callback )
    {
      (new dialog.Select({
        "message" : message,
        "allowCancel" : true,
        "options" : options,
        "callback" : callback
      })).show();      
    }       
    dialog.form = function( message, formData, callback )
    {
      (new dialog.Form({
        message : message,
        formData : formData,
        allowCancel : true,
        callback : callback
      })).show();            
    }
  }
});