/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var async    = require('async');
var assert   = require('assert');
var Falkonry = require('../').Client;
var Schemas  = require('../').Schemas;
var host     = 'http://localhost:8080';
var token    = '';                      //auth token

/*
 * Test to create Pipeline for following cases :
 *  1. Single thing dataset
 *  2. Multiple thing dataset
 *  3. Pipeline with multiple assessment
 */

describe.skip('Test Pipeline Creation', function(){
  var falkonry = null;
  var eventbuffers = [];
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should create Pipeline for single thing', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer' + JSON.stringify(error));

      if(!error) {
        eventbuffers.push(response);
        var data = "time, current, vibration, state\n" + "2016-03-01 01:01:01, 12.4, 3.4, On";
        var eventbuffer_id = response.getId();
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
            var pipeline = new Schemas.Pipeline();
            var signals  = {
              'current'   : 'Numeric',
              'vibration' : 'Numeric',
              'state'     : 'Categorical'
            };
            var assessment = new Schemas.Assessment();
            assessment.setName('Health')
                .setInputSignals(['current', 'vibration', 'state']);    

            pipeline.setName('Pipeline-'+Math.random())
                .setEventbuffer(eventbuffer_id)
                .setInputSignals(signals)
                .setAssessment(assessment)
                .setInterval(null, "PT1S");

            return falkonry.createPipeline(pipeline, function(error, response){
              assert.equal(error, null, 'Error adding creating pipeline: '+JSON.stringify(error));

              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
                assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
                assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
                assert.equal(response.getEventbuffer(), pipeline.getEventbuffer(), 'Invalid Pipeline object after creation');
                assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
                assert.equal(response.getAssessments().length, 1, 'Invalid Pipeline object after creation');
              }
              return done();
            });
        }
        });
      }
      else {
        return done();
      }
    });
  });

  it('Should create Pipeline for single thing with eventType', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer' + JSON.stringify(error));

      if(!error) {
        eventbuffers.push(response);
        var data = "time, current, vibration, state\n" + "2016-03-01 01:01:01, 12.4, 3.4, On";
        var eventbuffer_id = response.getId();
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
            var pipeline = new Schemas.Pipeline();
            var signals  = {
              'current'   : ['Numeric', 'Samples'],
              'vibration' : ['Numeric', 'Occurrences'],
              'state'     : 'Categorical'
            };
            var assessment = new Schemas.Assessment();
            assessment.setName('Health')
                .setInputSignals(['current', 'vibration', 'state']);    

            pipeline.setName('Pipeline-'+Math.random())
                .setEventbuffer(eventbuffer_id)
                .setInputSignals(signals)
                .setAssessment(assessment)
                .setInterval(null, "PT1S");

            return falkonry.createPipeline(pipeline, function(error, response){
              assert.equal(error, null, 'Error adding creating pipeline: '+JSON.stringify(error));

              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
                assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
                assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
                assert.equal(response.getEventbuffer(), pipeline.getEventbuffer(), 'Invalid Pipeline object after creation');
                assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
                assert.equal(response.getAssessments().length, 1, 'Invalid Pipeline object after creation');
              }
              return done();
            });
        }
        });
      }
      else {
        return done();
      }
    });
  });

  it('Should create Pipeline for multiple thing', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");
    eventbuffer.setThingIdentifier("motor");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer' + JSON.stringify(error));

      if(!error) {
        eventbuffers.push(response);
        var data = "time, motor, current, vibration, state\n" + "2016-03-01 01:01:01, Motor1, 12.4, 3.4, On";
        var eventbuffer_id = response.getId();
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
            var pipeline = new Schemas.Pipeline();
            var signals  = {
              'current'   : ['Numeric', 'Samples'],
              'vibration' : ['Numeric', 'Occurrences'],
              'state'     : 'Categorical'
            };
            var assessment = new Schemas.Assessment();
            assessment.setName('Health')
                .setInputSignals(['current', 'vibration', 'state']);    

            pipeline.setName('Pipeline-'+Math.random())
                .setEventbuffer(eventbuffer_id)
                .setInputSignals(signals)
                .setAssessment(assessment)
                .setInterval(null, "PT1S");
            return falkonry.createPipeline(pipeline, function(error, response){
              assert.equal(error, null, 'Error adding creating pipeline: '+JSON.stringify(error));
              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
                assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
                assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
                assert.equal(response.getEventbuffer(), pipeline.getEventbuffer(), 'Invalid Pipeline object after creation');
                assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
                assert.equal(response.getAssessments().length, 1, 'Invalid Pipeline object after creation');
                assert.equal(response.getThingIdentifier(), eventbuffer.getThingIdentifier(), 'Invalid Pipeline object after creation');
              }
              return done();
            });
        }
        });
      }
      else {
        return done();
      }
    });
  });

  it('Should create Pipeline with multiple assessment', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");
    eventbuffer.setThingIdentifier("motor");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer' + JSON.stringify(error));

      if(!error) {
        eventbuffers.push(response);
        var data = "time, motor, current, vibration, state\n" + "2016-03-01 01:01:01, Motor1, 12.4, 3.4, On";
        var eventbuffer_id = response.getId();
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
            var pipeline = new Schemas.Pipeline();
            var signals  = {
              'current'   : ['Numeric', 'Samples'],
              'vibration' : ['Numeric', 'Occurrences'],
              'state'     : 'Categorical'
            };
            var assessment1 = new Schemas.Assessment();
            assessment1.setName('Health')
                .setInputSignals(['current', 'vibration', 'state']);    
            var assessment2 = new Schemas.Assessment();
            assessment2.setName('Health2')
                .setInputSignals(['vibration', 'state']); 

            pipeline.setName('Pipeline-'+Math.random())
            .setEventbuffer(eventbuffer_id)
            .setInputSignals(signals)
            .setAssessment(assessment1)
            .setAssessment(assessment2)
            .setInterval(null, "PT1S");

            return falkonry.createPipeline(pipeline, function(error, response){
              assert.equal(error, null, 'Error adding creating pipeline: '+JSON.stringify(error));
              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
                assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
                assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
                assert.equal(response.getEventbuffer(), pipeline.getEventbuffer(), 'Invalid Pipeline object after creation');
                assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
                assert.equal(response.getAssessments().length, 2, 'Invalid Pipeline object after creation');
                assert.equal(response.getThingIdentifier(), eventbuffer.getThingIdentifier(), 'Invalid Pipeline object after creation');
              }
              return done();
            });
        }
        });
      }
      else {
        return done();
      }
    });
  });

  after(function(done){
    return async.series(function(){
      var tasks = [];
      var fn = function(pipeline){
        return function(_cb) {
          return falkonry.deletePipeline(pipeline.getId(), function(error, response){
            if(error)
                console.log('TestCreatePipeline', 'Error deleting pipeline - '+pipeline.getId());
            return _cb(null, null);
          });
        }
      };
      pipelines.forEach(function(eachPipeline){
        tasks.push(fn(eachPipeline));
      });
      return tasks;
    }(), function(e, r){
      return async.series(function(){
        var tasks = [];
        var fn = function(eventbuffer){
          return function(_cb) {
            return falkonry.deleteEventbuffer(eventbuffer.getId(), function(error, response){
              if(error)
                console.log('TestCreatePipeline', 'Error deleting eventbuffer - '+eventbuffer.getId());
              return _cb(null, null);
            });
          }
        };
        eventbuffers.forEach(function(eachEventbuffer){
          tasks.push(fn(eachEventbuffer));
        });
        return tasks;
      }(), function(e, r){
        return done();
      });
    });
  }); 
});