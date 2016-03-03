/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var fs    = require('fs');
var _     = require('underscore');
var Mocha = require('mocha');
var mocha = new Mocha();

/**
 *
 * Test Runner
 *  Executes all tests from test folder
 */

function Bootstrapper(run) {
  var args = process.argv.slice(2);
  var overridenTests = [];
  for(var test in args) {
    overridenTests.push(args[test]);
  }

  if(!fs.existsSync(__dirname + '/reports'))
    fs.mkdirSync(__dirname + '/reports');
  process.env['XUNIT_FILE'] = __dirname + '/reports/TestResults.xml';
  mocha.reporter('xunit-file');
  mocha.timeout(1000000);

  return function () {
    /*
     * Runs all the test files with 'Test' as prefix
     */
    fs.readdirSync(__dirname).filter(function (file) {
      if (overridenTests.length === 0)
        return file.indexOf('Test') === 0 && file.substr(-3) === '.js';
      else
        return _.contains(overridenTests, file);
    }).forEach(function (file) {
      mocha.addFile(
          __dirname + '/' + file
      );
    });
    return run();
  }();
}

/*
 * Execute tests
 */
Bootstrapper(function(){
  mocha.run(function (failures) {
    process.exit(failures);
  });
});