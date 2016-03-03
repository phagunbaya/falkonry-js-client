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
var token    = 'dv762fciuqmj6p'; //auth token

/*
 * Test to add data stream to a Pipeline
 */

describe('Test add input data stream to Pipeline', function(){
  var falkonry = null;
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry('http://localhost:8080', token);
    return done();
  });

  it('Should add json data stream for single thing', function(done){
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
      assert.equal(error, null, 'Error creating Pipeline: '+error);

      if(!error) {
        pipelines.push(response);
        var data = [
          {'time' :'2016-03-01 01:01:01', 'current' : 12.4, 'vibration' : 3.4, 'state' : 'On'},
          {'time' :'2016-03-01 01:01:02', 'current' : 11.3, 'vibration' : 2.2, 'state' : 'On'},
          {'time' :'2016-03-01 01:01:03', 'current' : 10.5, 'vibration' : 3.8, 'state' : 'On'}
        ];
        return falkonry.addInput(response.getId(), data, function(error, response){
          assert.equal(error, null, 'Error adding input data to Pipeline: '+error);

          if(!error) {
            assert.equal(typeof response.__$id, 'string', 'Cannot add input data to Pipeline');
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
              console.log('TestAddData', 'Error deleting pipeline - '+pipeline.getId());
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