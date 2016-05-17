/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var _ = require('underscore');
var request = require('request');
var Utils   = require('../helper').Utils;

/**
 * HttpService
 *  Service to make API requests to Falkonry Service
 * @param {String} host
 * @param {String} token
 * @constructor
 */

function HttpService(host, token) {
  var _this   = this;
  _this.token = (new Buffer(token || '').toString('base64'));
  _this.host  = host || 'https://service.falkonry.io';
}

/**
 * To make a GET request to Falkonry API server
 * @param {String} path
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.get = function(path, done) {
  var _this = this;
  var url = _this.host + path;
  return request({
    url: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+_this.token
    }
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a POST request to Falkonry API server
 * @param {String} path
 * @param {Object} pipeline
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.post = function(path, pipeline, done) {
  var _this = this;
  var url = _this.host + path;
  return request({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+_this.token
    },
    body: JSON.stringify(pipeline)
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a simple form-data POST request to Falkonry API server
 * @param {String} path
 * @param {Object} data
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.sfpost = function(path, data, done) {
  var _this = this;
  var url = _this.host + path;

  return request({
    url    : url,
    method : 'POST',
    form   : {'name' : 'hello'},
    headers: {
      'Authorization': 'Token '+_this.token
    }
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a multipart/form-data POST request to Falkonry API server
 * @param {String} path
 * @param {Object} data
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.fpost = function(path, data, done) {
  var _this = this;
  var url = _this.host + path;

  return request({
    url: url,
    method: 'POST',
    formData: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token '+_this.token
    },
    body: ''
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a DELETE request to Falkonry API server
 * @param {String} path
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.delete = function(path, done) {
  var _this = this;
  var url = _this.host + path;
  return request({
    url: url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token '+_this.token
    },
    body: ''
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a form-data POST request to Falkonry API server using stream
 * @param {String} path
 * @param {Stream} data
 * @param {Function} done
 * @returns {*}
 */
HttpService.prototype.upstream = function(path, dataType, stream, done) {
  var _this = this;
  var url = _this.host + path;
  var formData = {
    data: {
      value: stream,
      options: {
        filename: ('input-'+Utils.randomString(6) + (dataType === "csv" ? ".csv" : ".json"))
      }
    }
  };
  return request({
    url: url,
    method: 'POST',
    formData: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token '+_this.token
    },
    body: ''
  }, function(error, response, body){
    if(error) {
      return done(error, null, 0);
    } else {
      if(response.statusCode === 401) {
        return done('Unauthorized : Invalid token', null, response.statusCode);
      }
      else if(response.statusCode >= 400) {
        body = JSON.parse(body);
        return done(body.message, null, response.statusCode);
      }
      else
        return done(null, body, response.statusCode);
    }
  });
};

/**
 * To make a GET request to Falkonry API server and return stream
 * @param {String} path
 * @returns {*}
 */
HttpService.prototype.downstream = function(path) {
  var _this = this;
  var url = _this.host + path;
  return request({
    url: url,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-json-stream',
      'Authorization': 'Token '+_this.token
    },
    body: ''
  });
};

module.exports = HttpService;