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
var host     = 'localhost:8080';
var token    = 'b7f4sc9dcaklj6vhcy50otx41p044s6l'; //auth token

/*
 * Test to create Eventbuffer for following cases :
 *  1. Simple eventbuffer
 *  2. Eventbuffer with json data
 *  3. Eventbuffer with csv data
 *  4. Eventbuffer with mqtt integration
 *  5. Eventbuffer with pipeline outflow integration
 */

describe('Test Eventbuffer Creation', function(){
  var falkonry = null;
  var eventbuffers = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should create Eventbuffer', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'iso_8601'
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 0, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer with json data', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'json',
      'data'           : {'time' :'2016-03-01 01:01:01', 'current' : 12.4, 'vibration' : 3.4, 'state' : 'On'}
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 0, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer with csv data', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'csv',
      'data'           : 'time, current, vibration, state\n'+
          '2016-03-01 01:01:01, 12.4, 3.4, On'
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        assert.equal(typeof response, 'object', 'Invalid Eventbuffer object after creation');
        assert.equal(typeof response.getId(), 'string', 'Invalid Eventbuffer object after creation');
        assert.equal(response.getName(), eventbuffer.getName(), 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSchemaList().length, 0, 'Invalid Eventbuffer object after creation');
        assert.equal(response.getSubscriptions().length, 1, 'Invalid Eventbuffer object after creation');
      }
      return done();
    });
  });

  it('Should create Eventbuffer with mqtt subscription', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'json',
      'data'           : {'time' :'2016-03-01 01:01:01', 'current' : 12.4, 'vibration' : 3.4, 'state' : 'On'}
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('MQTT')
            .setPath('mqtt://test.mosquito.com')
            .setTopic('falkonry-eb-1-test')
            .setUsername('test-user')
            .setPassword('test')
            .setTimeFormat('YYYY-MM-DD HH:mm:ss')
            .setTimeIdentifier('time');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'MQTT', 'Invalid Subscription object after creation');
            assert.equal(response.getTopic(), subscription.getTopic(), 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getUsername(), subscription.getUsername(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), subscription.getTimeIdentifier(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), subscription.getTimeFormat(), 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  it('Should create Eventbuffer with splunk subscription', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'json',
      'data'           : {'time' :'2016-03-01 01:01:01', 'current' : 12.4, 'vibration' : 3.4, 'state' : 'On'}
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('SPLUNK')
            .setPath('source="motor_health"')
            .setTimeFormat('YYYY-MM-DD HH:mm:ss')
            .setTimeIdentifier('time');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'SPLUNK', 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), subscription.getTimeIdentifier(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), subscription.getTimeFormat(), 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  it('Should create Eventbuffer with pipeline outflow subscription', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'json',
      'data'           : {'time' :'2016-03-01 01:01:01', 'current' : 12.4, 'vibration' : 3.4, 'state' : 'On'}
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
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
            assert.equal(response.getTimeIdentifier(), 'time', 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), 'millis', 'Invalid Subscription object after creation');
          }
          return done();
        });
      }
    });
  });

  it('Should create Eventbuffer with mqtt subscription for historian data', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    var options = {
      'timeIdentifier' : 'time',
      'timeFormat'     : 'YYYY-MM-DD HH:mm:ss',
      'dataType'       : 'json',
      'data'           : {'time': '2016-03-01 01:01:01', 'tag': 'current_motor1', 'value': 12.4}
    };

    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        eventbuffer = response;
        var subscription = new Schemas.Subscription()
            .setType('MQTT')
            .setPath('mqtt://test.mosquito.com')
            .setTopic('falkonry-eb-1-test')
            .setUsername('test-user')
            .setPassword('test')
            .setTimeFormat('YYYY-MM-DD HH:mm:ss')
            .setTimeIdentifier('time')
            .setHistorian(true)
            .setValueColumn('value')
            .setSignalsDelimiter('_')
            .setSignalsTagField('tag')
            .setSignalsLocation('prefix');

        return falkonry.createSubscription(eventbuffer.getId(), subscription, function(error, response){
          assert.equal(error, null, 'Error creating Subscription');
          if(!error) {
            assert.equal(typeof response, 'object', 'Invalid Subscription object after creation');
            assert.equal(typeof response.getKey(), 'string', 'Invalid Subscription object after creation');
            assert.equal(response.getType(), 'MQTT', 'Invalid Subscription object after creation');
            assert.equal(response.getTopic(), subscription.getTopic(), 'Invalid Subscription object after creation');
            assert.equal(response.getPath(), subscription.getPath(), 'Invalid Subscription object after creation');
            assert.equal(response.getUsername(), subscription.getUsername(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeIdentifier(), subscription.getTimeIdentifier(), 'Invalid Subscription object after creation');
            assert.equal(response.getTimeFormat(), subscription.getTimeFormat(), 'Invalid Subscription object after creation');
            assert.equal(response.getSignalsDelimiter(), subscription.getSignalsDelimiter(), 'Invalid Subscription object after creation');
            assert.equal(response.getSignalsLocation(), subscription.getSignalsLocation(), 'Invalid Subscription object after creation');
            assert.equal(response.getValueColumn(), subscription.getValueColumn(), 'Invalid Subscription object after creation');
            assert.equal(response.getHistorian(), subscription.getHistorian(), 'Invalid Subscription object after creation');
            assert.equal(response.getSignalsTagField(), subscription.getSignalsTagField(), 'Invalid Subscription object after creation');
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