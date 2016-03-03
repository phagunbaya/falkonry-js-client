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
 * Test to create Pipeline for following cases :
 *  1. Single thing dataset
 *  2. Multiple thing dataset
 *  3. Pipeline with single assessment
 *  4. Pipeline with multiple assessment
 */

describe.skip('Test Pipeline Creation', function(){
  var falkonry = null;
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry('https://dev.falkonry.io', token);
    return done();
  });

  it('Should create Pipeline for single thing', function(done){
    var pipeline = new Schemas.Pipeline();
    var signals  = {
      'current'   : 'Numeric',
      'vibration' : 'Numeric',
      'state'     : 'Categorical'
    };
    var assessment = new Schemas.Assessment();
    assessment.setName('Health')
        .setInputSignals(['current', 'vibration', 'state']);

    pipeline.setName('Motor Health 1')
        .setTimeIdentifier('time')
        .setTimeFormat('YYYY-MM-DD HH:MM:SS')
        .setInputSignals(signals)
        .setThingName('Motor')
        .setAssessment(assessment);

    return falkonry.createPipeline(pipeline, function(error, response){
      assert.equal(error, null, 'Error creating Pipeline');

      if(!error) {
        pipelines.push(response);
        assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
        assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
        assert.notEqual(response.getThingName(), null, 'Invalid Pipeline object after creation');
        assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
        assert.equal(response.getAssessments().length, 1, 'Invalid Pipeline object after creation');
      }
      return done();
    });
  });

  it('Should create Pipeline for multiple thing', function(done){
    var pipeline = new Schemas.Pipeline();
    var signals  = {
      'current'   : 'Numeric',
      'vibration' : 'Numeric',
      'state'     : 'Categorical'
    };
    var assessment = new Schemas.Assessment;
    assessment.setName('Health')
        .setInputSignals(['current', 'vibration', 'state']);

    pipeline.setName('Motor Health 2')
        .setInputSignals(signals)
        .setThingIdentifier('motors')
        .setAssessment(assessment);

    return falkonry.createPipeline(pipeline, function(error, response){
      assert.equal(error, null, 'Error creating Pipeline');

      if(!error) {
        pipelines.push(response);
        assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
        assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
        assert.equal(response.getThingName(), null, 'Invalid Pipeline object after creation');
        assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
        assert.equal(response.getAssessments().length, 1, 'Invalid Pipeline object after creation');
      }
      return done();
    });
  });

  it('Should create Pipeline with multiple assessment', function(done){
    var pipeline = new Schemas.Pipeline();
    var signals  = {
      'current'   : 'Numeric',
      'vibration' : 'Numeric',
      'state'     : 'Categorical'
    };
    var assessment1 = new Schemas.Assessment;
    assessment1.setName('Health 1')
        .setInputSignals(['current', 'vibration']);

    var assessment2 = new Schemas.Assessment;
    assessment2.setName('Health 2')
        .setInputSignals(['current', 'state']);

    pipeline.setName('Motor Health 3')
        .setInputSignals(signals)
        .setThingIdentifier('motors')
        .setAssessment(assessment1)
        .setAssessment(assessment2);

    return falkonry.createPipeline(pipeline, function(error, response){
      assert.equal(error, null, 'Error creating Pipeline');

      if(!error) {
        pipelines.push(response);
        assert.equal(typeof response, 'object', 'Invalid Pipeline object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Pipeline object after creation');
        assert.equal(response.getName(), pipeline.getName(), 'Invalid Pipeline object after creation');
        assert.equal(response.getThingIdentifier(), 'motors', 'Invalid Pipeline object after creation');
        assert.equal(response.getInputSignals().length, 3, 'Invalid Pipeline object after creation');
        assert.equal(response.getAssessments().length, 2, 'Invalid Pipeline object after creation');
      }
      return done();
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
      return done();
    });
  });
});