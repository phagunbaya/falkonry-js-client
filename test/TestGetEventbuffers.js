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
var token    = 'b7f4sc9dcaklj6vhcy50otx41p044s6l'; //auth token

/*
 * Test to get Eventbuffers for an account
 */

describe.skip('Test fetch Eventbuffers', function(){
  var falkonry = null;
  var eventbuffers = [];

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Get all eventbuffers', function(done){
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

        return falkonry.getEventbuffers(function(error, response){
          assert.equal(error, null, 'Error fetching Eventbuffers');

          if(!error) {
            assert.equal(response.length > 0, true, 'Cannot fetch Eventbuffers');
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
      var fn = function(eventbuffer){
        return function(_cb) {
          return falkonry.deleteEventbuffer(eventbuffer.getId(), function(error, response){
            if(error)
              console.log('TestGetPipelines', 'Error deleting eventbuffer - '+eventbuffer.getId());
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