/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

 /**
 * Module dependencies
 */

var fs       = require('fs');
var async    = require('async');
var assert   = require('assert');
var Falkonry = require('../').Client;
var Schemas  = require('../').Schemas;
var host     = 'http://localhost:8080';
var token    = 'b7f4sc9dcaklj6vhcy50otx41p044s6l';

describe.skip("Test add verification data from stream to Pipeline", function(){
  var falkonry = null;
  var eventbuffers = [];
  var pipelines = [];

  before(function(done){
		falkonry = new Falkonry(host, token);
		return done();
	});

	it("should add verification csv data", function(done){
		var eventbuffer = new Schemas.Eventbuffer();
		eventbuffer.setName('Test-EB-'+Math.random());
		var options = {
      		'timeIdentifier' : 'time',
      	  'timeFormat'     : 'iso_8601'
    	};
    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error,null,"Error creating Eventbuffer" + JSON.stringify(error));

      if(!error){
        eventbuffers.push(response);

        var pipeline = new Schemas.Pipeline();
        var signals = {
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
            .setAssessment(assessment)
            .setInterval(null, "PT1S");
            
        return falkonry.createPipeline(pipeline, function(error,response){
          assert.equal(error, null, "Error creating Pipeline " + JSON.stringify(error));

          if(!error){
            pipelines.push(response);

            var data = fs.createReadStream(__dirname+'/resources/verificationData.csv');
            return falkonry.addVerificationFromStream(response.getId(), 'csv', data, null, function(error,response){
              assert.equal(error, null, "Error adding verification data to pipeline." + JSON.stringify(error));
              if(!error) {
                assert.equal(JSON.stringify(response),'{"message":"Data submitted successfully"}',"Error adding verification");
              }
              return done();
            });
          }
          else{
            return done();
          }
        });    
      }
    });  
	});

  it("should add verification JSON data", function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    var options = {
          'timeIdentifier' : 'time',
          'timeFormat'     : 'iso_8601'
      };
    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error,null,"Error creating Eventbuffer" + JSON.stringify(error));

      if(!error){
        eventbuffers.push(response);

        var pipeline = new Schemas.Pipeline();
        var signals = {
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
            .setAssessment(assessment)
            .setInterval(null, "PT1S");
            
        return falkonry.createPipeline(pipeline, function(error,response){
          assert.equal(error, null, "Error creating Pipeline " + JSON.stringify(error));

          if(!error){
            pipelines.push(response);

            var data = fs.createReadStream(__dirname+'/resources/verificationData.json');
            return falkonry.addVerificationFromStream(response.getId(), 'json', data, null, function(error,response){
              assert.equal(error, null, "Error adding verification data to pipeline." + JSON.stringify(error));
              if(!error) {
                assert.equal(response.length,2,"Error adding verification");
                //2 is the number of rows in the file
              }
              return done();
            });
          }
          else{
            return done();
          }
        });    
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
                console.log('TestAddVerificationStream', 'Error deleting pipeline - '+pipeline.getId());
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
                console.log('TestAddVerificationStream', 'Error deleting eventbuffer - '+eventbuffer.getId());
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