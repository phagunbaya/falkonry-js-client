/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Assessment
 *  Entity helper class to create Assessment object
 * @constructor
 *
 * @param {Assessment} assessment
 */

function Assessment(assessment) {
  var _this = this;
  _this.raw = assessment || {};
}

Assessment.prototype.getId = function() {
  var _this = this;
  return _this.raw['key'];
};

Assessment.prototype.setName = function(name) {
  var _this = this;
  _this.raw['name'] = name;
  return _this;
};

Assessment.prototype.getName = function() {
  var _this = this;
  return _this.raw['name'];
};

Assessment.prototype.setInputSignals = function(inputs) {
  var _this = this;
  _this.raw['inputList'] = inputs;
  return _this;
};

Assessment.prototype.getInputSignals = function() {
  var _this = this;
  return _this.raw['inputList'];
};

Assessment.prototype.setAprioriConditions = function(conditions) {
  var _this = this;
  _this.raw['aprioriConditionList'] = conditions;
  return _this;
};

Assessment.prototype.getAprioriConditions = function() {
  var _this = this;
  return _this.raw['aprioriConditionList'];
};

Assessment.prototype.toJSON = function(){
  return this.raw;
};

module.exports = Assessment;