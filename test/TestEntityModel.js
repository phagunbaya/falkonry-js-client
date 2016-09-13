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

  it('Should create Pipeline model for single entity with defaults', function(done){
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
        .setEventbuffer('eventbuffer-id')
        .setInputSignals(signals)
        .setAssessment(assessment);

    assert.equal(pipeline.getName(), 'Motor Health', 'Invalid name');
    assert.equal(pipeline.getEventbuffer(), 'eventbuffer-id', 'Invalid eventbuffer');
    assert.equal(pipeline.getInputSignals().length, 3, 'Invalid input signals');
    assert.equal(pipeline.getAssessments().length, 1, 'Invalid assessment signals');

    return done();
  });

  it('Should create Pipeline model for multiple entity', function(done){
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
        .setEventbuffer('eventbuffer-id')
        .setInputSignals(signals)
        .setAssessment(assessment);

    assert.equal(pipeline.getName(), 'Motor Health', 'Invalid name');
    assert.equal(pipeline.getEventbuffer(), 'eventbuffer-id', 'Invalid eventbuffer');
    assert.equal(pipeline.getInputSignals().length, 3, 'Invalid input signals');
    assert.equal(pipeline.getAssessments().length, 1, 'Invalid assessment signals');

    return done();
  });

  it('Should create Eventbuffer model', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-1');

    assert.equal(eventbuffer.getName(), 'Test-EB-1', 'Invalid name');
    return done();
  });

  it('Should create Publication model', function(done){
    var publication = new Schemas.Publication()
        .setType('MQTT')
        .setTopic('falkonry-test-pipeline')
        .setPath('mqtt://test.mosquito.com')
        .setUsername('test-user')
        .setPassword('test-password')
        .setContentType('application/json');

    assert.equal(publication.getType(), 'MQTT', 'Invalid type');
    assert.equal(publication.getTopic(), 'falkonry-test-pipeline', 'Invalid type');
    assert.equal(publication.getPath(), 'mqtt://test.mosquito.com', 'Invalid type');
    assert.equal(publication.getUsername(), 'test-user', 'Invalid type');
    assert.equal(publication.getPassword(), 'test-password', 'Invalid type');
    assert.equal(publication.getContentType(), 'application/json', 'Invalid type');
    return done();
  });

  it('Should create Subscription model', function(done){
    var subscription = new Schemas.Subscription()
        .setType('MQTT')
        .setPath('mqtt://test.mosquito.com')
        .setTopic('falkonry-eb-1-test')
        .setUsername('test-user')
        .setPassword('test');

    assert.equal(subscription.getType(), 'MQTT', 'Invalid type');
    assert.equal(subscription.getTopic(), 'falkonry-eb-1-test', 'Invalid type');
    assert.equal(subscription.getPath(), 'mqtt://test.mosquito.com', 'Invalid type');
    assert.equal(subscription.getUsername(), 'test-user', 'Invalid type');
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