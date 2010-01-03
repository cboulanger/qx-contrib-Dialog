/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(dialog/*)
#asset(qx/icon/Tango/48/status/dialog-information.png)
#asset(qx/icon/Tango/22/actions/dialog-ok.png)
#asset(qx/icon/Tango/22/actions/dialog-cancel.png)

************************************************************************ */

/**
 * This demo shows the capability of the dialog package to respond
 * to server events.
 */
qx.Class.define("dialog.demo.Application",
{
  extend : qx.application.Standalone,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

    members :
    {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);
    
      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
    
      /*
       * button data
       */
      var buttons = 
      [
         {
           label : "Alert",
           method : "createAlert"
         },
         {
           label : "Confirm",
           method : "createConfirm"
         },
         {
           label : "Prompt",
           method : "createPrompt"
         },
         {
           label : "Select among choices",
           method : "createSelect"
         }
       ];
    
      /*
       * button layout
       */
      var vbox = new qx.ui.container.Composite();
      vbox.setLayout(new qx.ui.layout.VBox(5));
      vbox.setMaxWidth(400);
      var title = new qx.ui.basic.Label("<h2>Remote Dialog Demo (cometd)</h2>");
      title.setRich(true);
      vbox.add( title );
      var label = new qx.ui.basic.Label(
        "<p>This demo shows the dialog package's ability to respond to server events, using a cometd server. " +
        "The dialogs triggered by pressing the button will be shown on the other connected clients. " +
        "This isn't very useful, of course, a real application would establish a connection to a specific client only.</p>" +
        "<h3>How to test the remote dialogs</h3><ol>"+
        "<li>Connect this client to the cometd server</li>"+
        "<li>Open <a href='javascript:void()' onclick='window.open(document.URL);return false'>another instance</a> of this webapp and connect it.</li>"+
        "<li>Press one of the buttons.</li>"+
        "<li>Switch to the other window and respond to the dialog.</li>"+
        "<li>Switch back to this window and see the response.</li>"+
        "</ol><p>Note that because of the same-domain policy, the cometd server must listen on the same domain and port from which the javascript has been loaded.</p>"
      );
      label.setRich(true);
      vbox.add( label );      
      
      /*
       * cometd instance
       */
      this._cometd = new cometd.Client();  
      this._cometd.ackEnabled =  true;
      
      var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      hbox.add( new qx.ui.basic.Label("Cometd server path: "));
      var serverUrlWidget = new qx.ui.form.TextField("/cometd");
      var connectBtn = new qx.ui.form.Button("Connect");
      hbox.add( serverUrlWidget, {flex : 1 } );
      hbox.add(connectBtn);
      
      connectBtn.addListener("execute",function(){
        try{
        this._cometd.init({
          url :  serverUrlWidget.getValue(),
          logLevel : "info"
        }); 
        connectBtn.setVisibility("excluded");
        qx.event.message.Bus.dispatch("connected");
        }catch(e){ this.warn(e) }
      }, this);
      
      vbox.add( hbox );
      
      /*
       * subscribe to comet messages
       */
      qx.event.message.Bus.subscribe("/cometd/meta", this._onServerMessage, this);            
            
      /*
       * create buttons
       */
      buttons.forEach(function(button){
        var btn = new qx.ui.form.Button( button.label );
        btn.setEnabled(false);
        qx.event.message.Bus.subscribe("connected",function(){
          btn.setEnabled(true);
        });
        btn.addListener("execute",this[button.method],this);
        if ( button.enabled != undefined )
        {
          btn.setEnabled(button.enabled);
        }
        vbox.add(btn);
      },this);
      this.getRoot().add(vbox,{ left: 30, top: 30} );
      
    },
    
    /**
     * Called when receiving a message from the server
     * @param e {qx.event.type.Data}
     */
    _onServerMessage : function(e) 
    {
      var data = e.getData();
      
      if (data.action == "handshake") 
      {
        if ( data.successful ) 
        {
          this._cometd.subscribe("/dialog/demo", this, "_onDialogMessage");
        }
      } 
      else if (data.action == "connect") 
      {
        if ( data.successful && !this._connected) 
        {
          this.info("Reconnected.")
        }
        if (! data.successful && this._connected) 
        {
          this.info("Disconnected.")
        }
        this._connected = data.successful;
      }
    },
    
    /**
     * Called when a dialog message is received. 
     * @param e {Object}
     */
    _onDialogMessage : function( e )
    {
      console.log(e);
      var data = e.data;
      
      /*
       * disregard message if originating from the same client
       */
      if ( data.clientId == this._cometd.getClientId() ) return;
      
      /*
       * if the type property is set, we have a request to
       * show a dialog
       */
      if ( data.type && data.clientId )
      {
        var dlg = dialog.Dialog.getInstanceByType( data.type );
        data.properties.callback = qx.lang.Function.bind( function( result )
        {
          this._cometd.publish("/dialog/demo", {
            "clientId" : this._cometd.getClientId(),
            "requestingClientId" : data.clientId,
            "result" : result
          });
        }, this);
        dlg.set(data.properties);
        dlg.show();
      }
      
      /*
       * if the result property is set, this is the result
       * of a dialog request. display it only if we are the
       * requesting client.
       */
      else if ( data.result && data.requestingClientId ==  this._cometd.getClientId() )
      {
        dialog.alert( "Client #" + data.clientId + " responds: " + data.result );    
      }
    },
    
    /**
     * Publishes a dialog to all other clients
     */
    _publishDialog : function(type,properties)
    {
      this._cometd.publish("/dialog/demo", {
        "type"       : type,
        "properties" : properties,
        "clientId"   : this._cometd.getClientId()
      });  
    },
    
    /**
     * Create an alert on all connected clients
     */
    createAlert : function()
    {
      this._publishDialog( "alert", {
          message : "Hello World!"
      });
    },
    
    createConfirm : function()
    {
      this._publishDialog("confirm", {
        message : "Do you really want to erase your hard drive?"
      });
    },   
    
    createPrompt : function()
    {
      this._publishDialog("prompt", {
        message : "Please enter the root password for your server"
      });
    },     
        
    createSelect : function()
    {
      this._publishDialog("select",{
        message : "Select the type of record to create:",
        options : [
          { label:"Database record", value:"database" },
          { label:"World record", value:"world" },
          { label:"Pop record", value:"pop" }
        ],
        allowCancel : true
      });
    }
  }
});