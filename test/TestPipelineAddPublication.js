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
var token    = 'g7p1bj362pk8s9qlrna7kgpzt467nxcq'; //auth token

/*
 * Test to create Publication for a Pipeline of type :
 *  1. MQTT
 *  2. Splunk
 *  3. Webhook
 */

describe.skip('Test Publication Creation', function(){
  var falkonry = null;
  var eventbuffers = [];
  var pipelines = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should create Publication of MQTT type', function(done){
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
            .setThingName('Motor')
            .setAssessment(assessment);

        return falkonry.createPipeline(pipeline, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

          if(!error) {
            pipelines.push(response);

            var publication = new Schemas.Publication()
                .setType('MQTT')
                .setTopic('falkonry-test-pipeline')
                .setPath('mqtt://test.mosquito.com')
                .setUsername('test-user')
                .setPassword('test-password')
                .setContentType('application/json');
            return falkonry.createPublication(response.getId(), publication, function(error, response){
              assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Publication object after creation');
                assert.equal(typeof response.getKey(), 'string', 'Invalid Publication object after creation');
                assert.equal(response.getType(), publication.getType(), 'Invalid Publication object after creation');
                assert.equal(response.getTopic(), publication.getTopic(), 'Invalid Publication object after creation');
                assert.equal(response.getPath(), publication.getPath(), 'Invalid Publication object after creation');
                assert.equal(response.getUsername(), publication.getUsername(), 'Invalid Publication object after creation');
                assert.equal(response.getContentType(), publication.getContentType(), 'Invalid Publication object after creation');
              }
              return done();
            });
          }
          else {
            return done();
          }
        });
      }
      else {
        return done();
      }
    });
  });

  it('Should create Publication of Splunk type', function(done){
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
            .setThingName('Motor')
            .setAssessment(assessment);

        return falkonry.createPipeline(pipeline, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

          if(!error) {
            pipelines.push(response);

            var publication = new Schemas.Publication()
                .setType('SPLUNK')
                .setTopic('falkonry-test-pipeline') //splunk source name
                .setPath('https://test.splunk.com/') //splunk host
                .setHeaders({
                  'Authorization' : 'Token 1234567890'
                });

            return falkonry.createPublication(response.getId(), publication, function(error, response){
              assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Publication object after creation');
                assert.equal(typeof response.getKey(), 'string', 'Invalid Publication object after creation');
                assert.equal(response.getType(), publication.getType(), 'Invalid Publication object after creation');
                assert.equal(response.getTopic(), publication.getTopic(), 'Invalid Publication object after creation');
                assert.equal(response.getPath(), publication.getPath(), 'Invalid Publication object after creation');
                assert.equal(typeof response.getHeaders(), 'object', 'Invalid Publication object after creation');
              }
              return done();
            });
          }
          else {
            return done();
          }
        });
      }
      else {
        return done();
      }
    });
  });

  it('Should create Publication of webhook type', function(done){
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
            .setThingName('Motor')
            .setAssessment(assessment);

        return falkonry.createPipeline(pipeline, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

          if(!error) {
            pipelines.push(response);

            var publication = new Schemas.Publication()
                .setType('WEBHOOK')
                .setPath('https://test.example.com/getFalkonryData') //custom endpoint to receive falkonry data
                .setHeaders({
                  'Authorization' : 'Token 1234567890'
                })
                .setContentType('application/json');

            return falkonry.createPublication(response.getId(), publication, function(error, response){
              assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

              if(!error) {
                pipelines.push(response);
                assert.equal(typeof response, 'object', 'Invalid Publication object after creation');
                assert.equal(typeof response.getKey(), 'string', 'Invalid Publication object after creation');
                assert.equal(response.getType(), publication.getType(), 'Invalid Publication object after creation');
                assert.equal(response.getTopic(), publication.getTopic(), 'Invalid Publication object after creation');
                assert.equal(response.getPath(), publication.getPath(), 'Invalid Publication object after creation');
                assert.equal(typeof response.getHeaders(), 'object', 'Invalid Publication object after creation');
                assert.equal(response.getContentType(), publication.getContentType(), 'Invalid Publication object after creation');
              }
              return done();
            });
          }
          else {
            return done();
          }
        });
      }
      else {
        return done();
      }
    });
  });

  after(function(done){
    return done();
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