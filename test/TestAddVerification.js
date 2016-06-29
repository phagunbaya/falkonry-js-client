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
var token    = 'b7f4sc9dcaklj6vhcy50otx41p044s6l';

describe.skip("Test add verification data to Pipeline", function(){
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
      assert.equal(error,null,"Error creating Eventbuffer" + error);

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
          assert.equal(error, null, "Error creating Pipeline " + error);
          if(!error){
            pipelines.push(response);

            var data = "time,end,car,Health\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,IL9753,Normal\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,HI3821,Normal";
            return falkonry.addVerification(response.getId(), 'csv', data, null, function(error,response){
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
      else{
        return done();
      }
    });  
	});

  it("should add verification json data", function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    var options = {
          'timeIdentifier' : 'time',
          'timeFormat'     : 'iso_8601'
      };
    return falkonry.createEventbuffer(eventbuffer, options, function(error, response){
      assert.equal(error,null,"Error creating Eventbuffer" + error);

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
          assert.equal(error, null, "Error creating Pipeline " + error);

          if(!error){
            pipelines.push(response);

            var data = '{"time" : "2011-03-26T12:00:00Z", "car" : "HI3821", "end" : "2012-06-01T00:00:00Z", "Health" : "Normal"}';
            return falkonry.addVerification(response.getId(), 'json', data, null, function(error,response){
              assert.equal(error, null, "Error adding verification data to pipeline." + JSON.stringify(error));
              if(!error) {
                assert.equal(response.length,1,"Error adding verification");
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
                console.log('TestAddVerification', 'Error deleting pipeline - '+pipeline.getId());
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
                console.log('TestAddVerification', 'Error deleting eventbuffer - '+eventbuffer.getId());
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