(function(){

if (!window.qx) 
  window.qx = {};

qx.$$start = new Date();

if (!qx.$$appRoot) {
  var strBase = null;
  var pos;
  var bootScriptElement = document.currentScript; // Everything except IE11 https://caniuse.com/#feat=document-currentscript
  if (!bootScriptElement) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.match(/boot\.js/)) {
        bootScriptElement = scripts[i];
        break;
      }
    }
  }
  
  if (bootScriptElement) {
    strBase = bootScriptElement.src;
    pos = strBase.indexOf('?');
    if (pos > -1)
      strBase = strBase.substring(0, pos);
    pos = strBase.lastIndexOf('/');
    if (pos > -1) {
      strBase = strBase.substring(0, pos + 1);
    } else {
      strBase = "";
    }
  }
  if (!strBase) {
    strBase = document.location.href;
    pos = strBase.lastIndexOf('/');
    if (pos > -1) {
      strBase = strBase.substring(0, pos + 1);
    } else if (strBase[strBase.length - 1] != '/') {
      strBase += "/";
    }
    if (qx.$$appRoot) {
      strBase += qx.$$appRoot;
      if (strBase[strBase.length - 1] != '/') {
        strBase += "/";
      }
    }
  }
  qx.$$appRoot = strBase;
} else {
  if (qx.$$appRoot[qx.$$appRoot.length - 1] != "/")
    qx.$$appRoot += "/";
}
  
if (!qx.$$environment) 
  qx.$$environment = {};

var envinfo = {
  "qx.application": "qxl.apiviewer.Application",
  "qx.revision": "",
  "qx.theme": "qxl.apiviewer.Theme",
  "qx.version": "6.0.0-alpha-20190409-f79cc78",
  "qx.libraryInfoMap": {
    "qxl.apiviewer": {
      "name": "Qooxdoo API Viewer",
      "summary": "A viewer application to browse generated API documentation of qooxdoo classes",
      "description": "The Api Viewer lets you browse API documentation generated from Javascript source comments. It supports many specifics of qooxdoo classes like inheritance, properties and private members.",
      "keywords": [
        "API",
        "class browser"
      ],
      "homepage": "https://github.com/qooxdoo/apiviewer",
      "license": "MIT",
      "authors": [
        {
          "name": "John Spackman (johnspackman)",
          "email": "john.spackman@zenesis.com"
        },
        {
          "name": "Daniel Wagner (dwagner)",
          "email": "daniel DOT wagner AT 1und1 DOT de"
        },
        {
          "name": "Adrian Olaru (adrianolaru)",
          "email": "Adrian DOT Olaru AT 1and1 DOT ro"
        },
        {
          "name": "Henner Kollmann (hkollmann)",
          "email": "Henner DOT Kollmann AT gmx DOT de"
        }
      ],
      "version": "0.1.12",
      "qooxdoo-range": "^6.0.0-alpha",
      "sourceViewUri": "https://github.com/qooxdoo/apiviewer/blob//source/class/#L"
    },
    "qx": {
      "name": "qooxdoo framework",
      "summary": "The qooxdoo framework library",
      "description": "This library contains the qooxdoo Javascript framework classes for website, mobile, desktop and server.",
      "keywords": [
        "qooxdoo",
        "framework",
        "widget",
        "cross-browser",
        "ajax"
      ],
      "homepage": "http://qooxdoo.org",
      "license": "MIT",
      "authors": [
        {
          "name": "Alexander Steitz (asteitz)",
          "email": "alexander DOT steitz AT 1und1 DOT de"
        },
        {
          "name": "Christopher Zündorf (czuendorf)",
          "email": "christopher DOT zuendorf AT 1und1 DOT de"
        },
        {
          "name": "Daniel Wagner (danielwagner)",
          "email": "daniel DOT wagner AT 1und1 DOT de"
        },
        {
          "name": "Derrell Lipman (derrell)",
          "email": "derrell DOT lipman AT unwireduniverse DOT com"
        },
        {
          "name": "Andreas Ecker (ecker)",
          "email": "andreas DOT ecker AT 1und1 DOT de"
        },
        {
          "name": "Christian Hagendorn (Hagendorn)",
          "email": "christian DOT hagendorn AT 1und1 DOT de"
        },
        {
          "name": "Mustafa Sak (msak)",
          "email": "Mustafa DOT Sak AT 1und1 DOT de"
        },
        {
          "name": "Thomas Herchenröder (thron7)",
          "email": "thron7 AT users DOT sourceforge DOT net"
        },
        {
          "name": "Tino Butz (tjbutz)",
          "email": "tino DOT butz AT 1und1 DOT de"
        },
        {
          "name": "Tristan Koch (trkoch)",
          "email": "tristan DOT koch AT 1und1 DOT de"
        },
        {
          "name": "Martin Wittemann (wittemann)",
          "email": "martin DOT wittemann AT 1und1 DOT de"
        }
      ],
      "version": "6.0.0-alpha-20190409-f79cc78",
      "qooxdoo-versions": [
        "6.0.0-alpha-20190409-f79cc78"
      ],
      "sourceViewUri": "https://github.com/qooxdoo/qooxdoo/blob//framework/source/class/#L"
    },
    "qxl.versionlabel": {
      "name": "versionlabel",
      "summary": "version label for qooxdoo demo apps",
      "description": "",
      "license": "MIT",
      "authors": [
        {
          "name": "First Author (uid)",
          "email": "first.author@some.domain"
        }
      ],
      "version": "0.1.2"
    }
  },
  "true": true,
  "qx.allowUrlSettings": false,
  "qx.allowUrlVariants": false,
  "qx.debug.property.level": 0,
  "qx.debug": true,
  "qx.debug.ui.queue": true,
  "qx.debug.touchpad.detection": false,
  "qx.aspects": false,
  "qx.dynlocale": true,
  "qx.dyntheme": true,
  "qx.blankpage": "qx/static/blank.html",
  "qx.debug.databinding": false,
  "qx.debug.dispose": false,
  "qx.optimization.basecalls": false,
  "qx.optimization.comments": false,
  "qx.optimization.privates": false,
  "qx.optimization.strings": false,
  "qx.optimization.variables": false,
  "qx.optimization.variants": false,
  "module.databinding": true,
  "module.logger": true,
  "module.property": true,
  "module.events": true,
  "qx.nativeScrollBars": false,
  "qx.automaticMemoryManagement": true,
  "qx.promise": true,
  "qx.promise.warnings": true,
  "qx.promise.longStackTraces": true,
  "qx.compilerVersion": "0.2.73",
  "module.objectid": true,
  "excludeFromAPIViewer": [
    "qxl.apiviewer.*"
  ]
};
for (var k in envinfo) 
  qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) 
  qx.$$libraries = {};
