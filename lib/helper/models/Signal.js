/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var _       = require('underscore');
var Schemas = require('../schema');

/**
 * Signal
 *  Entity helper class to create Signal object
 * @constructor
 *
 * @param {Signal} signal
 */

function Signal(signal) {
  var _this = this;
  _this.raw = signal || {};
}

Signal.prototype.getId = function() {
  var _this = this;
  return _this.raw['key'];
};

Signal.prototype.setName = function(name) {
  var _this = this;
  _this.raw['name'] = name;
  return _this;
};

Signal.prototype.getName = function() {
  var _this = this;
  return _this.raw['name'];
};

Signal.prototype.setValueType = function(type) {
  var _this = this;
  if(typeof type === "string" && _.contains(Schemas.InputSignalTypes, type)) {
    _this.raw['valueType'] = {
      'type': type
    };
  }
  return _this;
};

Signal.prototype.getValueType = function() {
  var _this = this;
  return _this.raw['valueType'];
};

Signal.prototype.setEventType = function(type) {
  var _this = this;
  if(typeof type === "string" && _.contains(Schemas.InputSignalEventTypes)){
    _this.raw['eventType'] = {
      'type' : type
    }
  }
};

Signal.prototype.getEventType = function() {
  var _this = this;
  return _this.raw['eventType'];
};

Signal.prototype.toJSON = function() {
  return this.raw;
};

module.exports = Signal;