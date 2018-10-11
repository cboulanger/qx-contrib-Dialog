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
 * @ignore(dialog.alert)
 * @ignore(dialog.error)
 * @ignore(dialog.warning)
 * @ignore(dialog.confirm)
 * @ignore(dialog.prompt)
 * @ignore(dialog.form)
 * @ignore(dialog.select)
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-cancel.png)
 * @asset(qx/icon/${qx.icontheme}/22/actions/dialog-ok.png)
 * @asset(qx/icon/${qx.icontheme}/48/status/dialog-information.png) 
 * @asset(qx/icon/${qx.icontheme}/48/status/dialog-error.png)
 * @asset(qx/icon/${qx.icontheme}/48/status/dialog-warning.png)
 */

/**
 * Base class for dialog widgets
 * 
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
    _appearances            : {},

    /**
     * Set appearance styles and icons to be used globally.
     * 
     * @param appearances {Map}
     *   Map with the following optional members:
     *     - okButtonAppearance
     *     - okButtonIcon
     *     - cancelButtonAppearance
     *     - cancelButtonIcon
     * 
     *   Any that are not specified will use the hard-coded default values.
     */
    setGlobalAppearance : function(appearances)
    {
      dialog.Dialog._appearances = appearances;
    },

    /**
     * Returns a dialog instance by type
     * @param type {String} The dialog type to get
     * @return {dialog.Dialog}
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
     * Shortcut for alert dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     */
    alert : function( message, callback, context )
    {
      (new dialog.Alert({
        "message"   : message,
        "callback"  : callback || null,
        "context"   : context || null,
        "image"     : "dialog/notification-icon.png"
      })).show();      
    },

    /**
     * Shortcut for error dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     */
    error : function( message, callback, context )
    {
      (new dialog.Alert({
        "message"   : message,
        "callback"  : callback || null,
        "context"   : context || null,
        "image"     : "icon/48/status/dialog-error.png"
      })).show();      
    },
    
    /**
     * Shortcut for warning dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     */
    warning : function( message, callback, context )
    {
      (new dialog.Alert({
        "message"   : message,
        "callback"  : callback || null,
        "context"   : context || null,
        "image"     : "icon/48/status/dialog-warning.png"
      })).show();      
    },
    
    /**
     * Shortcut for confirm dialog
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     */
    confirm : function( message, callback, context )
    {
      (new dialog.Confirm({
        "message"     : message,
        "callback"    : callback || null,
        "context"     : context || null,
        "image"       : "dialog/notification-icon.png"
      })).show();      
    },
    
    /**
     * Shortcut for prompt dialog.
     * The value argument was forgotten in the initial implementation and
     * comes last for backwards compatibility. This might change in a future 
     * release.
     * @param message {String} The message to display
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param value {String} The default value of the prompt textfield
     */    
    prompt : function( message, callback, context, value )
    {
      (new dialog.Prompt({
        "message"     : message,
        "callback"    : callback || null,
        "context"     : context || null,
        "value"       : value || null
      })).show();      
    },
    
    /**
     * Shortcut for select dialog
     * @param message {String} The message to display
     * @param options {Array} Options to select from
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     * @param allowCancel {Boolean} Default: true
     */    
    select : function( message, options, callback, context, allowCancel )
    {
      (new dialog.Select({
        "message"     : message,
        "allowCancel" : typeof allowCancel == "boolean" ? allowCancel : true,
        "options"     : options,
        "callback"    : callback || null,
        "context"     : context || null
      })).show();      
    },
    
    /**
     * Shortcut for form dialog
     * @param message {String} The message to display
     * @param formData {Map} Map of form data. See {@link dialog.Form.formData}
     * @param callback {Function} The callback function
     * @param context {Object} The context to use with the callback function
     */
    form : function( message, formData, callback, context )
    {
      (new dialog.Form({
        "message"     : message,
        "formData"    : formData,
        "allowCancel" : true,
        "callback"    : callback,
        "context"     : context || null
      })).show();            
    }
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
    this.set({
      visibility      : "hidden",
      backgroundColor : "background-application"
    });    
    this.setLayout( new qx.ui.layout.Grow() );
    /*
     * automatically add to application's root
     */
    var root = qx.core.Init.getApplication().getRoot();
    root.add(this);
    this.__blocker = new qx.ui.core.Blocker(root);
    this.__blocker.setOpacity( this.getBlockerOpacity() );
    this.__blocker.setColor( this.getBlockerColor() );  
    
    /*
     * make it a focus root
     */
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
    
    /* 
     * resize event 
     */
    root.addListener("resize", function(e)
    {
      var bounds = this.getBounds();
      if (bounds) {
        this.set({
          marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
          marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
        });
      }
    }, this);
    
    /* 
     * appear event 
     */
    this.addListener("appear", function(e)
    {
      var bounds = this.getBounds();
      if (bounds) {
        this.set({
          marginTop: Math.round( ( qx.bom.Document.getHeight() -bounds.height ) / 2),
          marginLeft : Math.round( ( qx.bom.Document.getWidth() -bounds.width) / 2)
        });
      }
    }, this);   
    
    /*
     * create widget content
     */
    this._createWidgetContent(properties);
    
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
     * The context for the callback function
     */
    context : 
    {
      check : "Object",
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
    },
    
    // overridden
    focusable :
    {
      refine : true,
      init : true
    },
    
    /**
     * Whether the dialog is shown. If true, call the show() method. If false,
     * call the hide() method.
     */
    show :
    {
      check    : "Boolean",
      nullable : true,
      event    : "changeShow",
      apply    : "_applyShow"
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
     * Dispatched when user clicks on the "OK" Button
     * @type {String}
    */
    "ok" : "qx.event.type.Event",
   
   /**
     * Dispatched when user clicks on the "Cancel" Button
     * @type {String}
    */
    "cancel" : "qx.event.type.Event"
   
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
       "PRIVATE"
    ---------------------------------------------------------------------------
    */  
    
    __container : null,
		__previousFocus : null,
		__blocker : null,
    
    /*
    ---------------------------------------------------------------------------
       "PROTECTED"
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
    
    // overridden
    // @todo implement child control logic
//    _createChildControlImpl : function(id)
//    {
//      var control;
//
//      switch(id)
//      {
//        case "button-ok":
//          control = new qx.ui.basic.Label( this.getLabel() );
//          this._add(control);
//          break;
//
//      }
//
//      return control || this.base(arguments, id);
//    },    
//    
    /**
     * Create the content of the dialog. 
     * Extending classes must implement this method.
     */
    _createWidgetContent : function()
    {
      this.error("_createWidgetContent not implemented!");
    },  
    
    /**
     * Creates the default container (groupbox)
     * @todo make this themeable
     */
    _createDialogContainer : function()
    {
      this.__container = new qx.ui.groupbox.GroupBox().set({
        layout          : new qx.ui.layout.VBox(10),
        contentPadding  : [ 5, 5, 5, 5 ],
        backgroundColor : "background-application"
      });      
      this.add( this.__container );
      return this.__container;
    },      
    
    /**
     * Create a cancel button
     * @return {qx.ui.form.Button}
     */    
    _createOkButton : function()
    {
      var okButton = this._okButton =  new qx.ui.form.Button(this.tr("OK"));
      okButton.setIcon(
        dialog.Dialog._appearances.okButtonIcon ||
          "icon/22/actions/dialog-ok.png")
      if (dialog.Dialog._appearances.okButtonAppearance)
      {
        okButton.setAppearance(
          dialog.Dialog._appearances.okButtonAppearance);
      }
      okButton.setAllowStretchX(false);      
      okButton.addListener("execute", this._handleOk, this);  
      this.addListener("appear",function(){
        okButton.focus();
      },this);
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
      cancelButton.setIcon(
        dialog.Dialog._appearances.cancelButtonIcon ||
          "icon/22/actions/dialog-cancel.png")
      if (dialog.Dialog._appearances.cancelButtonAppearance)
      {
        cancelButton.setAppearance(
          dialog.Dialog._appearances.cancelButtonAppearance);
      }
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
     * Returns the widgets that is the container of the dialog
     * @return {qx.ui.core.LayoutItem}
     */
    getDialogContainer : function()
    {
      if ( ! this.__container )
      {
        return this._createDialogContainer();
      }
      return this.__container;
    },
    
    /**
     * Show the widget. Overriding methods must call this parent method
     */
    show : function()
    {
      if ( this.isUseBlocker() )
      {
        /*
        * make sure the dialog is above any opened window
        */
        var root = qx.core.Init.getApplication().getRoot();
        var maxWindowZIndex = root.getZIndex();
        var windows = root.getWindows();
        for (var i = 0; i < windows.length; i++) {
          var zIndex = windows[i].getZIndex();
          maxWindowZIndex = Math.max(maxWindowZIndex, zIndex);
        }
        this.setZIndex( maxWindowZIndex +1 );
        this.__blocker.blockContent( maxWindowZIndex );
      }   
      this.setVisibility("visible");
      this.__previousFocus = qx.ui.core.FocusHandler.getInstance().getActiveWidget();
      this.focus();
    },
    
    /**
     * Hide the widget. Overriding methods must call this parent method
     */    
    hide : function()
    {
      this.setVisibility("hidden");
      if ( this.isUseBlocker() )
      {
        this.__blocker.unblock();
      }
      if ( this.__previousFocus )
      {
        try
        {
          this.__previousFocus.focus();
        }
        catch( e ){}
      }
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
      this.fireEvent("ok");
      if( this.getCallback() )
      {
        this.getCallback().call(this.getContext(),true);
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
      this.fireEvent("cancel");
      if( this.getCallback() )
      {
        this.getCallback().call(this.getContext());
      }
      this.resetCallback();
    },
    __blocker: null      
  }
  
  
});