var libinfo = {
  "__out__": {
    "sourceUri": qx.$$appRoot + ""
  },
  "dialog": {
    "sourceUri": qx.$$appRoot + ".",
    "resourceUri": qx.$$appRoot + "../resource"
  },
  "qxl.apiviewer": {
    "sourceUri": qx.$$appRoot + ".",
    "resourceUri": qx.$$appRoot + "../resource"
  },
  "qxl.versionlabel": {
    "sourceUri": qx.$$appRoot + ".",
    "resourceUri": qx.$$appRoot + "../resource"
  },
  "qx": {
    "sourceUri": qx.$$appRoot + ".",
    "resourceUri": qx.$$appRoot + "../resource"
  }
};
for (var k in libinfo) 
  qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {
  "C": null,
  "en": null
};
qx.$$locales = {
  "C": null,
  "en": null
};
qx.$$packageData = {};
qx.$$g = {};
qx.$$createdAt = function(obj, filename, lineNumber, column) {
  if (obj !== undefined && obj !== null && typeof Object.$$createdAt === undefined) {
    Object.defineProperty(obj, "$$createdAt", {
      value: {
        filename: filename,
        lineNumber: lineNumber,
        column: column
      },
      enumerable: false,
      configurable: false,
      writable: false
    });
  }
  return obj;
};

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

