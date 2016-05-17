/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Publication
 *  Entity helper class to create Publication object
 * @constructor
 *
 * @param {Publication} publication
 */

function Publication(publication) {
  var _this = this;
  _this.raw = publication || {};
}

Publication.prototype.getKey = function() {
  var _this = this;
  return _this.raw['key'];
};

Publication.prototype.setType = function(type) {
  var _this = this;
  _this.raw['type'] = type;
  return _this;
};

Publication.prototype.getType = function() {
  var _this = this;
  return _this.raw['type'];
};

Publication.prototype.setTopic = function(topic) {
  var _this = this;
  _this.raw['topic'] = topic;
  return _this;
};

Publication.prototype.getTopic = function() {
  var _this = this;
  return _this.raw['topic'];
};

Publication.prototype.setPath = function(path) {
  var _this = this;
  _this.raw['path'] = path;
  return _this;
};

Publication.prototype.getPath = function() {
  var _this = this;
  return _this.raw['path'];
};

Publication.prototype.setUsername = function(username) {
  var _this = this;
  _this.raw['username'] = username;
  return _this;
};

Publication.prototype.getUsername = function() {
  var _this = this;
  return _this.raw['username'];
};

Publication.prototype.setPassword = function(password) {
  var _this = this;
  _this.raw['password'] = password;
  return _this;
};

Publication.prototype.getPassword = function() {
  var _this = this;
  return _this.raw['password'];
};

Publication.prototype.setContentType = function(contentType) {
  var _this = this;
  _this.raw['contentType'] = contentType;
  return _this;
};

Publication.prototype.getContentType = function() {
  var _this = this;
  return _this.raw['contentType'];
};

Publication.prototype.setStreaming = function(streaming) {
  var _this = this;
  _this.raw['streaming'] = streaming;
  return _this;
};

Publication.prototype.getStreaming = function() {
  var _this = this;
  return _this.raw['streaming'];
};

Publication.prototype.setHeaders = function(headers) {
  var _this = this;
  if(typeof headers === "object")
    _this.raw['headers'] = headers;
  return _this;
};

Publication.prototype.getHeaders = function() {
  var _this = this;
  return _this.raw['headers'];
};

Publication.prototype.toJSON = function() {
  return this.raw;
};

module.exports = Publication;