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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HaversineGeolocation = function () {
  function HaversineGeolocation() {
    _classCallCheck(this, HaversineGeolocation);
  }

  _createClass(HaversineGeolocation, [{
    key: '_convertMeasurements',

    /**
     * Convert measurements: "km to mi" or "km to m"
     *
     * @param distance
     * @param measurement
     * @returns {*}
     */
    value: function _convertMeasurements(distance) {
      var measurement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'km';

      var res = null;

      switch (measurement.toLowerCase()) {
        case 'mi':
          res = (distance * 0.62137).toFixed(1);
          break;
        case 'km':
          res = distance.toFixed(1);
          break;
        case 'm':
          res = (distance * 1000).toFixed();
          break;
        default:
          res = distance.toFixed(1);
      }

      return parseInt(res);
    }

    /**
     * Get distance between positions by Haversine formula
     *
     * @param args
     * @return {number}
     */

  }, {
    key: '_haversine',
    value: function _haversine() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var rad = args.map(function (deg) {
        return deg / 180.0 * Math.PI;
      });
      var lat1 = rad[0],
          lon1 = rad[1],
          lat2 = rad[2],
          lon2 = rad[3];
      var R = 6372.8;
      var dLat = lat2 - lat1;
      var dLon = lon2 - lon1;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.asin(Math.sqrt(a));

      return R * c;
    }
  }, {
    key: 'isGeolocationAvailable',


    /**
     * Check if geolocation enabled in user browser and users current position coordinates
     *
     * @return {Promise}
     */
    value: function isGeolocationAvailable() {
      return new Promise(function (resolve, reject) {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(function (data) {
            resolve(data);
          }, function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error("Error: Permission denied"));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("Error: Position unavailable"));
                break;
              case error.TIMEOUT:
                reject(new Error("Error: Timeout"));
                break;
            }
          });
        } else {
          reject(new Error("Error: Geolocation disabled in your browser"));
        }
      });
    }
  }, {
    key: 'getDistanceBetween',


    /**
     * Calculate distance between two positions
     *
     * @param p1
     * @param p2
     * @param measurement
     * @returns {number}
     */
    value: function getDistanceBetween(p1, p2, measurement) {
      if (p1.hasOwnProperty('latitude') && p1.hasOwnProperty('longitude') && p2.hasOwnProperty('latitude') && p2.hasOwnProperty('longitude')) {
        var d = this._haversine(p1.latitude, p1.longitude, p2.latitude, p2.longitude);

        return this._convertMeasurements(d, measurement);
      } else {
        throw new Error("Error: Position latitude or longitude is not correct");
      }
    }

    /**
     * Get closest position from array of positions
     *
     * @param current
     * @param otherPoints
     * @param measurement
     * @returns {{}}
     */

  }, {
    key: 'getClosestPosition',
    value: function getClosestPosition(current, otherPoints, measurement) {
      var _this = this;

      var distance = null;
      var data = {};

      otherPoints.map(function (position) {
        var res = _this.getDistanceBetween(current, position, measurement);
        if (distance === null || distance > res) {
          distance = res;
          for (var prop in position) {
            if (position.hasOwnProperty(prop)) {
              data[prop] = position[prop];
            }
          }
          data.haversine = { distance: distance, measurement: measurement, accuracy: current.accuracy };
        }
      });

      return data;
    }
  }]);

  return HaversineGeolocation;
}();

/* harmony default export */ __webpack_exports__["default"] = (new HaversineGeolocation());

/***/ })
/******/ ]);