qx.$$loader = {
  parts : {
  "boot": [
    0
  ]
},
  packages : {
  "0": {
    "uris": [
      "__out__:part-0.js"
    ]
  }
},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : false,
  addNoCacheParam : false,
  isLoadParallel: !isFirefox && 'async' in document.createElement('script'),
  delayDefer: true,
  splashscreen: window.QOOXDOO_SPLASH_SCREEN || null,
  isLoadChunked: false,
  loadChunkSize: null,

  decodeUris : function(compressedUris, pathName) {
    if (!pathName)
      pathName = "sourceUri";
    var libs = qx.$$libraries;
    var uris = [];
    for (var i = 0; i < compressedUris.length; i++) {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length == 2 && uri[0] in libs) {
        var prefix = libs[uri[0]][pathName];
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;
  },
  
  deferredEvents: null,
  
  /*
   * Adds event handlers
   */
  on: function(eventType, handler) {
    if (this.deferredEvents === null)
      this.deferredEvents = {};
    var handlers = this.deferredEvents[eventType];
    if (handlers === undefined)
      handlers = this.deferredEvents[eventType] = [];
    handlers.push({ eventType: eventType, handler: handler });
  },
  
  /*
   * Startup handler, hooks into Qooxdoo proper
   */
  signalStartup: function () {
    qx.Bootstrap.executePendingDefers();
    qx.$$loader.delayDefer = false;
    qx.$$loader.scriptLoaded = true;
    function done() {
      var readyHandlers = [];
      if (qx.$$loader.deferredEvents) {
        Object.keys(qx.$$loader.deferredEvents).forEach(function(eventType) {
          var handlers = qx.$$loader.deferredEvents[eventType];
          handlers.forEach(function(handler) {
            qx.event.Registration.addListener(window, eventType, handler.handler);
            if (eventType === "ready")
              readyHandlers.push(handler.handler);
          });
        });
      }
      if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
        qx.event.handler.Application.onScriptLoaded();
        qx.$$loader.applicationHandlerReady = true;
      } else {
        qx.$$loader.applicationHandlerReady = false;
        readyHandlers.forEach(function(handler) {
          handler(null);
        });
      }
    }
    if (qx.$$loader.splashscreen)
      qx.$$loader.splashscreen.loadComplete(done);
    else
      done();
  },

  /*
   * Starts the whole loading process
   */
  init: function(){
    var l = qx.$$loader;
    l.decodeUris(l.cssBefore, "resourceUri").forEach(function(uri) {
      loadCss(uri);
    });
    allScripts = l.decodeUris(l.urisBefore, "resourceUri");
    if (!l.bootIsInline) {
      var add = l.decodeUris(l.packages[l.parts[l.boot][0]].uris);
      Array.prototype.push.apply(allScripts, add);
    }
    
    function begin() {
      flushScriptQueue(function(){
        // Opera needs this extra time to parse the scripts
        window.setTimeout(function(){
          var bootPackageHash = l.parts[l.boot][0];
          l.importPackageData(qx.$$packageData[bootPackageHash] || {});
          l.signalStartup();
        }, 0);
      });
    }
    
    if (qx.$$loader.splashscreen)
      qx.$$loader.splashscreen.loadBegin(begin);
    else
      begin();
  }
};

/*
 * Collect URL parameters
 */
var URL_PARAMETERS = {}
if (document.location.search) {
  var args = document.location.search.substring(1).split('&');
  args.forEach(function(arg) {
    var match = arg.match(/^qooxdoo\:([^=]+)(=(.*))?/);
    if (match) {
      var key = match[1];
      var value = match[3];
      if (value === undefined || value === "true" || value === "1")
        value = true;
      URL_PARAMETERS[key] = value;
    }
  });
}

/*
 * Get settings from Splash Screen
 */
if (URL_PARAMETERS["splashscreen-disable"] === true)
  qx.$$loader.splashscreen = null;
if (qx.$$loader.splashscreen) {
  // If there's a Splash Screen, default to chunked
  qx.$$loader.isLoadChunked = true;
  var settings = qx.$$loader.splashscreen.getSettings()||{};
  if (typeof settings.isLoadChunked == "boolean")
    qx.$$loader.isLoadChunked = settings.isLoadChunked;
  if (typeof settings.loadChunkSize == "number" && settings.loadChunkSize > 1)
    qx.$$loader.loadChunkSize = settings.loadChunkSize; 
}

/*
 * Override with URL parameters
 */
for (var key in URL_PARAMETERS) {
  var value = URL_PARAMETERS[key];
  switch(key) {
  case "add-no-cache":
    qx.$$loader.addNoCacheParam = value === true;
    break;
    
  case "load-parallel":
    qx.$$loader.isLoadParallel = value === true;
    break;
    
  case "load-chunked":
    qx.$$loader.isLoadChunked = value === true;
    break;
  }
}

