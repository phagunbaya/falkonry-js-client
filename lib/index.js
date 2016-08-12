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
  if(! this instanceof Falkonry)
      throw 'Falkonry not instantiated as "new"';
  if(host && typeof host != "string")
      throw 'Not a valid host provided. Use "new Falkonry(host, token)"';
  if(host && typeof host === "string"){
    if(host.indexOf("http") === -1)
      throw 'Not a valid host provided. Use valid host name.';
  }
  if(token && typeof token !== "string")
    throw 'Not a valid token provided. Must be a string provided by Falkonry.';
  var _this = this;
  _this.service = new FService(host, token);
}

/**
 *
 * createEventbuffer
 *  To create Eventbuffer in an account
 * @param {Eventbuffer} eventbuffer
 * @param {Function} done
 * @return {*}
 *
 */
Falkonry.prototype.createEventbuffer = function(eventbuffer, done) {
  var _this    = this;
  var Eventbuffer = Models.Eventbuffer;
  if(!eventbuffer instanceof Eventbuffer) {
    if(typeof done === 'function')
      return done(Utils.wrapError(400, 'Invalid Eventbuffer object'), null);
  }
  else {
    return _this.service.createEventbuffer(eventbuffer, function(error, response, code){
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
 * getEventbuffers
 *  To get all Eventbuffers in an account
 *
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.getEventbuffers = function (done) {
  var _this = this;
  return _this.service.getEventbuffers(function(error, response, code){
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
 * deleteEventbuffer
 *  To delete Eventbuffer from an account
 *
 * @param {String} eventbuffer
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.deleteEventbuffer = function (eventbuffer, done) {
  var _this = this;
  return _this.service.deleteEventbuffer(eventbuffer, function(error, response, code){
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
 * createPipeline
 *  To create Pipeline in an account
 *
 * @param {Pipeline} pipeline
 * @param {Function} done
 * @return {*}
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
 * @return {*}
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
 *  To add data to the Eventbuffer
 *
 * @param {String} eventbuffer
 * @param {String} dataType
 * @param {String} data
 * @param {Object} options
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.addInput = function (eventbuffer, dataType, data, options, done) {
  var _this = this;
  return _this.service.addInputData(eventbuffer, dataType, data, options, function(error, response, code){
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
 * addVerification
 *  To add verification to the pipeline
 *
 * @param {String} pipeline
 * @param {String} dataType
 * @param {String} data
 * @param {Object} options
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.addVerification = function (pipeline, dataType ,data, options, done){
  var _this = this;
  return _this.service.addVerificationData(pipeline, dataType ,data, options, function(error,response, code){
    if(error) {
      if(typeof done === 'function'){
        return done(Utils.wrapError(code, error), null);
      }
    }
    else{
      if(typeof done === 'function'){
        return done(null,response);
      }
    }
  });
};

/**
 *
 * addInputFromStream
 *  To add data stream to the Eventbuffer
 *
 * @param {String} eventbuffer
 * @param {String} dataType
 * @param {Stream} data
 * @param {Object} options
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.addInputFromStream = function (eventbuffer, dataType, data, options, done) {
  var _this = this;
  return _this.service.addInputStream(eventbuffer, dataType, data, options, function(error, response, code){
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

/*
 *
 * addVerificationFromStream
 *  To add verification stream to the Pipeline
 *
 * @param {String} pipeline
 * @param {String} dataType
 * @param {Stream} data
 * @param {Object} options
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.addVerificationFromStream = function(pipeline, dataType, data, options, done){
  var _this = this;
  return _this.service.addVerificationStream(pipeline,dataType,data, options, function(error,response,code){
    if(error){
      if(typeof done === 'function'){
        return done(Utils.wrapError(code, error), null);
      }
    }
    else{
      if(typeof done === 'function'){
        return done(null,response);
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
 * @return {*}
 *
 */

Falkonry.prototype.getOutput = function (pipeline, start, end, done) {
  var _this = this;
  return _this.service.getOutput(pipeline, start, end, function(error, response, code){
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
 * getOutputStream
 *  To get output of a Pipeline
 *
 * @param {String} pipeline
 * @param {Object} start
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.streamOutput = function (pipeline, start, done) {
  var _this = this;
    return _this.service.streamOutput(pipeline, start, function(error, response, code){
      if(error) {
        if(typeof done === 'function') {
          return done(Utils.wrapError(code, error), null);
        }
      }
      else {
        if(typeof done === 'function') {
          return done(null, response, code);
        }
      }
    });
};

/**
 *
 * endOutputStream
 *  To get output of a Pipeline
 *
 * @param {String} pipeline
 * @param {Event} updateNotifier
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.endOutputStream = function (pipeline, updateNotifier, done) {
  var _this = this;
  return _this.service.endOutputStream(pipeline, updateNotifier, function(error, response, code){
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
 * deletPipeline
 *  To delete Pipeline from an account
 *
 * @param {String} pipeline
 * @param {Function} done
 * @return {*}
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

/**
 *
 * createSubscription
 *  To create Subscription in an account
 *
 * @param {Eventbuffer} eventbuffer
 * @param {Subscription} subscription
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.createSubscription = function (eventbuffer, subscription, done) {
  var _this    = this;
  var Subscription = Models.Subscription;
  if(!subscription instanceof Subscription) {
    if(typeof done === 'function')
      return done(Utils.wrapError(400, 'Invalid Subscription object'), null);
  }
  else {
    return _this.service.createSubscription(eventbuffer, subscription, function(error, response, code){
      if(error) {
        if(typeof done === 'function') {
          return done(Utils.wrapError(code, error), null);
        }if (pipelineDetails.outflowStatus.equals("CLOSED")) {
    return done("Pipeline is closed", null, 0);
  }
  else {
    return _this.http.get(url, function (error, response, code) {
      if(error) {
        return done(error, null, code);
      }
      else {
        response = JSON.parse(response);
        return done(null, response, function () {
        });
      }
    });
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
 * updateSubscription
 *  To update Subscription in an account
 *
 * @param {Eventbuffer} eventbuffer
 * @param {Subscription} subscription
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.updateSubscription = function (eventbuffer, subscription, done) {
  var _this    = this;
  var Subscription = Models.Subscription;
  if(!subscription instanceof Subscription) {
    if(typeof done === 'function')
      return done(Utils.wrapError(400, 'Invalid Subscription object'), null);
  }
  else {
    return _this.service.updateSubscription(eventbuffer, subscription, function(error, response, code){
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
 * deleteSubscription
 *  To delete Subscription in an account
 *
 * @param {Eventbuffer} eventbuffer
 * @param {Subscription} subscription
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.deleteSubscription = function (eventbuffer, subscription, done) {
  var _this    = this;
  return _this.service.deleteSubscription(eventbuffer, subscription, function(error, response, code){
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
 * createPublication
 *  To create Publication in an account
 *
 * @param {String} pipeline
 * @param {Publication} publication
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.createPublication = function (pipeline, publication, done) {
  var _this    = this;
  var Publication = Models.Publication;
  if(!publication instanceof Publication) {
    if(typeof done === 'function')
      return done(Utils.wrapError(400, 'Invalid Publication object'), null);
  }
  else {
    return _this.service.createPublication(pipeline, publication, function(error, response, code){
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
 * updatePublication
 *  To update Publication in an account
 *
 * @param {String} pipeline
 * @param {Publication} publication
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.updatePublication = function (pipeline, publication, done) {
  var _this    = this;
  var Publication = Models.Publication;
  if(!publication instanceof Publication) {
    if(typeof done === 'function')
      return done(Utils.wrapError(400, 'Invalid Publication object'), null);
  }
  else {
    return _this.service.updatePublication(pipeline, publication, function(error, response, code){
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
 * deletePublication
 *  To delete Publication in an account
 *
 * @param {Publication} publication
 * @param {Function} done
 * @return {*}
 *
 */

Falkonry.prototype.deletePublication = function (eventbuffer, publication, done) {
  var _this    = this;
  return _this.service.deletePublication(eventbuffer, publication, function(error, response, code){
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