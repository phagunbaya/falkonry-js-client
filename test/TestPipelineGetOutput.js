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
var assert   = require('assert');
var Falkonry = require('../').Client;
var host     = 'http://localhost:8080';
var token    = '';                      //auth token
var pipeline = ''; //Pipeline id

/*
 * Test to get output of a Pipeline
 * and pipe it to a writable file stream
 */

describe('Test get output of a Pipeline', function(){
  var falkonry = null;

  before(function(done){
    falkonry = new Falkonry(host, token);
    return done();
  });

  it('Should get complete output', function(done){
    return falkonry.getOutput(pipeline, null, null, function(error, response){
      assert.equal(error, null, 'Error getting output of a Pipeline: '+error);

      if(!error) {
        response.pipe(fs.createWriteStream('/tmp/'+pipeline+'.json'));
      }
      return done();
    });
  });

  it('Should get output within the specified range', function(done){
    this.timeout(10000);
    setTimeout(done, 10000);

    var start = 0;
    //var end   = 0;
    return falkonry.getOutput(pipeline, start, null, function(error, response){
      assert.equal(error, null, 'Error getting output of a Pipeline: '+error);

      if(!error) {
        response.pipe(fs.createWriteStream('/tmp/'+pipeline+'.json'));
        response.on('end', function(){
          return done();
        });
      }
    });
  });

  after(function(done){
    return done();
  });
});