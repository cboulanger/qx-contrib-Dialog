function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.MWidgetRegistry": {
        "construct": true
      },
      "qxl.apiviewer.ClassLoader": {
        "construct": true
      },
      "qxl.apiviewer.TabViewController": {
        "construct": true
      },
      "qx.bom.History": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qxl.apiviewer.RequestUtil": {},
      "qxl.apiviewer.UiModel": {},
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {},
      "qxl.apiviewer.LoadingIndicator": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "excludeFromAPIViewer": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qxl.apiviewer.Controller", {
    extend: qx.core.Object,

    /*
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */

    /**
     * @param widgetRegistry
     *          {Viewer} the GUI
     */
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);

      this._widgetRegistry = qxl.apiviewer.MWidgetRegistry;

      this._titlePrefix = "API Documentation";
      document.title = this._titlePrefix;

      qxl.apiviewer.ClassLoader.setBaseUri("..");

      this._detailLoader = this._widgetRegistry.getWidgetById("detail_loader");
      this._tabViewController = new qxl.apiviewer.TabViewController(this._widgetRegistry);
      this.__bindTabViewController();

      this._tree = this._widgetRegistry.getWidgetById("tree");
      this.__bindTree();

      this.__bindToolbar();

      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
      var btn_included = this._widgetRegistry.getWidgetById("btn_included");

      btn_inherited.addListener("changeValue", this.__syncMenuButton, this);
      btn_included.addListener("changeValue", this.__syncMenuButton, this);

      this._history = qx.bom.History.getInstance();
      this.__bindHistory();

      qx.core.Init.getApplication().getRoot().addListener("pointerdown", function (e) {
        this.__openInNewTab = e.isShiftPressed() || e.isCtrlOrCommandPressed();
      }, this, true);
    },

    members: {
      apiindex: {},
      __openInNewTab: false,

      // overridden
      $$logCategory: "application",

      /**
       * Loads the API doc tree from a URL. The URL must point to a JSON encoded
       * doc tree.
       * 
       * @lint ignoreDeprecated(eval,alert)
       * @param url {String} the URL.
       * @async
       */
      load: function load(url) {
        var _this = this;

        var loadStart = new Date();
        qxl.apiviewer.RequestUtil.get(url).then(function (content) {
          var loadEnd = new Date();

          {
            _this.debug("Time to load data from server: " + (loadEnd.getTime() - loadStart.getTime()) + "ms");
          }

          var start = new Date();
          var treeData = eval("(" + content + ")");
          var end = new Date();

          {
            _this.debug("Time to eval tree data: " + (end.getTime() - start.getTime()) + "ms");
          }

          // give the browser a chance to update its UI before doing more
          setTimeout(function () {
            _this.__setDocTree(treeData);

            setTimeout(function () {
              // Handle bookmarks
              var state = _this._history.getState();
              if (state) {
                _this.__selectItem(_this.__decodeState(state));
              } else {
                _this.__selectItem("");
                // Open the package node if it has child packages
                /*
                if (depth < qx.core.Environment.get("qxl.apiviewer.initialTreeDepth") && packageDoc.getPackages().length > 0) {
                  packageTreeNode.setOpen(true);
                }
                */
              }
            });
          });
        }).catch(function (err) {
          _this.error("Couldn't load file: " + url);
          if (window.location.protocol == "file:") {
            alert("Failed to load API data from the file system.\n\nThe security settings of your browser may prohibit AJAX when using the file protocol. Please try the http protocol instead.");
          }
        });
      },

      /**
       * binds the events of the TabView controller
       */
      __bindTabViewController: function __bindTabViewController() {
        this._tabViewController.addListener("classLinkTapped", function (evt) {
          this._updateHistory(evt.getData());
        }, this);

        this._tabViewController.addListener("changeSelection", function (evt) {
          var page = evt.getData()[0];

          if (this._ignoreTabViewSelection == true) {
            return;
          }

          if (page && page.getUserData("nodeName")) {
            var nodeName = page.getUserData("nodeName");
            var itemName = page.getUserData("itemName");

            if (itemName != null) {
              this._updateHistory(nodeName + "#" + itemName);
            } else {
              this._updateHistory(nodeName);
            }
          } else {
            this._tree.resetSelection();
          }
        }, this);
      },

      /**
       * binds the selection event of the package tree.
       */
      __bindTree: function __bindTree() {
        this._tree.addListener("changeSelection", function (evt) {
          var treeNode = evt.getData()[0];
          if (treeNode && treeNode.getUserData("nodeName") && !this._ignoreTreeSelection) {
            var nodeName = treeNode.getUserData("nodeName");

            // the history update will cause _selectClass to be called.
            this._updateHistory(nodeName);
          }
        }, this);
      },

      /**
       * binds the actions of the toolbar buttons.
       */
      __bindToolbar: function __bindToolbar() {
        var uiModel = qxl.apiviewer.UiModel.getInstance();

        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
        btn_inherited.bind("value", uiModel, "showInherited");
        uiModel.bind("showInherited", btn_inherited, "value");

        var btn_included = this._widgetRegistry.getWidgetById("btn_included");
        btn_included.bind("value", uiModel, "showIncluded");
        uiModel.bind("showIncluded", btn_included, "value");

        var btn_expand = this._widgetRegistry.getWidgetById("btn_expand");
        btn_expand.bind("value", uiModel, "expandProperties");
        uiModel.bind("expandProperties", btn_expand, "value");

        var btn_protected = this._widgetRegistry.getWidgetById("btn_protected");
        btn_protected.bind("value", uiModel, "showProtected");
        uiModel.bind("showProtected", btn_protected, "value");

        var btn_private = this._widgetRegistry.getWidgetById("btn_private");
        btn_private.bind("value", uiModel, "showPrivate");
        uiModel.bind("showPrivate", btn_private, "value");

        var btn_internal = this._widgetRegistry.getWidgetById("btn_internal");
        btn_internal.bind("value", uiModel, "showInternal");
        uiModel.bind("showInternal", btn_internal, "value");
      },

      /**
       * Keeps the icon of the menubutton in sync with the menu checkboxes of
       * inherited and mixin includes.
       * 
       */
      __syncMenuButton: function __syncMenuButton() {
        var menuButton = this._widgetRegistry.getWidgetById("menubtn_includes");
        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
        var btn_included = this._widgetRegistry.getWidgetById("btn_included");
        var showInherited = btn_inherited.getValue();
        var showMixins = btn_included.getValue();
        if (showMixins && showInherited) {
          menuButton.setIcon('qxl/apiviewer/image/inherited_and_mixins_included.gif');
        }
        if (showInherited && !showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/method_public_inherited18.gif');
        }
        if (!showInherited && showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/overlay_mixin18.gif');
        }
        if (!showInherited && !showMixins) {
          menuButton.setIcon('qxl/apiviewer/image/includes.gif');
        }
      },

      /**
       * bind history events
       */
      __bindHistory: function __bindHistory() {
        this._history.addListener("changeState", function (evt) {
          var item = this.__decodeState(evt.getData());
          if (item) {
            this.__selectItem(item);
          }
        }, this);
      },

      /**
       * Loads the documentation tree.
       * 
       * @param docTree
       *          {qxl.apiviewer.dao.Package} root node of the documentation tree
       */
      __setDocTree: function __setDocTree(docTree) {
        var _this2 = this;

        var expandClassnames = function expandClassnames(names) {
          // Expands a list of class names including wildcards (eg "qx.ui.*") into an
          // exhaustive list without wildcards
          if (!names) {
            return [];
          }
          var result = {};
          names.forEach(function (name) {
            var pos = name.indexOf('*');
            if (pos < 0) {
              result[name] = true;
            } else {
              var prefix = name.substring(0, pos);
              for (var classname in docTree.classInfo) {
                if (classname.startsWith(prefix)) result[classname] = true;
              }
            }
          });
          return Object.keys(result);
        };

        var getRequiredClasses = function getRequiredClasses() {
          var result = {};
          for (var classname in docTree.classInfo) {
            result[classname] = true;
          }
          expandClassnames(qx.core.Environment.get("excludeFromAPIViewer")).forEach(function (name) {
            return delete result[name];
          });

          // We sort the result so that we can get a consistent ordering for loading classes, otherwise the order in
          //  which the filing system returns the files can cause classes to be loaded in a lightly different sequence;
          //  that would not cause a problem, except that the build is not 100% repeatable.
          return Object.keys(result).sort();
        };

        var start = new Date();
        var classes = getRequiredClasses();

        this.apiindex.__fullNames__ = [];
        this.apiindex.__index__ = {};
        this.apiindex.__types__ = ["doctree", "package", "class", "method_pub", "method_prot", "event", "property_pub", "method_priv", "method_intl", "constant", "childControl"];
        var TYPES = {
          "class": 1,
          "mixin": 1,
          "theme": 1,
          "interface": 1
        };

        var addToIndex = function (name, typeIdx, nameIdx) {
          if (!this.apiindex.__index__[name]) {
            this.apiindex.__index__[name] = [];
          }
          this.apiindex.__index__[name].push([typeIdx, nameIdx]);
        }.bind(this);

        classes.forEach(function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(classname) {
            var cls, nameIdx, typeIdx;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    cls = qxl.apiviewer.dao.Class.getClassByName(classname, true);
                    _context.next = 3;
                    return cls.load();

                  case 3:
                    nameIdx = _this2.apiindex.__fullNames__.indexOf(cls.getName());

                    if (nameIdx < 0) {
                      nameIdx = _this2.apiindex.__fullNames__.push(cls.getName()) - 1;
                    }
                    typeIdx = TYPES[cls.getType()];

                    addToIndex(cls.getName(), typeIdx, nameIdx);
                    typeIdx = 1;
                    addToIndex(cls.getPackageName(), typeIdx, nameIdx);
                    cls.getMethods().forEach(function (method) {
                      var typeIdx = void 0;
                      if (method.isProtected()) typeIdx = 4;else if (method.isPrivate()) typeIdx = 7;else typeIdx = 3;
                      addToIndex('#' + method.getName(), typeIdx, nameIdx);
                    });
                    cls.getProperties().forEach(function (prop) {
                      var typeIdx = 6;
                      addToIndex('#' + prop.getName(), typeIdx, nameIdx);
                    });
                    cls.getConstants().forEach(function (con) {
                      var typeIdx = 9;
                      addToIndex('#' + con.getName(), typeIdx, nameIdx);
                    });
                    cls.getEvents().forEach(function (evt) {
                      var typeIdx = 5;
                      addToIndex('#' + evt.getName(), typeIdx, nameIdx);
                    });
                    cls.getChildControls().forEach(function (ch) {
                      var typeIdx = 10;
                      addToIndex('#' + ch.getName(), typeIdx, nameIdx);
                    });

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        var rootPackage = qxl.apiviewer.dao.Package.getPackage(null);
        var end = new Date();

        {
          this.debug("Time to build data tree: " + (end.getTime() - start.getTime()) + "ms");
        }

        var start = new Date();
        this._tree.setTreeData(rootPackage);
        var end = new Date();

        {
          this.debug("Time to update tree: " + (end.getTime() - start.getTime()) + "ms");
        }

        return true;
      },

      /**
       * Push the class to the browser history
       * 
       * @param className
       *          {String} name of the class
       */
      _updateHistory: function _updateHistory(className) {
        var newTitle = className + " - " + this._titlePrefix;
        qx.bom.History.getInstance().addToHistory(this.__encodeState(className), newTitle);
      },

      /**
       * Display information about a class
       * 
       * @param classNode
       *          {qxl.apiviewer.dao.Class} class node to display
       */
      _selectClass: function _selectClass(classNode, callback, self) {
        var _this3 = this;

        this._detailLoader.exclude();
        this._tabViewController.showTabView();

        return classNode.loadDependedClasses().then(function () {
          if (classNode instanceof qxl.apiviewer.dao.Class) {
            return _this3._tabViewController.openClass(classNode, _this3.__openInNewTab);
          } else {
            return _this3._tabViewController.openPackage(classNode, _this3.__openInNewTab);
          }
        }).then(function () {
          return callback && callback.call(self);
        });
      },

      /**
       * Selects an item (class, property, method or constant).
       * 
       * @param fullItemName
       *          {String} the full name of the item to select. (e.g.
       *          "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
       * 
       * @lint ignoreDeprecated(alert)
       */
      __selectItem: function __selectItem(fullItemName) {
        var _this4 = this;

        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var className = fullItemName;
        var itemName = null;
        var hashPos = fullItemName.indexOf("#");

        if (hashPos != -1) {
          className = fullItemName.substring(0, hashPos);
          itemName = fullItemName.substring(hashPos + 1);

          var parenPos = itemName.indexOf("(");

          if (parenPos != -1) {
            itemName = itemName.substring(0, parenPos).trim();
          }
        }

        // ignore changeSelection events
        this._ignoreTreeSelection = true;
        this._tree.selectTreeNodeByClassName(className).then(function (couldSelectTreeNode) {
          _this4._ignoreTreeSelection = false;

          if (!couldSelectTreeNode) {
            _this4.error("Unknown class: " + className);
            //alert("Unknown class: " + className);
            qxl.apiviewer.LoadingIndicator.getInstance().hide();
            return;
          }

          var sel = _this4._tree.getSelection();
          var nodeName = sel[0].getUserData("nodeName") || className;

          /**
           * @lint ignoreDeprecated(alert)
           */
          _this4._ignoreTabViewSelection = true;
          _this4._selectClass(qxl.apiviewer.ClassLoader.getClassOrPackage(nodeName), function () {
            if (itemName) {
              if (!_this4._tabViewController.showItem(itemName)) {
                _this4.error("Unknown item of class '" + className + "': " + itemName);
                //alert("Unknown item of class '"+ className +"': " + itemName);
                qxl.apiviewer.LoadingIndicator.getInstance().hide();

                _this4._updateHistory(className);
                _this4._ignoreTabViewSelection = false;
                return;
              }
            }
            _this4._updateHistory(fullItemName);
            _this4._ignoreTabViewSelection = false;
          });
        });
      },

      __encodeState: function __encodeState(state) {
        return state.replace(/(.*)#(.*)/g, "$1~$2");
      },

      __decodeState: function __decodeState(encodedState) {
        return encodedState.replace(/(.*)~(.*)/g, "$1#$2");
      }

    },

    /*
     * ****************************************************************************
     * DESTRUCTOR
     * ****************************************************************************
     */

    destruct: function destruct() {
      this._widgetRegistry = null;
      this._disposeObjects("_detailLoader", "_tree", "_history", "_tabViewController");
    }
  });
  qxl.apiviewer.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1555325129949