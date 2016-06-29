/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var _           = require('underscore');
var Schemas     = require('../schema');
var Signal      = require('./Signal');
var Assessment  = require('./Assessment');
var Publication = require('./Publication');

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

  if(Array.isArray(_this.raw.inputList)){
    var inputs = _.map(_this.raw.inputList, function(eachInput){
      return new Signal(eachInput);
    });
    _this.raw.inputList = inputs;
  }

  if(Array.isArray(_this.raw.assessmentList)){
    var assessments = _.map(_this.raw.assessmentList, function(eachAssessment){
      return new Assessment(eachAssessment);
    });
    _this.raw.assessmentList = assessments;
  }

  if(Array.isArray(_this.raw.publicationList)){
    var publications = _.map(_this.raw.publicationList, function(publication){
      return new Publication(publication);
    });
    _this.raw.publicationList = publications;
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

Pipeline.prototype.getUpdatedBy = function() {
  var _this = this;
  return _this.raw['updatedBy'];
};

Pipeline.prototype.setEventbuffer = function(eventbuffer) {
  var _this = this;
  _this.raw['input'] = eventbuffer;
  return _this;
};

Pipeline.prototype.getEventbuffer = function() {
  var _this = this;
  return _this.raw['input'];
};

Pipeline.prototype.getInputMeasurement = function() {
  var _this = this;
  return _this.raw['inputMeasurement'];
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

Pipeline.prototype.setThingName = function(name) {
  var _this = this;
  _this.raw['singleThingID'] = name;
  return _this;
};

Pipeline.prototype.getThingName = function() {
  var _this = this;
  return _this.raw['singleThingID'];
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

Pipeline.prototype.setInputSignal = function(signal, type, eventType) {
  var _this = this;
  if(!_.contains(Schemas.InputSignalTypes, type))
    return _this;

  var signals = _this.raw['inputList'] || [];
  var signal = {
    'name' : signal,
    'valueType' : {
      'type' : type
    }
  };
  if (eventType === 'Occurrences' || eventType === 'Samples')
    signal['eventType'] = {
      'type' : eventType
    };
  else{
    signal['eventType'] = {
      'type' : 'Samples'
    };
  }

  var newSignal = new Signal(signal);
  signals.push(newSignal);
  _this.raw['inputList'] = signals;
  return _this;
};

Pipeline.prototype.setInputSignals = function(inputList) {
  var _this = this;
  var inputs = [];
  _.each(inputList, function(type, name){
    if(Array.isArray(type)) {
      var newSignal = new Signal({
        'name' : name,
        'valueType' : {
          'type' : type[0]
        },
        'eventType' : {
          'type' : type[1]
        }
      })
    }
    else{
      var newSignal = new Signal({
        'name'      : name,
        'valueType' : {
          'type' : type
        },
        'eventType' : {
          'type' : 'Samples'
        }
      });
    }
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

Pipeline.prototype.setPublications = function(publications) {
  var _this = this;
  var publicationList = _this.raw['assessmentList'] || [];
  publications.forEach(function(eachPublication){
    if(eachPublication instanceof Publication) {
      publicationList.push(eachPublication);
    }
  });
  _this.raw['publicationList'] = publicationList;
  return _this;
};

Pipeline.prototype.getPublications = function() {
  var _this = this;
  return _this.raw['publicationList'];
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

Pipeline.prototype.getModelRevisions = function() {
  var _this = this;
  return _this.raw['modelRevisionList'];
};

Pipeline.prototype.getOutflowHistory = function() {
  var _this = this;
  return _this.raw['outflowHistory'];
};

Pipeline.prototype.toJSON = function() {
  var _this = this;
  var inputs = _.map(_this.raw.inputList, function(eachInput){
    return eachInput.toJSON();
  });

  var assessments = _.map(_this.raw.assessmentList, function(eachAssessment){
    return eachAssessment.toJSON();
  });

  var publications = _.map(_this.raw.publicationList, function(eachPublication){
    return eachPublication.toJSON();
  });

  var clone = function(pipeline, inputs, assessments, publications){
    pipeline = _.clone(pipeline);
    pipeline.inputList       = inputs;
    pipeline.assessmentList  = assessments;
    pipeline.publicationList = publications;
    return pipeline;
  }(_this.raw, inputs, assessments, publications);

  return clone;
};

module.exports = Pipeline;