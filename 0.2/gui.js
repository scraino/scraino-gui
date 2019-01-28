var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[4],{

/***/ 1517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1516);

__webpack_require__(1514);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(32);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _analytics = __webpack_require__(39);

var _analytics2 = _interopRequireDefault(_analytics);

var _gui = __webpack_require__(156);

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(122);

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(121);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _index = __webpack_require__(436);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register "base" page view
_analytics2.default.pageview('/');

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_gui2.default.setAppElement(appTarget);
var WrappedGui = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)(_gui2.default));

// TODO a hack for testing the backpack, allow backpack host to be set by url param
var backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
var backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

var backpackOptions = {
    visible: true,
    host: backpackHost
};

_reactDom2.default.render(_react2.default.createElement(WrappedGui, { backpackOptions: backpackOptions }), appTarget);

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "html,\r\nbody,\r\n.index_app_2mqDO {\r\n    /* probably unecessary, transitional until layout is refactored */\r\n    width: 100%; \r\n    height: 100%;\r\n    margin: 0;\r\n\r\n    /* Setting min height/width makes the UI scroll below those sizes */\r\n    min-width: 1024px;\r\n    min-height: 640px; /* Min height to fit sprite/backdrop button */\r\n}\r\n\r\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\r\n\r\n* { -webkit-box-sizing: border-box; box-sizing: border-box; font-family: -apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,HelveticaNeue-Light,Noto Sans,Microsoft YaHei,PingFang SC,Hiragino Sans GB,Source Han Sans SC,Source Han Sans CN,Source Han Sans,sans-serif !important; }\r\n", ""]);

// exports
exports.locals = {
	"app": "index_app_2mqDO"
};

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(435);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

},[[1517,0]]]);
//# sourceMappingURL=gui.js.map