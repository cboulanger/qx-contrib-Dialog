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
 * A dialog with a form that is constructed on-the-fly
 * @require(dialog.FormRenderer)
 * @require(qx.util.Serializer)
 * @require(qx.util.Validate)
 */
qx.Class.define("dialog.Form",
{
  extend : dialog.Dialog,
  
  construct : function(properties)
  {
    // Initialize form instances to an empty map which will be updated as
    // formItems are added.  After the formData has been applied, this
    // property will contain a map containing the form item instances, with
    // the key being the name used in formData, and the value being the item
    // element. In particular, the afterFormFunction, which receives the form
    // as its second parameter, may reference this member to gain access to
    // the form elements created for the form.
    this._formElements = {};

    this.base(arguments, properties);
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */     
  properties :
  {
    /**   
     * Data to create a form with multiple fields. 
     * So far implemented: 
     *   TextField / TextArea 
     *   ComboBox
     *   SelectBox
     *   RadioGroup
     *   CheckBox
     *   Spinner
     * 
     * <pre>
     * {
     *  "username" : {   
     *     'type'  : "TextField",
     *     'label' : "User Name", 
     *     'value' : ""
     *   },
     *   "address" : {
     *     'type'  : "TextArea",
     *     'label' : "Address",
     *     'lines' : 3
     *   },
     *   "domain" : {
     *     'type'  : "SelectBox", 
     *     'label' : "Domain",
     *     'value' : 1,
     *     'options' : [
     *       { 'label' : "Company", 'value' : 0 }, 
     *       { 'label' : "Home",    'value' : 1 }
     *     ]
     *   },
     *   "commands" : {
     *    'type'  : "ComboBox", 
     *     'label' : "Shell command to execute",
     *     'options' : [
     *       { 'label' : "ln -s *" }, 
     *       { 'label' : "rm -Rf /" }
     *     ],
     *   },
     *   "quantity" : {
     *    'type' : "Spinner",
     *    'label' : "How many?",
     *    'properties' : {
     *      'minimum' : 1,
     *      'maximum' : 20,
     *      'maxWidth' : 100
     *    }
     *   }
     * }
     * </pre>
     */
    formData : 
    {
      check : "Map",
      nullable : true,
      event : "changeFormData",
      apply : "_applyFormData"
    },
    
    /**
     * The model of the result data
     */
    model :
    {
      check : "qx.core.Object",
      nullable : true,
      event : "changeModel"
    },
    
    /**
     * The default width of the column with the field labels
     */
    labelColumnWidth :
    {
      check : "Integer",
      nullable : false,
      init : 100,
      apply : "_applyLabelColumnWidth"
    },

    /**
     * Function to call to create and configure a form renderer. If null, a
     * single-column form renderer is automatically instantiated and
     * configured. The function is passed a single argument, the form object.
     */
    setupFormRendererFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    },

    /**
     * Function to call just before creating the form's input fields. This
     * allows additional, non-form widgets to be added. The function is called
     * one two arguments: the container in which the form fields should be
     * placed, and the form object itself (this).
     */
    beforeFormFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    },

    /*
     * Function to call with the internal form, allowing the user to do things
     * such as set up a form validator (vs. field validators) on the form. The
     * function is called with two arguments: the internal qx.ui.form.Form
     * object, and the current dialog.Form object. An attempt is made to call
     * the function in the context specified in the form data, but that may
     * not work properly if the context property is not yet set at the time at
     * the form is created.
     */
    formReadyFunction :
    {
      check : "Function",
      nullable : true,
      init : null,
      event : "formReadyFunctionChanged"
    },

    /**
     * Function to call just after creating the form's input fields. This
     * allows additional, non-form widgets to be added. The function is called
     * one two arguments: the container in which the form fields should be
     * placed, and the form object itself (this).
     */
    afterFormFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    },

    /**
     * Function to call just after creating the form's buttons. This allows
     * additional, additional widgets to be added. The function is called with
     * two arguments: the container in which the buttons were placed, and the
     * form object itself (this).
     */
    afterButtonsFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    
  events : 
  {   

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
    
    _formContainer : null,
    _form : null,
    _formValidator : null,
    _formController : null,
    _formElements : null,
    
    /*
    ---------------------------------------------------------------------------
       WIDGET LAYOUT
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Create the main content of the widget
     */
    _createWidgetContent : function(properties)
    {      
      /*
       * Handle properties that must be set before _applyFormData
       */
      if (properties.setupFormRendererFunction)
      {
        this.setSetupFormRendererFunction(properties.setupFormRendererFunction);
      }

      /*
       * groupbox
       */
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
        contentPadding  : [ 16, 16, 16, 16 ],
        backgroundColor : "background-application"
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
      hbox.set({
        layout          : new qx.ui.layout.HBox(10),
        backgroundColor : "background-application"
      })
      groupboxContainer.add( hbox );
      groupboxContainer.setUserData("messageHBox", hbox);
      
      /*
       * Add message label
       */
      this._message = new qx.ui.basic.Label();
      this._message.set({
        font            : "bold",
        backgroundColor : "background-application",
        rich            : true,
        minWidth        : 200,
        allowStretchX   : true
      });      
      hbox.add( this._message, {flex:1} );    
      
      /*
       * If requested, call the before-form function to add some fields
       */
      var f;
      if (typeof properties.beforeFormFunction == "function")
      {
        f = properties.beforeFormFunction.bind(properties.context);
        f(groupboxContainer, this);
      }

      /* 
       * Form container  
       */
      var formTag = new dialog.FormTag();
      groupboxContainer.add( formTag );
      this._formContainer = new qx.ui.container.Composite();
      this._formContainer.set({
        font : "bold"
      });
      this._formContainer.setLayout( new qx.ui.layout.Grow() );
      formTag.add( this._formContainer, {flex: 1} );
      
      /*
       * If requested, call the after-form function to add some fields
       */
      if (typeof properties.afterFormFunction == "function")
      {
        f = properties.afterFormFunction.bind(properties.context);
        f(groupboxContainer, this);
      }

      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.set({
        font            : "bold",
        backgroundColor : "background-application",
        layout          : bpLayout
      });
      groupboxContainer.add(buttonPane);
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();      
      buttonPane.add( okButton );   
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      buttonPane.add( cancelButton );
      
      /*
       * If requested, call the after-buttons function
       */
      if (typeof properties.afterButtonsFunction == "function")
      {
        f = properties.afterButtonsFunction.bind(properties.context);
        f(buttonPane, this);
      }

    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Constructs the form on-the-fly
     * @param formData {Map} The form data map
     * @param old {Map|null} The old value
     * 
     * @lint ignoreDeprecated(alert,eval)
     */
    _applyFormData : function ( formData, old )
    {
      var f;

      /*
       * remove container content, form, controller
       */
      if ( this._formController )
      {
        // work around a problem with removeAllBindings
        try
        {
          this.getModel().removeAllBindings();
          this._formController.dispose();
        }
        catch(e){}
      }
      if ( this._form )
      {
        // work around a problem with removeAllBindings
        try
        {
          this._form.getValidationManager().removeAllBindings();
          this._form.dispose();
        }
        catch(e){}
      }
      this._formContainer.removeAll();
      
      /*
       * if form is to be deleted
       */
      if ( ! formData )
      {
        return;
      }
      
      /*
       * if a model exist, dispose it first
       */
      if ( this.getModel() )  
      {
        this.getModel().removeAllBindings();
        this.getModel().dispose();
      }
      
      /*
       * set up model
       */
      var modelData = {};
      for ( var key in formData )
      {
        modelData[key] = formData[key].value !== undefined 
                          ? formData[key].value
                          : null;
      }
      var model = qx.data.marshal.Json.createModel( modelData );
      this.setModel( model );
      
      /*
       * create new form and form controller
       */
      this._form = new qx.ui.form.Form();
      this._formController = new qx.data.controller.Object( this.getModel() );
      
      /*
       * hooks for subclasses or users to do something with the new form
       */
      this._onFormReady( this._form );
      f = this.getFormReadyFunction();
      if (f)
      {
        f.call(this.getContext(), this._form, this);
      }
      else
      {
        this.addListenerOnce(
          "formReadyFunctionChanged",
          function()
          {
            f = this.getFormReadyFunction();
            if (f)
            {
              f.call(this.getContext(), this._form, this);
            }
          },
          this.getContext());
      }

      /*
       * loop through form data array
       */
      for ( var key in formData )
      {
        var fieldData = formData[key];
         
        /*
         * Form element
         */
        var formElement = null;
        
        switch ( fieldData.type.toLowerCase() )
        {
          case "groupheader" :
            this._form.addGroupHeader( fieldData.value );
            formElement = new qx.ui.form.TextField(); // dummy
            formElement.setUserData("excluded",true);
            break;
            
          case "textarea": 
            formElement = new qx.ui.form.TextArea();
            formElement.setHeight(fieldData.lines * 16);
            formElement.setLiveUpdate(true);
            break;

          case "textfield":
            formElement = new qx.ui.form.TextField();
            formElement.setLiveUpdate(true);
            break;
			
          case "datefield":
            formElement = new qx.ui.form.DateField();
			if (fieldData.dateFormat != null) {
				formElement.setDateFormat(fieldData.dateFormat);
			}
            break;
            
          case "passwordfield":
            formElement = new qx.ui.form.PasswordField();
            formElement.getContentElement().setAttribute(
              "autocomplete", "password");
            break;            
            
          case "combobox":
            //@todo use data model for list
            formElement = new qx.ui.form.ComboBox();
            fieldData.options.forEach(function( item ){
              var listItem = new qx.ui.form.ListItem( item.label, item.icon );
              formElement.add( listItem );
            });
            break;
            
          case "selectbox":
            formElement = new qx.ui.form.SelectBox();
            var model = qx.data.marshal.Json.createModel( fieldData.options );
            new qx.data.controller.List( model, formElement, "label");
            break;

          case "radiogroup":
            formElement = new qx.ui.form.RadioGroup();
            if ( fieldData.orientation )
            {
              formElement.setUserData("orientation", fieldData.orientation );
            }
            //var selected = null;
            fieldData.options.forEach( function( item )
            {
              var radioButton = new qx.ui.form.RadioButton( item.label );
              radioButton.setUserData( "value", 
                item.value !== undefined ?  item.value : item.label
              );
              formElement.add( radioButton );
            },this);
            break; 
            
          case "label":
            formElement = new qx.ui.form.TextField(); // dummy
            formElement.setUserData("excluded",true);
            break;

          case "checkbox":
            formElement = new qx.ui.form.CheckBox(fieldData.label);
            break;
            
          case "spinner":
            formElement = new qx.ui.form.Spinner();
            break;

          case "list":
            formElement = new qx.ui.form.List();
            if (fieldData.selectionMode)
            {
              formElement.setSelectionMode(fieldData.selectionMode);
            }
            if (fieldData.dragSelection)
            {
              var mode = formElement.getSelectionMode();
              if (mode == "single" || mode == "one")
              {
                this.debug("Drag selection not available in " + mode);
              }
              else
              {
                formElement.setDragSelection(fieldData.dragSelection);
              }
            }
            var model = qx.data.marshal.Json.createModel( fieldData.options );
            new qx.data.controller.List( model, formElement, "label");
            break;

          default:
            this.error("Invalid form field type:" + fieldData.type);
  
        }
        
        /*
         * Add form element to controller so that result data
         * model is updated when form element value changes
         */
        formElement.setUserData("key",key);
        var _this = this;
        switch ( fieldData.type.toLowerCase() )
        {
          
          /*
           * simple form elements
           */
          case "textarea":
          case "textfield":
          case "passwordfield":
          case "combobox":
	  case "datefield":
            this._formController.addTarget( 
              formElement, "value", key, true, 
              null,
              {  
                "converter" : function( value )
                {  
                  _this._form.getValidationManager().validate();
                  return value; 
                }
              }
            );  
            break;

          /**
           * checkbox form element
           */
          case "checkbox":
            this._formController.addTarget(
                formElement, "value", key, true, null);
            break;

          /*
           * single selection form elements
           */
          case "selectbox":
            this._formController.addTarget( 
              formElement, "selection", key, true, {  
                "converter" : qx.lang.Function.bind( function( value )
                {
                  var selected=null;
                  var selectables = this.getSelectables();
                  selectables.forEach( function( selectable )
                  {
                    if ( selectable.getModel().getValue() === value )
                    {
                      selected=selectable;
                    }
                  }, this );
                  
                  if( ! selected )
                  {
                    return [selectables[0]];
                  }
                  return [selected];
                }, formElement)
              },{  
                "converter" : qx.lang.Function.bind( function( selection )
                {  
                  var value = selection[0].getModel().getValue();
                  return value; 
                }, formElement)
              }
            );          
          
            break;
            
          case "radiogroup":
            
            this._formController.addTarget( 
              formElement, "selection", key, true, {  
                "converter" : qx.lang.Function.bind( function( value )
                {
                  var selectables = this.getSelectables();
                  var selection = [];
                  if ( value )
                  {
                    selectables.forEach( function( selectable )
                    {
                      var sValue = selectable.getUserData("value");
                      if ( sValue === value )
                      {
                        selection = [selectable];
                      }
                    }, this );
                  }
                  //console.warn("Getting value for " + key +": " + value + " -> Setting selection to  " + ( selection.length ? selection[0].getLabel() : "none" ) );
                  return selection;
                },formElement)
              },
              {  
                "converter" : function( selection )
                {   
                  var value = selection[0].getUserData("value");
                  //console.warn("Selection is " + ( selection.length ? selection[0].getLabel() : "none" ) + " -> Setting value for " + key +": " + value );
                  return value; 
                }
              }
            );
            
            break;            

          case "spinner":
            this._formController.addTarget(
                formElement, "value", key, true, null);
            break;

          case "list":
            this._formController.addTarget( 
              formElement, "selection", key, true, {  
                "converter" : qx.lang.Function.bind( function( value )
                {
                  var selected=[];
                  var selectables = this.getSelectables();
                  selectables.forEach( function( selectable )
                  {
                    if ((value instanceof Array ||
                         value instanceof qx.data.Array) &&
                        value.includes(selectable.getModel().getValue()))
                    {
                      selected.push(selectable);
                    }
                  }, this );
                  
                  return selected;
                }, formElement)
              },{  
                "converter" : qx.lang.Function.bind( function( selection )
                {  
                  var value = [];
                  selection.forEach( function ( selected )
                  {
                    value.push(selected.getModel().getValue());
                  });
                  return value; 
                }, formElement)
              }
            );          
            break;
        }
        
        /*
         * form element validation
         */
        var validator = null;
        if ( formElement && fieldData.validation )
        {
          
          /*
           * is field required?
           */
          if ( fieldData.validation.required )
          {
            formElement.setRequired(true);
          }
          
          /*
           * is there a validator?
           */
          if ( fieldData.validation.validator )
          {
             var validator = fieldData.validation.validator;

            /*
             * if validator is a string ...
             */
            if ( typeof validator == "string" )
            {
              /*
               * if a validation factory exists, use this
               */
              if ( qx.util.Validate[validator] )
              {
                validator = qx.util.Validate[validator]();
              }

              /*
               * else, is it a regular expression?
               */
              else if ( validator.charAt(0) == "/" )
              {
                validator = qx.util.Validate.regExp( new RegExp( validator.substr( 1, validator.length-2 ) ) );
              }

              /*
               * error
               */
              else 
              {
                this.error("Invalid string validator.");
              }
            }

            /*
             * in all other cases, it must be a funciton or an async validation
             * object
             */
            else if ( ! ( validator instanceof qx.ui.form.validation.AsyncValidator ) 
                && typeof validator != "function" ) 
            {
              this.error("Invalid validator.");
            }
          }
           
          /*
           * Server validation?
           */
          if ( fieldData.validation.service )
          {
            var service = fieldData.validation.service;
            var _this = this;
            validator =  new qx.ui.form.validation.AsyncValidator(
              function( validatorObj, value) 
              {
                if ( ! validatorObj.__asyncInProgress )
                {
                  validatorObj.__asyncInProgress = true;
                  qx.core.Init.getApplication().getRpcManager().execute( 
                    service.name, service.method, [value], function(response)
                    {
                      try {
                      var valid = ( response &&  typeof response == "object" && response.data ) ? response.data : response;
                      validatorObj.setValid( valid );
                      validatorObj.__asyncInProgress = false;
                      } catch(e ) { alert(e) };
                    } 
                  );
                }
              }
            );
          }
        }
        
        /*
         * if field width is specified
         */
        if ( fieldData.width !== undefined )
        {
          formElement.setWidth( fieldData.width );
        }
        
        /*
         * placeholder
         */
        if ( fieldData.placeholder !== undefined )
        {
          formElement.setPlaceholder( fieldData.placeholder );
        }
        
        /*
         * tooltip
         */
        if ( fieldData.toolTipText !== undefined )
        {
          formElement.setToolTipText( fieldData.toolTipText );
        }
        
        /*
         * generic property setter
         */
        if ( typeof fieldData.properties == "object" )
        {
          formElement.set( fieldData.properties );
        }

        /*
         * generic userdata settings
         */
        if ( typeof fieldData.userdata == "object" )
        {
          Object.keys( fieldData.userdata ).forEach(
            function(key)
            {
              formElement.setUserData(key, fieldData.userdata[key]);
            });
        }

        /*
         * events
         */
        if ( qx.lang.Type.isObject( fieldData.events ) )
        {
          for ( var type in fieldData.events )
          {  
            try
            {
//              var func = eval("("+fieldData.events[type]+")"); // eval is evil, I know.
              var func = fieldData.events[type];
              if ( ! qx.lang.Type.isFunction(func) )
              {
                throw new Error();
              }
              formElement.addListener(type,func,formElement);
            }
            catch(e)
            {
              this.warn("Invalid '" + type + "' event handler for form element '" + key + "'.");
            }
          }
        }
        
        /*
         * add label and form element to form
         */
        var label = fieldData.label;
        label && this._form.add( formElement, label, validator );

        /*
         * add the form element to the map so the user has access to it later
         */
        this._formElements[key] = formElement;
      }
      
      /*
       * render the form
       */
      var setupFormRenderer;

      setupFormRenderer = this.getSetupFormRendererFunction();
      if (! setupFormRenderer)
      {
        setupFormRenderer = function(form)
        {
          var view;

          view = new dialog.FormRenderer( form );
          view.getLayout().setColumnFlex(0, 0);
          view.getLayout().setColumnMaxWidth(0, this.getLabelColumnWidth() ); 
          view.getLayout().setColumnFlex(1, 1);
          view.setAllowGrowX(true);
          view.setBackgroundColor("background-application");

          return view;
        };
      }

      this._formContainer.add( setupFormRenderer.bind(this)(this._form) );
      
      /*
       * validate the form
       */
      this._form.getValidationManager().validate();

    },
    
    /**
     * Constructs the form on-the-fly
     * @param formData {Map} The form data map
     * @param old {Map|null} The old value
     */
    _applyLabelColumnWidth : function(width, old)
    {
      var view;

      // If the form renderer is the default one and has already been applied...
      if (! this.getSetupFormRendererFunction() &&
          this._formContainer &&
          this._formContainer.getChildren().length > 0)
      {
        view = this._formContainer.getChildren()[0];
        view.getLayout().setColumnWidth(0, width);
        view.getLayout().setColumnMaxWidth(0, width);
      }
    },


    // overridden
    _createOkButton : function()
    {
      // unlike our superclass, we do not add an appear listener to focus OK
      var okButton = this._okButton =  new qx.ui.form.Button(this.tr("OK"));
      okButton.setIcon(
        dialog.Dialog._appearances.okButtonIcon ||
          "icon/22/actions/dialog-ok.png");
      
      if (dialog.Dialog._appearances.okButtonAppearance)
      {
        okButton.setAppearance(
          dialog.Dialog._appearances.okButtonAppearance);
      }
      okButton.setAllowStretchX(false);      
      okButton.addListener("execute", this._handleOk, this);  
      return okButton;
    },

    /**
     * Hook for subclasses to do something with the form, for example
     * in order to attach bindings to the validation manager.
     * Default behavior: bind the enabled state of the "OK" button to the 
     * validity of the current form.
     * 
     * @param form {qx.ui.form.Form} The form to bind
     */
    _onFormReady : function( form )
    {
      form.getValidationManager().bind( "valid", this._okButton, "enabled", {
        converter : function(value){return value || false;}
      } );
    },
        
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */     
    
    /**
     * Handle click on ok button. Calls callback with the result map
     * @override
     */
    _handleOk : function()
    {
      this.hide();
      if( this.getCallback() )
      {
        this.getCallback().call(
          this.getContext(),
          qx.util.Serializer.toNativeObject( this.getModel() ) );
      }
      this.resetCallback();
    }
  }
});
