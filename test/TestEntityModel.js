/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var assert   = require('assert');
var Schemas  = require('../').Schemas;

/*
 * Test to validate Pipeline entity model
 *
 */

describe('Test entity model validation', function(){

  before(function(done){
    return done();
  });

  it('Should create Pipeline model for single thing with defaults', function(done){
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
        .setInputSignals(signals)
        .setThingName('Motor')
        .setAssessment(assessment);

    assert.equal(pipeline.getName(), 'Motor Health', 'Invalid name');
    assert.equal(pipeline.getTimeIdentifier(), 'time', 'Invalid timeIdentifier');
    assert.equal(pipeline.getTimeFormat(), 'iso_8601', 'Invalid time format');
    assert.equal(pipeline.getThingName(), 'Motor', 'Invalid thing name');
    assert.equal(pipeline.getInputSignals().length, 3, 'Invalid input signals');
    assert.equal(pipeline.getAssessments().length, 1, 'Invalid assessment signals');

    return done();
  });

  it('Should create Pipeline model for single thing with custom overrides', function(done){
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

    assert.equal(pipeline.getName(), 'Motor Health', 'Invalid name');
    assert.equal(pipeline.getTimeIdentifier(), 'time', 'Invalid timeIdentifier');
    assert.equal(pipeline.getTimeFormat(), 'YYYY-MM-DD HH:MM:SS', 'Invalid time format');
    assert.equal(pipeline.getThingName(), 'Motor', 'Invalid thing name');
    assert.equal(pipeline.getInputSignals().length, 3, 'Invalid input signals');
    assert.equal(pipeline.getAssessments().length, 1, 'Invalid assessment signals');

    return done();
  });

  it('Should create Signal model', function(done){
    var signal = new Schemas.Signal();
    signal.setName('vibration');
    signal.setValueType('Numeric');

    assert.equal(signal.getName(), 'vibration', 'Invalid name');
    assert.equal(signal.getValueType().type, 'Numeric', 'Invalid valueType');

    return done();
  });

  it('Should create Assessment model', function(done){
    var assessment = new Schemas.Assessment();
    assessment.setName('Motor Health')
        .setInputSignals(['current', 'vibration', 'state']);

    assert.equal(assessment.getName(), 'Motor Health', 'Invalid name');
    assert.equal(assessment.getInputSignals().length, 3, 'Invalid input signals');

    return done();
  });

  after(function(done){
    return done();
  });
});