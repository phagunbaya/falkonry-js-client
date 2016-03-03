/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var _          = require('underscore');
var Schemas    = require('../schema');
var Signal     = require('./Signal');
var Assessment = require('./Assessment');

/**
 * Pipeline
 *  Entity helper class to create Pipeline object
 * @constructor
 *
 * @param {Pipeline} pipeline
 */

function Pipeline(pipeline) {
  var _this = this;
  _this.raw = pipeline || {};
  if(!_this.raw.inputConf) {
    _this.raw.inputConf = {
      'type' : 'EVENTBUFFER',
      'streaming' : true
    }
  }

  if(!_this.raw.timeIdentifier) {
    _this.raw.timeIdentifier = 'time';
  }

  if(!_this.raw.timeFormat) {
    _this.raw.timeFormat = 'iso_8601';
  }

  if(Array.isArray(_this.raw.inputList)){
    var inputs = _.map(_this.raw.inputList, function(eachInput){
      return new Signal(eachInput);
    });
    _this.raw.inputList = inputs;
  }

  if(Array.isArray(_this.raw.assessmentList)){
    var assessments = _.map(_this.raw.assessmentList, function(eachAssessment){
      return new Signal(eachAssessment);
    });
    _this.raw.assessmentList = assessments;
  }
}

Pipeline.prototype.getId = function() {
  var _this = this;
  return _this.raw['id'];
};

Pipeline.prototype.setSourceId = function(sourceId) {
  var _this = this;
  _this.raw['sourceId'] = sourceId;
  return _this;
};

Pipeline.prototype.getSourceId = function() {
  var _this = this;
  return _this.raw['sourceId'];
};

Pipeline.prototype.setName = function(name) {
  var _this = this;
  _this.raw['name'] = name;
  return _this;
};

Pipeline.prototype.getName = function() {
  var _this = this;
  return _this.raw['name'];
};

Pipeline.prototype.getAccount = function() {
  var _this = this;
  return _this.raw['tenant'];
};

Pipeline.prototype.getCreateTime = function() {
  var _this = this;
  return _this.raw['createTime'];
};

Pipeline.prototype.getCreatedBy = function() {
  var _this = this;
  return _this.raw['createdBy'];
};

Pipeline.prototype.getUpdateTime = function() {
  var _this = this;
  return _this.raw['updateTime'];
};

Pipeline.prototype.getupdatedBy = function() {
  var _this = this;
  return _this.raw['updatedBy'];
};

Pipeline.prototype.setInputConf = function(inputConf) {
  var _this = this;
  _this.raw['inputConf'] = inputConf;
  return _this;
};

Pipeline.prototype.getInputConf = function() {
  var _this = this;
  return _this.raw['inputConf'];
};


Pipeline.prototype.setThingIdentifier = function(identifier) {
  var _this = this;
  _this.raw['thingIdentifier'] = identifier;
  return _this;
};

Pipeline.prototype.getThingIdentifier = function() {
  var _this = this;
  return _this.raw['thingIdentifier'];
};

Pipeline.prototype.setTimeIdentifier = function(identifier) {
  var _this = this;
  _this.raw['timeIdentifier'] = identifier;
  return _this;
};

Pipeline.prototype.getTimeIdentifier = function() {
  var _this = this;
  return _this.raw['timeIdentifier'];
};

Pipeline.prototype.setTimeFormat = function(format) {
  var _this = this;
  _this.raw['timeFormat'] = format;
  return _this;
};

Pipeline.prototype.getTimeFormat = function() {
  var _this = this;
  return _this.raw['timeFormat'];
};

Pipeline.prototype.setThingName = function(name) {
  var _this = this;
  _this.raw['singleThingID'] = name;
  return _this;
};

Pipeline.prototype.getThingName = function() {
  var _this = this;
  return _this.raw['singleThingID'];
};

Pipeline.prototype.setInputSignal = function(signal, type) {
  var _this = this;
  if(!_.contains(Schemas.InputSignalTypes, type))
    return _this;

  var signals = _this.raw['inputList'] || [];
  var newSignal = new Signal({
    'name' : signal,
    'valueType' : {
      'type' : type
    }
  });
  signals.push(newSignal);
  _this.raw['inputList'] = signals;
  return _this;
};

Pipeline.prototype.setInputSignals = function(inputList) {
  var _this = this;
  var inputs = [];
  _.each(inputList, function(type, name){
    var newSignal = new Signal({
      'name'      : name,
      'valueType' : {
        'type' : type
      }
    });
    inputs.push(newSignal);
  });
  _this.raw['inputList'] = inputs;
  return _this;
};

Pipeline.prototype.getInputSignals = function() {
  var _this = this;
  return _this.raw['inputList'];
};

Pipeline.prototype.setAssessment = function(assessment) {
  var _this = this;
  if(!assessment instanceof Assessment) {
    return _this;
  }
  var assessments = _this.raw['assessmentList'] || [];
  assessments.push(assessment);
  _this.raw['assessmentList'] = assessments;
  return _this;
};

Pipeline.prototype.setAssessments = function(assessments) {
  var _this = this;
  var assessmentList = _this.raw['assessmentList'] || [];
  assessments.forEach(function(eachAssessment){
    if(eachAssessment instanceof Assessment) {
      assessmentList.push(eachAssessment);
    }
  });
  _this.raw['assessmentList'] = assessmentList;
  return _this;
};

Pipeline.prototype.getAssessments = function() {
  var _this = this;
  return _this.raw['assessmentList'];
};

Pipeline.prototype.getStatus = function() {
  var _this = this;
  return _this.raw['status'];
};

Pipeline.prototype.getOutflowStatus = function() {
  var _this = this;
  return _this.raw['outflowStatus'];
};

Pipeline.prototype.setInterval = function(signal, duration) {
  var _this = this;
  _this.raw['interval'] = {
    'field' : signal,
    'duration' : duration
  };
  return _this;
};

Pipeline.prototype.getInterval = function() {
  var _this = this;
  return _this.raw['interval'];
};

Pipeline.prototype.getEarliestDataTime = function() {
  var _this = this;
  return _this.raw['earliestDataPoint'];
};

Pipeline.prototype.getLatestDataTime = function() {
  var _this = this;
  return _this.raw['latestDataPoint'];
};

Pipeline.prototype.toJSON = function() {
  var _this = this;
  var inputs = _.map(_this.raw.inputList, function(eachInput){
    return eachInput.toJSON();
  });

  var assessments = _.map(_this.raw.assessmentList, function(eachAssessment){
    return eachAssessment.toJSON();
  });

  var clone = function(pipeline, inputs, assessments){
    pipeline = _.clone(pipeline);
    pipeline.inputList      = inputs;
    pipeline.assessmentList = assessments;
    return pipeline;
  }(_this.raw, inputs, assessments);

  return clone;
};

module.exports = Pipeline;