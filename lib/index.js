/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var Utils    = require('./helper').Utils;
var Models   = require('./helper').Models;
var FService = require('./service/falkonry');

/**
 * Falkonry
 *  Class to handle Falkonry's Public APIs
 *
 * @constructor
 *
 * @param {String} token
 * @return {Falkonry}
 *
 */
function Falkonry(host, token) {
  var _this = this;
  _this.service = new FService(host, token);
}

/**
 *
 * createPipeline
 *  To create Pipeline in an account
 *
 * @param {Pipeline} pipeline
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.createPipeline = function (pipeline, done) {
  var _this    = this;
  var Pipeline = Models.Pipeline;
  if(!pipeline instanceof Pipeline) {
    if(typeof done === 'function')
        return done(Utils.wrapError(400, 'Invalid Pipeline object'), null);
  }
  else {
    return _this.service.createPipeline(pipeline, function(error, response, code){
      if(error) {
        if(typeof done === 'function') {
          return done(Utils.wrapError(code, error), null);
        }
      }
      else {
        if(typeof done === 'function') {
          return done(null, response);
        }
      }
    });
  }
};

/**
 *
 * getPipelines
 *  To get all Pipelines in an account
 *
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.getPipelines = function (done) {
  var _this = this;
  return _this.service.getPipelines(function(error, response, code){
    if(error) {
      if(typeof done === 'function') {
        return done(Utils.wrapError(code, error), null);
      }
    }
    else {
      if(typeof done === 'function') {
        return done(null, response);
      }
    }
  });
};

/**
 *
 * addInput
 *  To add data to the Pipeline
 *
 * @param {String} pipeline
 * @param {Array} data
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.addInput = function (pipeline, data, done) {
  var _this = this;
  return _this.service.addInputData(pipeline, data, function(error, response, code){
    if(error) {
      if(typeof done === 'function') {
        return done(Utils.wrapError(code, error), null);
      }
    }
    else {
      if(typeof done === 'function') {
        return done(null, response);
      }
    }
  });
};

/**
 *
 * addInputFromStream
 *  To add data stream to the Pipeline
 *
 * @param {String} pipeline
 * @param {Stream} data
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.addInputFromStream = function (pipeline, data, done) {
  var _this = this;
  return _this.service.addInputStream(pipeline, data, function(error, response, code){
    if(error) {
      if(typeof done === 'function') {
        return done(Utils.wrapError(code, error), null);
      }
    }
    else {
      if(typeof done === 'function') {
        return done(null, response);
      }
    }
  });
};

/**
 *
 * getOutput
 *  To get output of a Pipeline
 *
 * @param {String} pipeline
 * @param {Int} start
 * @param {Int} end
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.getOutput = function (pipeline, start, end, done) {

};

/**
 *
 * deletPipeline
 *  To delete Pipeline from an account
 *
 * @param {String} pipeline
 * @param {Function} done
 * @return {Promise}
 *
 */

Falkonry.prototype.deletePipeline = function (pipeline, done) {
  var _this = this;
  return _this.service.deletePipeline(pipeline, function(error, response, code){
    if(error) {
      if(typeof done === 'function') {
        return done(Utils.wrapError(code, error), null);
      }
    }
    else {
      if(typeof done === 'function') {
        return done(null, response);
      }
    }
  });
};

module.exports = {
  'Client'  : Falkonry,
  'Schemas' : Models
};