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
var token    = '';                     //auth token

/*
 * Test to get Pipelines for an account
 */

describe('Test fetch Pipelines', function(){
  var falkonry = null;
  var eventbuffers = [];
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Get all Pipelines', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer' + error);

      if(!error) {
        eventbuffers.push(response);
        var data = '{"time" :"2016-03-01 01:01:01", "current" : 12.4, "vibration" : 3.4, "state" : "On"}';
        return falkonry.addInput(response.getId(), 'json', data, null, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

          if(!error) {
            assert.equal(typeof response.__$id, 'string', 'Cannot add input data to Pipeline');
          }
          return done();
        });


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
            .setEventbuffer(response.getId())
            .setInputSignals(signals)
            .setAssessment(assessment)
            .setInterval(null,"PT1S");

        return falkonry.createPipeline(pipeline, function(error, response){
          assert.equal(error, null, 'Error adding input data to Pipeline: '+error);

          if(!error) {
            pipelines.push(response);
            return falkonry.getPipelines(function(error, response){
              assert.equal(error, null, 'Error fetching Pipelines');

              if(!error) {
                assert.equal(response.length > 0, true, 'Cannot fetch Pipelines');
              }
              return done();
            });
          }
          return done();
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
              console.log('TestGetPipelines', 'Error deleting pipeline - '+pipeline.getId());
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
                console.log('TestGetPipelines', 'Error deleting eventbuffer - '+eventbuffer.getId());
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