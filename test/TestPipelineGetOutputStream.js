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
var host     = 'http://192.168.1.202:8080';
var token    = 'wluja163da0f8a3451mhyyqrtsuclvb7';
var pipeline = 'nzqnyhqcgdx8dx'; //Pipeline id
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

        return falkonry.streamOutput(pipeline, start, function (error, notifier) {
            assert.equal(error, null, 'Error getting output stream'  + error);

            if(!error) {
                updateNotifier = notifier;
                updateNotifier.on('data', function (data) {
                    console.log(data);
                });
            }
        });
    });

    it('Should end output stream', function(done){
        this.timeout(3600000);
        setTimeout(done, 3600000);

        var start = "1467729648422";
        return falkonry.streamOutput(pipeline, start, function (error) {
            assert.equal(error, null, 'Unable to stop process');

            if (!error) {
                return done();
            }
        });
    });
    /*it('Should get output within the specified range', function(done){
        this.timeout(4000);
        setTimeout(done, 4000);
        //setTimeout();
        var start = 0;
        //var end   = 0;
        return falkonry.endOutputStream(pipeline, function(error, response){
            assert.equal(error, null, 'Error getting output of a Pipeline: '+error);

            if(!error) {
                //response.pipe(fs.createWriteStream('/tmp/'+pipeline+'.json'));
                //response.on('end', function(){
                //});

                return done();
            }
        });
    });*/

    after(function(done){
        return done();
    });
});