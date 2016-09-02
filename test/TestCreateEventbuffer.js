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
var token    = 'gryw3nodrijv449p67uw2hxtwezr19sm'; //auth token

/*
 * Test to create Eventbuffer for following cases :
 *  1. Simple eventbuffer
 *  2. Eventbuffer with json data
 *  3. Eventbuffer with csv data
 *  4. Eventbuffer with mqtt integration
 *  5. Eventbuffer with pipeline outflow integration
 */

describe.skip('Test Eventbuffer Creation', function(){
  var falkonry = null;
  var eventbuffers = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should create Eventbuffer with singleEntity', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");
    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');
      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions()[0]["raw"]["type"], "WEBHOOK", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
        assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer with multiple entities', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");
    eventbuffer.setThingIdentifier("entity");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');
      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getEntityIdentifier(), "entity", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions()[0]["raw"]["type"], "WEBHOOK", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
        assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer for narrow format data', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");
    eventbuffer.setSignalsTagField("tag");
    eventbuffer.setSignalsDelimiter("_");
    eventbuffer.setSignalsLocation("prefix");
    eventbuffer.setValueColumn("value");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSignalsTagField(), "tag", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSignalsDelimiter(), "_", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSignalsLocation(), "prefix", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getValueColumn(), "value", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions()[0]["raw"]["type"], "WEBHOOK", 'Invalid Eventbuffer object after creation');
        assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
        assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer with mqtt subscription', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('MQTT')
            .setPath('mqtt://test.mosquito.com')
            .setTopic('falkonry-eb-1-test')
            .setUsername('test-user')
            .setPassword('test');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'MQTT', 'Invalid Subscription object after creation');
            assert.equal(response.getTopic(), subscription.getTopic(), 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getUsername(), subscription.getUsername(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  it('Should create Eventbuffer with pipeline outflow subscription', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('PIPELINEOUTFLOW')
            .setPath('urn:falkonry:pipeline:qaerscdtxh7rc3');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'PIPELINEOUTFLOW', 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  it('Should create Eventbuffer with mqtt subscription for narrow format data', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");
    eventbuffer.setSignalsTagField("tag");
    eventbuffer.setSignalsDelimiter("_");
    eventbuffer.setSignalsLocation("prefix");
    eventbuffer.setValueColumn("value");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('MQTT')
            .setPath('mqtt://test.mosquito.com')
            .setTopic('falkonry-eb-1-test')
            .setUsername('test-user')
            .setPassword('test');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'MQTT', 'Invalid Subscription object after creation');
            assert.equal(response.getTopic(), subscription.getTopic(), 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getUsername(), subscription.getUsername(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), "time", 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), "YYYY-MM-DD HH:mm:ss", 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  after(function(done){
    return async.series(function(){
      var tasks = [];
      var fn = function(eventbuffer){
        return function(_cb) {
          return falkonry.deleteEventbuffer(eventbuffer.getId(), function(error, response){
            if(error)
              console.log('TestCreateEventbuffer', 'Error deleting eventbuffer - '+eventbuffer.getId());
            return _cb(null, null);
          });
        }
      };
      eventbuffers.forEach(function(eachEB){
        tasks.push(fn(eachEB));
      });
      return tasks;
    }(), function(e, r){
      return done();
    });
  });
});