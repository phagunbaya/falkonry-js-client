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
var token    = ''; //auth token

/*
 * Test to get Pipelines for an account
 */

describe.skip('Test fetch Pipelines', function(){
  var falkonry = null;
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry('https://dev.falkonry.io', token);
    return done();
  });

  it('Pipeline for single thing', function(done){
    var pipeline = new Schemas.Pipeline();
    var signals  = {
      'current'   : 'Numeric',
      'vibration' : 'Numeric',
      'state'     : 'Categorical'
    };
    var assessment = new Schemas.Assessment();
    assessment.setName('Health')
        .setInputSignals(['current', 'vibration', 'state']);

    pipeline.setName('Motor Health')
        .setTimeIdentifier('time')
        .setTimeFormat('YYYY-MM-DD HH:MM:SS')
        .setInputSignals(signals)
        .setThingName('Motor')
        .setAssessment(assessment);

    return falkonry.createPipeline(pipeline, function(error, response){
      assert.equal(error, null, 'Error creating Pipeline');

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
      return done();
    });
  });
});