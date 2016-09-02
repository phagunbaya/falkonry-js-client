/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var _            = require('underscore');
var Schemas      = require('../schema');
var Signal       = require('./Signal');
var Assessment   = require('./Assessment');
var Subscription = require('./Subscription');

/**
 * Eventbuffer
 *  Entity helper class to create Eventbuffer object
 * @constructor
 *
 * @param {Eventbuffer} eventbuffer
 */

function Eventbuffer(eventbuffer) {
  var _this = this;
  _this.raw = eventbuffer || {};

  if(Array.isArray(_this.raw.subscriptionList)){
    var subscriptions = _.map(_this.raw.subscriptionList, function(subscription){
      return new Subscription(subscription);
    });
    _this.raw.subscriptionList = subscriptions;
  }
}

Eventbuffer.prototype.getId = function() {
  var _this = this;
  return _this.raw['id'];
};

Eventbuffer.prototype.setSourceId = function(sourceId) {
  var _this = this;
  _this.raw['sourceId'] = sourceId;
  return _this;
};

Eventbuffer.prototype.getSourceId = function() {
  var _this = this;
  return _this.raw['sourceId'];
};

Eventbuffer.prototype.setName = function(name) {
  var _this = this;
  _this.raw['name'] = name;
  return _this;
};

Eventbuffer.prototype.getName = function() {
  var _this = this;
  return _this.raw['name'];
};

Eventbuffer.prototype.getAccount = function() {
  var _this = this;
  return _this.raw['tenant'];
};

Eventbuffer.prototype.getCreateTime = function() {
  var _this = this;
  return _this.raw['createTime'];
};

Eventbuffer.prototype.getCreatedBy = function() {
  var _this = this;
  return _this.raw['createdBy'];
};

Eventbuffer.prototype.getUpdateTime = function() {
  var _this = this;
  return _this.raw['updateTime'];
};

Eventbuffer.prototype.getUpdatedBy = function() {
  var _this = this;
  return _this.raw['updatedBy'];
};

Eventbuffer.prototype.getSchemaList = function() {
  var _this = this;
  return _this.raw['schemaList'] || [];
};

Eventbuffer.prototype.setSubscriptions = function(subscriptions) {
  var _this = this;
  var subscriptionList = _this.raw['subscriptionList'] || [];
  subscriptions.forEach(function(eachSubscription){
    if(eachSubscription instanceof Subscription) {
      subscriptionList.push(eachSubscription);
    }
  });
  _this.raw['subscriptionList'] = subscriptionList;
  return _this;
};

Eventbuffer.prototype.getSubscriptions = function() {
  var _this = this;
  return _this.raw['subscriptionList'];
};

Eventbuffer.prototype.setEntityIdentifier = function(identifier) {
  var _this = this;
  _this.raw['entityIdentifier'] = identifier;
  return _this;
};

Eventbuffer.prototype.getEntityIdentifier = function() {
  var _this = this;
  return _this.raw['entityIdentifier'];
};

Eventbuffer.prototype.setTimeIdentifier = function(identifier) {
  var _this = this;
  _this.raw['timeIdentifier'] = identifier;
  return _this;
};

Eventbuffer.prototype.getTimeIdentifier = function() {
  var _this = this;
  return _this.raw['timeIdentifier'];
};

Eventbuffer.prototype.setTimeFormat = function(identifier) {
  var _this = this;
  _this.raw['timeFormat'] = identifier;
  return _this;
};

Eventbuffer.prototype.getTimeFormat = function() {
  var _this = this;
  return _this.raw['timeFormat'];
};

Eventbuffer.prototype.setSignalsTagField= function(signalsTagField) {
  var _this = this;
  _this.raw['signalsTagField'] = signalsTagField;
  return _this;
};

Eventbuffer.prototype.getSignalsTagField = function() {
  var _this = this;
  return _this.raw['signalsTagField'];
};

Eventbuffer.prototype.setSignalsDelimiter = function(signalsDelimiter) {
  var _this = this;
  _this.raw['signalsDelimiter'] = signalsDelimiter;
  return _this;
};

Eventbuffer.prototype.getSignalsDelimiter = function() {
  var _this = this;
  return _this.raw['signalsDelimiter'];
};

Eventbuffer.prototype.setSignalsLocation = function(signalsLocation) {
  var _this = this;
  _this.raw['signalsLocation'] = signalsLocation;
  return _this;
};

Eventbuffer.prototype.getSignalsLocation = function() {
  var _this = this;
  return _this.raw['signalsLocation'];
};

Eventbuffer.prototype.setValueColumn = function(valueColumn) {
  var _this = this;
  _this.raw['valueColumn'] = valueColumn;
  return _this;
};

Eventbuffer.prototype.getValueColumn = function() {
  var _this = this;
  return _this.raw['valueColumn'];
};

Eventbuffer.prototype.toJSON = function() {
  var _this = this;
  var subscriptionList = _.map(_this.raw.subscriptionList, function(eachSubscription){
    return eachSubscription.toJSON();
  });

  var clone = function(eventbuffer, subscriptionList){
    eventbuffer = _.clone(eventbuffer);
    eventbuffer.subscriptionList = subscriptionList;
    return eventbuffer;
  }(_this.raw, subscriptionList);

  return clone;
};

module.exports = Eventbuffer;