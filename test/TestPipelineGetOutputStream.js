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
var host     = 'https://localhost:8080';
var token    = '';                      //auth token
var pipeline = '';                      //Pipeline id

/*
 * Test to get output of a Pipeline
 * and pipe it to a writable file stream
 */

describe.skip('Test get output of a Pipeline', function(){
    var falkonry = null;

    before(function(done){
        falkonry = new Falkonry(host, token);
        return done();
    });

    it('Should get output stream', function(done){
        var streamCount = 0;                //update counter for test case only
        return falkonry.getOutput(pipeline, function (error, stream) {
            assert.equal(error, null, 'Error getting output stream'  + error);
            if(!error) {
                stream.on('data', function (data) {
                    console.log(data);
                    streamCount++;
                    if(streamCount > 5) { //stop stream after 5 messages
                        stream.close();
                        return done();
                    }
                });
                stream.on('error', function (error) {
                    stream.close();
                    return done();
                })
            }
        });
    });

    after(function(done){
        return done();
    });
});