/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Subscription
 *  Entity helper class to create Subscription object
 * @constructor
 *
 * @param {Subscription} subscription
 */

function Subscription(subscription) {
  var _this = this;
  _this.raw = subscription || {};
}

Subscription.prototype.getKey = function() {
  var _this = this;
  return _this.raw['key'];
};

Subscription.prototype.setType = function(type) {
  var _this = this;
  _this.raw['type'] = type;
  return _this;
};

Subscription.prototype.getType = function() {
  var _this = this;
  return _this.raw['type'];
};

Subscription.prototype.setTopic = function(topic) {
  var _this = this;
  _this.raw['topic'] = topic;
  return _this;
};

Subscription.prototype.getTopic = function() {
  var _this = this;
  return _this.raw['topic'];
};

Subscription.prototype.setPath = function(path) {
  var _this = this;
  _this.raw['path'] = path;
  return _this;
};

Subscription.prototype.getPath = function() {
  var _this = this;
  return _this.raw['path'];
};

Subscription.prototype.setUsername = function(username) {
  var _this = this;
  _this.raw['username'] = username;
  return _this;
};

Subscription.prototype.getUsername = function() {
  var _this = this;
  return _this.raw['username'];
};

Subscription.prototype.setPassword = function(password) {
  var _this = this;
  _this.raw['password'] = password;
  return _this;
};

Subscription.prototype.setTimeIdentifier = function(timeIdentifier) {
  var _this = this;
  _this.raw['timeIdentifier'] = timeIdentifier;
  return _this;
};

Subscription.prototype.getTimeIdentifier = function() {
  var _this = this;
  return _this.raw['timeIdentifier'];
};

Subscription.prototype.setTimeFormat = function(timeFormat) {
  var _this = this;
  _this.raw['timeFormat'] = timeFormat;
  return _this;
};

Subscription.prototype.getTimeFormat = function() {
  var _this = this;
  return _this.raw['timeFormat'];
};

Subscription.prototype.setStreaming = function(streaming) {
  var _this = this;
  _this.raw['streaming'] = streaming;
  return _this;
};

Subscription.prototype.getStreaming = function() {
  var _this = this;
  return _this.raw['streaming'];
};

Subscription.prototype.setSignalsTagField = function(signalsTagField) {
  var _this = this;
  _this.raw['signalsTagField'] = signalsTagField;
  return _this;
};

Subscription.prototype.getSignalsTagField = function() {
  var _this = this;
  return _this.raw['signalsTagField'];
};

Subscription.prototype.setSignalsDelimiter = function(signalsDelimiter) {
  var _this = this;
  _this.raw['signalsDelimiter'] = signalsDelimiter;
  return _this;
};

Subscription.prototype.getSignalsDelimiter = function() {
  var _this = this;
  return _this.raw['signalsDelimiter'];
};

Subscription.prototype.setSignalsLocation = function(signalsLocation) {
  var _this = this;
  _this.raw['signalsLocation'] = signalsLocation;
  return _this;
};

Subscription.prototype.getSignalsLocation = function() {
  var _this = this;
  return _this.raw['signalsLocation'];
};

Subscription.prototype.setValueColumn = function(valueColumn) {
  var _this = this;
  _this.raw['valueColumn'] = valueColumn;
  return _this;
};

Subscription.prototype.getValueColumn = function() {
  var _this = this;
  return _this.raw['valueColumn'];
};

Subscription.prototype.toJSON = function() {
  return this.raw;
};

module.exports = Subscription;