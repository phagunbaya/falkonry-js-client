/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

var _           = require('underscore');
var HttpService = require('./http');
var Models      = require('../helper/models');

function FalkonryService(host, token) {
  var _this   = this;
  _this.host  = host;
  _this.token = token;
  _this.http  = new HttpService(host, token);
}

FalkonryService.prototype.getPipelines = function(done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.get("/Pipeline", function(error, response, code){
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

FalkonryService.prototype.createPipeline = function(pipeline, done) {
  var _this = this;
  var Pipeline   = Models.Pipeline;
  var Signal     = Models.Signal;
  var Assessment = Models.Assessment;
  return _this.http.post("/Pipeline", pipeline.toJSON(), function(error, response, code){
    if(error)
        return done(error, null, code);
    else {
      var rawPipeline = JSON.parse(response);
      return done(null, new Pipeline(rawPipeline), code);
    }
  });
};

FalkonryService.prototype.deletePipeline = function(pipeline, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.delete("/Pipeline/"+pipeline, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      return done(null, null, code);
    }
  });
};

FalkonryService.prototype.addInputData = function(pipeline, data, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  return _this.http.fpost("/Pipeline/"+pipeline+"/input", data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

FalkonryService.prototype.addInputStream = function() {

};

FalkonryService.prototype.getOuptut = function() {

};

module.exports = FalkonryService;