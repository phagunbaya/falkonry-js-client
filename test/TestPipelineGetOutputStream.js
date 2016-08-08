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
var Events   = require('events');
var host     = 'http://dev.falkonry.io';
var token    = 'dg5th0r2rj4rywg3rv90egu3krswpw50';
var pipeline = 'auvkkw8boml4l2'; //Pipeline id
var updateNotifier;
var runnerID;

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

    it('Should get output stream', function(done){
        this.timeout(3600000);
        setTimeout(done, 3600000);

        var start = "123456";
        var count = 0;
        return falkonry.streamOutput(pipeline, start, function (error, notifier) {
            assert.equal(error, null, 'Error getting output stream'  + error);

            if(!error) {
                updateNotifier = notifier;
                updateNotifier.on('data', function (data) {
                    console.log(data);
                    count += 1;
                    if(count == 5) {
                        return updateNotifier.close();
                    }
                });
                updateNotifier.on('error', function (error) {
                    updateNotifier.close();
                    return done;
                })
            }
        });
    });

    after(function(done){
        return done();
    });
});