/*
 * IE
 */
var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

/*
 * Load Javascript
 */
function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };
  elem.onerror = function() {
    if (console && typeof console.error == "function")
      console.error("Cannot load script " + uri);
    callback && callback("Cannot load script " + uri);
  }

  if (qx.$$loader.isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

/*
 * Load CSS
 */
function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

/*
 * Used during initialisation and by `qx.io.part.Package` to load data for parts
 */
qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]) {
    var resMap = dataMap["resources"];
    for (var k in resMap) 
      qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]) {
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap) {
      if (!qxlocs[lang]) 
        qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]) {
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap) {
      if (!qxtrans[lang]) 
        qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) 
          qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

/*
 * Script queue
 */
var allScripts = [];
var nextScriptIndex = 0;

var flushScriptQueue = 
  qx.$$loader.isLoadParallel && qx.$$loader.isLoadChunked ?
    function(callback) {
      if (nextScriptIndex >= allScripts.length)
        return callback();
      var options = {
          numScripts: allScripts.length,
          numScriptsLoaded: 0,
          numScriptsLoading: 0
      };
      var chunkSize = qx.$$loader.loadChunkSize;
      if (chunkSize === null)
        chunkSize = Math.round(options.numScripts / 20);
      if (chunkSize < 1)
        chunkSize = 1;
      function checkForEnd() {
        if (options.numScriptsLoaded == options.numScripts)
          callback && callback();
        else if (options.numScriptsLoading == 0)
          loadNextChunk();
      }
      function onLoad() {
        options.numScriptsLoaded++;
        options.numScriptsLoading--;
        if (qx.$$loader.splashscreen)
          qx.$$loader.splashscreen.scriptLoaded(options, checkForEnd);
        else
          checkForEnd();
      }
      function loadNextChunk() {
        //console.log("Loading next chunk; chunkSize=" + chunkSize + ", numScripts=" + options.numScripts + ", numScriptsLoaded=" + options.numScriptsLoaded + ", numScriptsLoading=" + options.numScriptsLoading)
        while (nextScriptIndex < allScripts.length && options.numScriptsLoading < chunkSize) {
          var uri = allScripts[nextScriptIndex++];
          options.numScriptsLoading++;
          loadScript(uri, onLoad);
        }
      }
      loadNextChunk();
    }

  : qx.$$loader.isLoadParallel ?
    function(callback) {
      if (nextScriptIndex >= allScripts.length)
        return callback();
      var options = {
          numScripts: allScripts.length,
          numScriptsLoaded: 0,
          numScriptsLoading: 0
      };
      function checkForEnd() {
        if (options.numScriptsLoaded == options.numScripts)
          callback && callback();
      }
      function onLoad() {
        options.numScriptsLoaded++;
        options.numScriptsLoading--;
        if (qx.$$loader.splashscreen)
          qx.$$loader.splashscreen.scriptLoaded(options, checkForEnd);
        else
          checkForEnd();
      }
      while (nextScriptIndex < allScripts.length) {
        var uri = allScripts[nextScriptIndex++];
        options.numScriptsLoading++;
        loadScript(uri, onLoad);
      }
    }
    
  :
    function(callback) {
      var options = {
          numScripts: allScripts.length,
          numScriptsLoaded: 0,
          numScriptsLoading: 1
      };
      function queueLoadNext() {
        if (isWebkit) {
          // force async, else Safari fails with a "maximum recursion depth exceeded"
          window.setTimeout(loadNext, 0);
        } else {
          loadNext();
        }
      }
      function loadNext() {
        if (nextScriptIndex >= allScripts.length)
          return callback();
        var uri = allScripts[nextScriptIndex++];
        //console.log("Loading next chunk; chunkSize=" + chunkSize + ", numScripts=" + options.numScripts + ", numScriptsLoaded=" + options.numScriptsLoaded + ", numScriptsLoading=" + options.numScriptsLoading)
        loadScript(uri, function() {
          options.numScriptsLoaded++;
          if (qx.$$loader.splashscreen)
            qx.$$loader.splashscreen.scriptLoaded(options, queueLoadNext);
          else
            queueLoadNext();
        });
      }
      loadNext();
    };

/*
 * DOM loading
 */
var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

})();




qx.$$loader.init();

