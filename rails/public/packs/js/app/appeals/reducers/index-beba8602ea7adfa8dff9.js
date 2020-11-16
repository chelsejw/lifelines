/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/app/appeals/reducers/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/app/appeals/reducers/index.js":
/*!************************************************************!*\
  !*** ./app/javascript/packs/app/appeals/reducers/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var appealsReducer = function appealsReducer() {
  var _focusedData;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    data: [],
    isLoading: false,
    hasErrored: false,
    focusedData: (_focusedData = {
      id: "",
      species: "",
      clinic: ""
    }, _defineProperty(_focusedData, "species", ""), _defineProperty(_focusedData, "pet_name", ""), _defineProperty(_focusedData, "user", ""), _focusedData),
    focusedIsLoading: false,
    focusedHasErrored: false,
    focusedLifeline: {
      isUserConnected: false
    },
    throwLifeline: {
      data: {},
      success: false
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'APPEALS_FETCH_DATA_SUCCESS':
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.data
      });

    case 'APPEALS_IS_LOADING':
      return _objectSpread(_objectSpread({}, state), {}, {
        isLoading: action.isLoading
      });

    case 'APPEALS_HAS_ERROR':
      return _objectSpread(_objectSpread({}, state), {}, {
        hasErrored: action.hasErrored
      });

    case 'FOCUSED_APPEAL_FETCH_DATA_SUCCESS':
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedData: action.data
      });

    case 'FOCUSED_APPEAL_IS_LOADING':
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedIsLoading: action.isLoading
      });

    case 'FOCUSED_APPEAL_HAS_ERROR':
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedHasErrored: action.hasErrored
      });

    case 'LIFELINES_FETCH_DATA_SUCCESS':
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedLifeline: action.data
      });

    case 'THROW_LIFELINE_SUCCESS':
      return _objectSpread(_objectSpread({}, state), {}, {
        throwLifeline: {
          data: action.data,
          success: true
        }
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (appealsReducer);

/***/ })

/******/ });
//# sourceMappingURL=index-beba8602ea7adfa8dff9.js.map