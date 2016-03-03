/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var _           = require('underscore');
var HttpService = require('./http');
var Models      = require('../helper/models');

/**
 * FalkonryService
 *  Service class to link js client to Falkonry API server
 *
 * @param {String} host
 * @param {String} token
 * @constructor
 */
function FalkonryService(host, token) {
  var _this   = this;
  _this.host  = host;
  _this.token = token;
  _this.http  = new HttpService(host, token);
}

/**
 * To get list of Pipelines
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.getPipelines = function(done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.get('/Pipeline', function(error, response, code){
    if(error)
        return done(error, null, code);
    else {
      var pipelines = [];
      var rawPipelines = JSON.parse(response);
      rawPipelines.forEach(function(eachRaw){
        pipelines.push(new Pipeline(eachRaw));
      });
      return done(null, pipelines, code);
    }
  });

};

/**
 * To create Pipeline
 * @param {Pipeline} pipeline
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.createPipeline = function(pipeline, done) {
  var _this = this;
  var Pipeline   = Models.Pipeline;
  var Signal     = Models.Signal;
  var Assessment = Models.Assessment;
  return _this.http.post('/Pipeline', pipeline.toJSON(), function(error, response, code){
    if(error)
        return done(error, null, code);
    else {
      var rawPipeline = JSON.parse(response);
      return done(null, new Pipeline(rawPipeline), code);
    }
  });
};

/**
 * To delete a Pipeline
 * @param {String} pipeline
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.deletePipeline = function(pipeline, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.delete('/Pipeline/'+pipeline, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      return done(null, null, code);
    }
  });
};

/**
 * To add data to a Pipeline
 * @param {String} pipeline
 * @param {Array} data
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.addInputData = function(pipeline, data, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.fpost('/Pipeline/'+pipeline+'/input', data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To add data stream to a Pipeline
 * @param {String} pipeline
 * @param {Stream} data
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.addInputStream = function(pipeline, data, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.upstream('/Pipeline/'+pipeline+'/input', data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To get output of a Pipeline
 * @param {String} pipeline
 * @param {Int} start
 * @param {Int} end
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.getOuptut = function(pipeline, start, end, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  var url = '/Pipeline/'+pipeline+'/output?';
  if(typeof end === 'number') {
    url += 'lastTime=' + end;
    if(typeof start === 'number')
        url += '&startTime='+start;
  }
  else {
    if(typeof start === 'number')
      url += 'startTime='+start;
  }

  var stream = _this.http.downstream(url);
  return done(null, stream);
};

module.exports = FalkonryService;