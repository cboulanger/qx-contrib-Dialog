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
#embed(qx.icontheme/48/status/dialog-information.png)
************************************************************************ */


/**
 * Alert popup singleton
 */
qx.Class.define("dialog.Upload",
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
        contentPadding: [16, 16, 16, 16]
      });
      groupboxContainer.setLayout( new qx.ui.layout.VBox(10) );
      this.add( groupboxContainer );

      var hbox = new qx.ui.container.Composite;
      hbox.setLayout( new qx.ui.layout.HBox(10) );
      groupboxContainer.add( hbox );
      
      /*
       * add image 
       */
      this._image = new qx.ui.basic.Image("icon/48/status/dialog-information.png");
      hbox.add( this._image );
      
      /*
       * Add message label
       */
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add( this._message );    
      
      
      /*
       * upload widget
       */
      var form = new uploadwidget.UploadForm('uploadFrm', url );
      form.set({
        top    : 0,
        left   : 0,
        right  : 0,
        bottom : 0,
        width  : null
      });
      
      /*
       * parameters
       */
      if ( params !== undefined )
      {
        for ( var k in params )
        {
          form.setParameter( k, params[k] );
        }
      }
      
      /*
       * file upload field
       */
      var file = new uploadwidget.UploadField('uploadfile',"Choose File",null);
      file.set({
        top    : 0,
        left   : 0,
        right  : 0,
        bottom : 0,
        width  : null
      });
      form.add(file);
      cv.add(form);

      /*
       * event listeners
       */
      form.addEventListener('sending',function(e) {
        this.debug('sending');
      });
      
      form.addEventListener('completed',function(e) {
        var response = this.getIframeHtmlContent();
        var path = file.getValue();
        callback.call( context, path, response );
        window.setTimeout(function(){
          w.close();
          w.dispose();
          w.destroy();
        },100);
      });

      /*
       * button panel
       */
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);
      controls = [cv,p];

      /*
       * window
       */
      var w = this._createWindow(this.tr("Select a file"), msg, 'icon/16/actions/document-save.png', 'icon/32/actions/document-save.png', controls);

      /*
       * add event listener for OK Button
       */
      b.addEventListener("execute", function()
      {
        // send form if an url has been passed        
        this.setLabel("Uploading...");
        this.setEnabled(false);       
        if (url) 
        {
          form.send();  
        }
        else
        {
          var path = file.getValue();
          w.close();
          w.dispose();
          callback.call(context, path );        
        }
      });

      /*
       * add event listener for cancel Button
       */
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });             
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();
      
      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox();
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(okButton);
      groupboxContainer.add(buttonPane);
    }
  }    
});