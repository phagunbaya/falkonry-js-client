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
var token    = '';                      //auth token

describe.skip("Test add facts data from stream to Pipeline", function(){
  var falkonry = null;
  var eventbuffers = [];
  var pipelines = [];

  before(function(done){
		falkonry = new Falkonry(host, token);
		return done();
	});

	it("should add facts csv data", function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");
    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error,null,"Error creating Eventbuffer" + error);

      if(!error){
        eventbuffers.push(response);
        var eventbuffer_id = response.getId();
        var data = "time, current, vibration, state\n" + "2016-03-01 01:01:01, 12.4, 3.4, On";
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
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
                .setEventbuffer(eventbuffer_id)
                .setInputSignals(signals)
                .setAssessment(assessment)
                .setInterval(null, "PT1S");
                
            return falkonry.createPipeline(pipeline, function(error,response){
              assert.equal(error, null, "Error creating Pipeline " + error);

              if(!error){
                pipelines.push(response);

                var data = fs.createReadStream(__dirname+'/resources/factsData.csv');
            return falkonry.addFactsFromStream(response.getId(), 'csv', data, null, function(error,response){
                  assert.equal(error, null, "Error adding facts data to pipeline." + JSON.stringify(error));
                  if(!error) {
                    assert.equal(JSON.stringify(response),'{"message":"Data submitted successfully"}',"Error adding facts");
                  }
                  return done();
                });
              }
              else{
                return done();
              }
            });    
          }
          return done();
        });  
      }
      return done();
    })
  });

  it("should add facts json data", function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());
    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("iso_8601");
    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error,null,"Error creating Eventbuffer" + error);

      if(!error){
        eventbuffers.push(response);
        var eventbuffer_id = response.getId();
        var data = "time, current, vibration, state\n" + "2016-03-01 01:01:01, 12.4, 3.4, On";
        return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
          if(!error){
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
                .setEventbuffer(eventbuffer_id)
                .setInputSignals(signals)
                .setAssessment(assessment)
                .setInterval(null, "PT1S");
                
            return falkonry.createPipeline(pipeline, function(error,response){
              assert.equal(error, null, "Error creating Pipeline " + error);

              if(!error){
                pipelines.push(response);

                var data = fs.createReadStream(__dirname+'/resources/factsData.json');
            return falkonry.addFactsFromStream(response.getId(), 'json', data, null, function(error,response){
                  assert.equal(error, null, "Error adding facts data to pipeline." + JSON.stringify(error));
                  if(!error) {
                    assert.equal(response.length,2,"Error adding facts");
                  }
                  return done();
                });
              }
              else{
                return done();
              }
            });    
          }
          return done();
        });  
      }
      return done();
    })
  });  

  after(function(done){
    return async.series(function(){
      var tasks = [];
      var fn = function(pipeline){
        return function(_cb) {
          return falkonry.deletePipeline(pipeline.getId(), function(error, response){
            if(error)
                console.log('TestAddFactsStream', 'Error deleting pipeline - '+pipeline.getId());
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
                console.log('TestAddFactsStream', 'Error deleting eventbuffer - '+eventbuffer.getId());
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