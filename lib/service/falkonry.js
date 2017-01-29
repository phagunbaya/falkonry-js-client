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
var Utils       = require('../helper').Utils;
var Events      = require('events');

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
 * To create Eventbuffer
 * @param {Eventbuffer} eventbuffer
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.createEventbuffer = function(eventbuffer, done) {
  var _this = this;
  var Eventbuffer = Models.Eventbuffer;
  return _this.http.post('/Eventbuffer', eventbuffer, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var rawEventbuffer = JSON.parse(response);
      return done(null, new Eventbuffer(rawEventbuffer), code);
    }
  });
};

/**
 * To get list of Eventbuffers
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.getEventbuffers = function(done) {
  var _this = this;
  var Eventbuffer = Models.Eventbuffer;
  return _this.http.get('/Eventbuffer', function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var eventbuffers = [];
      var rawEventbuffers = JSON.parse(response);
      rawEventbuffers.forEach(function(eachRaw){
        eventbuffers.push(new Eventbuffer(eachRaw));
      });
      return done(null, eventbuffers, code);
    }
  });
};

/**
 * To delete a Eventbuffer
 * @param {String} eventbuffer
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.deleteEventbuffer = function(eventbuffer, done) {
  var _this = this;
  return _this.http.delete('/Eventbuffer/'+eventbuffer, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      return done(null, null, code);
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
 * To add data to a Eventbuffer
 * @param {String} eventbuffer
 * @param {String} dataType
 * @param {String} data
 * @param {Object} options
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.addInputData = function(eventbuffer, dataType, data, options, done) {
  var _this = this;
  var Eventbuffer = Models.Eventbuffer;
  var formData = {
    data: {
      value:  (typeof data === 'object' ? new Buffer(JSON.stringify(data)) : new Buffer(data)),
      options: {
        filename: ('input-'+Utils.randomString(6)+(dataType === 'json' ? '.json' : '.csv'))
      }
    }
  };
  var path = '/Eventbuffer/' + eventbuffer;
  if(options && options.subscription){
    path += '?subscriptionKey=' + options.subscription;
  }
  return _this.http.fpost(path, formData, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To add facts data to a Pipeline
 * @param {String} pipeline
 * @param {String} dataType
 * @param {String} data
 * @param {Object} options
 * @param {Function} done
 * @returns {*}
 */


FalkonryService.prototype.addFactsData = function(pipeline, dataType, data, options, done){
  var _this = this;
  var Pipeline = Models.Pipeline;
  var path = '/pipeline/' + pipeline + '/facts';
  return _this.http.postData(path, data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To add data stream to a Eventbuffer
 * @param {String} eventbuffer
 * @param {String} dataType
 * @param {Stream} data
 * @param {Object} options
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.addInputStream = function(eventbuffer, dataType, data, options, done) {
  var _this = this;
  var Eventbuffer = Models.Eventbuffer;
  var path = '/Eventbuffer/' + eventbuffer;
  if(options && options.subscription){
    path += '?subscriptionKey=' + options.subscription;
  }
  return _this.http.upstream(path, dataType, data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To add facts stream to a Pipeline
 * @param {String} pipeline
 * @param {String} dataType
 * @param {Stream} data
 * @param {Object} options
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.addFactsStream = function(pipeline, dataType, data, options, done){
  var _this = this;
  var Pipeline = Models.Pipeline;
  var path = '/pipeline/' + pipeline + '/facts';
  return _this.http.upstream(path, dataType, data, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      response = JSON.parse(response);
      return done(null, response, code);
    }
  });
};

/**
 * To get a continuous stream of output data
 * @param {String} pipeline
 * @param {Function} done
 * @return {*}
 */

FalkonryService.prototype.getOutput = function (pipeline, done) {
  var _this = this;
  var Pipeline = Models.Pipeline;
  var url = '/pipeline/' + pipeline +'/stream';

  var outflowUpdate = new Events.EventEmitter;
  outflowUpdate.close = function() {
    return req.abort();
  };

  return _this.http.downstream(url, function(error, req){
    if(error)
      return done(error, req);
    else {
      req.on('push', function(stream) {
        stream.on('error', function(error) {
          return outflowUpdate.emit('error', error);
        });
        stream.on('data', function(d){
          var assessment = new Buffer(d).toString();
          try {
            var assessmentObj = JSON.parse(assessment);
            return outflowUpdate.emit('data', assessmentObj);
          } catch (e) {
            //console.log(e);
          }
        });
      });

      return done(null, outflowUpdate);
    }
  });

};

/**
 * To create Subscription
 * @param {String} eventbuffer
 * @param {Subscription} subscription
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.createSubscription = function(eventbuffer, subscription, done) {
  var _this = this;
  var Subscription   = Models.Subscription;

  return _this.http.post('/Eventbuffer/' + eventbuffer + '/subscription', subscription.toJSON(), function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var rawSubscription = JSON.parse(response);
      return done(null, new Subscription(rawSubscription), code);
    }
  });
};

/**
 * To update Subscription
 * @param {String} eventbuffer
 * @param {Subscription} subscription
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.updateSubscription = function(eventbuffer, subscription, done) {
  var _this = this;
  var Subscription   = Models.Subscription;

  return _this.http.put('/Eventbuffer/' + eventbuffer + '/subscription/' + subscription.getKey(), subscription.toJSON(), function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var rawSubscription = JSON.parse(response);
      return done(null, new Subscription(rawSubscription), code);
    }
  });
};

/**
 * To delete Subscription
 * @param {String} eventbuffer
 * @param {String} subscription
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.deleteSubscription = function(eventbuffer, subscription, done) {
  var _this = this;
  return _this.http.delete('/Eventbuffer/' + eventbuffer + '/subscription/' + subscription, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      return done(null, null, code);
    }
  });
};

/**
 * To create Publication
 * @param {String} pipeline
 * @param {Publication} publication
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.createPublication = function(pipeline, publication, done) {
  var _this = this;
  var Publication   = Models.Publication;

  return _this.http.post('/pipeline/' + pipeline + '/publication', publication.toJSON(), function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var rawPublication = JSON.parse(response);
      return done(null, new Publication(rawPublication), code);
    }
  });
};

/**
 * To update Publication
 * @param {String} pipeline
 * @param {Publication} publication
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.updatePublication = function(pipeline, publication, done) {
  var _this = this;
  var Publication   = Models.Publication;

  return _this.http.put('/pipeline/' + pipeline + '/publication/' + publication.getKey(), publication.toJSON(), function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      var rawPublication = JSON.parse(response);
      return done(null, new Publication(rawPublication), code);
    }
  });
};

/**
 * To delete Publication
 * @param {String} pipeline
 * @param {String} publication
 * @param {Function} done
 * @returns {*}
 */
FalkonryService.prototype.deletePublication = function(pipeline, publication, done) {
  var _this = this;
  return _this.http.delete('/pipeline/' + pipeline + '/publication/' + publication, function(error, response, code){
    if(error)
      return done(error, null, code);
    else {
      return done(null, null, code);
    }
  });
};

module.exports = FalkonryService;