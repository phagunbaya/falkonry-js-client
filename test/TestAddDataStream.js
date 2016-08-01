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
var host     = 'http://192.168.1.202:8080';
var token    = 'wluja163da0f8a3451mhyyqrtsuclvb7';

/*
 * Test to add data stream to a Pipeline
 */

describe('Test add input data stream to Pipeline', function(){
  var falkonry = null;
  var eventbuffers = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should add json data stream to eventbuffer', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        var data = fs.createReadStream(__dirname+'/resources/inputData.json');
        return falkonry.addInputFromStream(response.getId(), 'json', data, null, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+JSON.stringify(error));

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

  it('Should add csv data stream to eventbuffer', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    return falkonry.createEventbuffer(eventbuffer, function(error, response){
      assert.equal(error, null, 'Error creating Eventbuffer');

      if(!error) {
        eventbuffers.push(response);
        var data = fs.createReadStream(__dirname+'/resources/inputData.csv');
        return falkonry.addInputFromStream(response.getId(), 'csv', data, null, function(error, response){
          assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

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

  it('Should add csv data stream to a particular subscription of an eventbuffer', function(done){
    var eventbuffer = new Schemas.Eventbuffer();
    eventbuffer.setName('Test-EB-'+Math.random());

    eventbuffer.setTimeIdentifier("time");
    eventbuffer.setTimeFormat("YYYY-MM-DD HH:mm:ss");

    //create event buffer and add a subscription
    var options = {
      'subscription' : '<subscription-id>'
    };
    var data = fs.createReadStream(__dirname+'/resources/inputData.csv');
    return falkonry.addInputFromStream( '<eventbuffer-id>', 'csv', data, options, function(error, response){
      assert.equal(error, null, 'Error adding input data to Eventbuffer: '+error);

      if(!error) {
        assert.equal(typeof response.__$id, 'string', 'Cannot add input data to Pipeline');
      }
      return done();
    });
  });

  after(function(done){
    return async.series(function(){
      var tasks = [];
      var fn = function(eventbuffer){
        return function(_cb) {
          return falkonry.deleteEventbuffer(eventbuffer.getId(), function(error, response){
            if(error)
              console.log('TestAddDataStream', 'Error deleting eventbuffer - '+eventbuffer.getId());
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