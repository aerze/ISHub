/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactDOM = __webpack_require__(11);
	var ISHClient = __webpack_require__(4);

	// var page = require('page'); // load routes

	// var utils = require('./utils');

	// var test = {
	//     root: function (context, next) {
	//         console.log('context', context);
	//     }
	// }

	// var routes = utils.requireRoutes();

	// page('/', test.root);
	// page();

	ReactDOM.render(React.createElement(ISHClient, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _Toolbar = __webpack_require__(5);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ISHClient = _react2.default.createClass({
	  displayName: 'ISHClient',

	  componentDidMount: function componentDidMount() {
	    $('.button-menu').sideNav();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_Toolbar2.default, null),
	      _react2.default.createElement(
	        'div',
	        { className: 'window' },
	        _react2.default.createElement(
	          'ul',
	          { id: 'slide-out', className: 'side-nav fixed' },
	          _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement(
	              'a',
	              null,
	              'My Item Sets'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'content' },
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit assumenda, expedita laboriosam ad recusandae voluptatum facere molestias dolores, autem excepturi, maxime eius! Autem quasi facere dignissimos, libero, nam expedita dicta.'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = ISHClient;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(9);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _GUI = __webpack_require__(10);

	var _GUI2 = _interopRequireDefault(_GUI);

	var _jquery = __webpack_require__(12);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Toolbar = _react2.default.createClass({
	  displayName: 'Toolbar',

	  devTools: function devTools() {
	    WIN.showDevTools();
	  },
	  close: function close() {
	    WIN.close();
	  },
	  minimize: function minimize() {
	    WIN.minimize();
	  },
	  componentWillMount: function componentWillMount() {
	    var manifest = _GUI2.default.App.manifest;
	    document.title += ' v' + manifest.version;
	    this.setState({ title: document.title });
	  },
	  componentDidMount: function componentDidMount() {
	    (0, _jquery2.default)('.button-menu').sideNav();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'toolbar' },
	      _react2.default.createElement(
	        'button',
	        { onClick: this.close,
	          className: 'pure-button button-close' },
	        _react2.default.createElement('i', { className: 'lnr lnr-cross' })
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.minimize,
	          className: 'pure-button button-min' },
	        _react2.default.createElement(
	          'i',
	          { className: 'lnr' },
	          '—'
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { 'data-activates': 'slide-out',
	          className: 'pure-button button-menu' },
	        _react2.default.createElement('i', { className: 'lnr lnr-menu' })
	      ),
	      _react2.default.createElement(
	        'h6',
	        { className: 'title', id: 'title' },
	        this.state.title
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.devTools,
	          className: 'pure-button button-dev' },
	        _react2.default.createElement('i', { className: 'lnr lnr-cog' })
	      )
	    );
	  }
	});

	module.exports = Toolbar;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "body {\n  overflow: hidden;\n  background: #3d4f5d;\n  color: #fff;\n  width: 100%;\n  height: 100%;\n/*-webkit-app-region: drag;*/\n}\n.window {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 32px;\n  padding-left: 240px;\n}\n.window .side-nav {\n  top: 26px;\n}\n@media only screen and (max-width: 960px) {\n  .window {\n    padding-left: 0;\n  }\n}\n/*Content (right) Window*/\n.content {\n  height: 99%;\n  overflow: scroll;\n  color: #fff;\n  padding: 2rem;\n  padding-left: 3rem;\n}\n.json {\n  font-size: 1.2rem;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ".toolbar {\n  width: 100%;\n  height: 32px;\n  background: #333;\n  position: fixed;\n  top: 0;\n  z-index: 10000;\n  -webkit-app-region: drag;\n}\n.toolbar .title {\n  float: left;\n  margin: 0.6em 1em 0;\n}\n.toolbar .pure-button {\n  padding: 0px;\n  height: inherit;\n  width: 45px;\n  float: right;\n  border-radius: 0px;\n  -webkit-app-region: no-drag;\n  background: rgba(0,0,0,0);\n  color: #eee;\n  font-size: 1.3em;\n}\n.toolbar .pure-button .lnr {\n  position: relative;\n  bottom: -1.5px;\n}\n.toolbar .pure-button.button-close:hover {\n  background: #ca3c3c;\n}\n.toolbar .pure-button.button-restore:hover {\n  background: #45c15a;\n}\n.toolbar .pure-button.button-restore:hover {\n  background: #45c15a;\n}\n.toolbar .pure-button.button-min:hover {\n  background: #747474;\n}\n.toolbar .pure-button.button-min .lnr {\n  bottom: 0px;\n}\n.toolbar .pure-button.button-menu {\n  float: left;\n}\n.toolbar .pure-button.button-menu:hover {\n  background: #4ca338;\n}\n.toolbar .pure-button.button-menu .lnr {\n  font-size: 28px;\n  bottom: -1px;\n}\n.toolbar .pure-button.button-dev {\n  float: left;\n}\n.toolbar .pure-button.button-dev:hover {\n  background: #fa8e00;\n}\n.toolbar .pure-button.button-dev i {\n  position: relative;\n  bottom: -1.5px;\n}\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./ISHClient.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./ISHClient.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./toolbar.styl", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/stylus-loader/index.js!./toolbar.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = GUI;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ }
/******/ ]);