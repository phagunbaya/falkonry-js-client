[![Falkonry Logo](http://static1.squarespace.com/static/55a7df64e4b09f03368a7a78/t/569c6441ab281050fe32c18a/1453089858079/15-logo-transparent-h.png?format=500w)](http://falkonry.com/)

[![npm package](https://nodei.co/npm/falkonry-js-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/falkonry-js-client/)
[![Build status](https://img.shields.io/travis/Falkonry/falkonry-js-client.svg?style=flat-square)](https://travis-ci.org/Falkonry/falkonry-js-client)

Falkonry Javascript Client to access Condition Prediction APIs

## Installation

```bash
$ npm install falkonry-js-client
```

## Features

    * Create Pipeline
    * Retrieve Pipelines
    * Add data to Pipeline (csv, json, stream)
    * Retrieve output of Pipeline (csv, json, stream)
    
## Quick Start

    * To create Pipeline
    
```
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;
var falkonry   = new Falkonry("https://service.falkonry.io", "auth-token");

var assessment = Schemas.Assessment();
                        .setName("Health")
                        .addSignals(["current", "vibration"]);
                        
var pipeline   = Schemas.Pipeline()
                        .setName("Motor Health")
                        .setThingName("Motor")
                        .setSignals({"current" : "NUMERIC", "vibration" : "NUMERIC"})
                        .addAssessment(assessment);
        
falkonry.createPipeline(pipeline, function(error, pipeline){});
```

    * To get all Pipelines
    
```
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry("https://service.falkonry.io", "auth-token");
        
falkonry.getPipelines(function(error, pipelines){});
```

    * To add csv data

```
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry("https://service.falkonry.io", "auth-token");
var data     = 'time, current, vibration\n' +
               '1456528122024, 3.86, 4.2\n' +
               '1456528132024, 4.456, 6.8\n' +
               '1456528142024, 2.4690, 9.3\n';
               
falkonry.addInput("pipeline_id", data, function(error, response){});
```

    * To add json data
    
```
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry("https://service.falkonry.io", "auth-token");
var data       = [
    {
        "time"      : 1456528122024,
        "current"   : 3.86,
        "vibration" : 4.2
    },
    {
        "time"      : 1456528132024,
        "current"   : 4.456,
        "vibration" : 6.8
    },
    {
        "time"      : 1456528142024,
        "current"   : 2.4690,
        "vibration" : 9.3
    }
];
falkonry.addInput("pipeline_id", data, function(error, response){});
```

    * To add data as csv stream
    
```
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry("https://service.falkonry.io", "auth-token");
var stream   = fs.createReadStream("/tmp/sample.csv");

var streamHandler = falkonry.addInputAsCsvStream("pipeline_id", stream);
streamHandler.on('error', function(error){});
streamHandler.on('success', function(stats){});
streamHandler.startStreaming();
```

    * To add data as json stream
    
```
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry("https://service.falkonry.io", "auth-token");
var stream   = fs.createReadStream("/tmp/sample_stream.json");

var streamHandler = falkonry.addInputAsJsonStream("pipeline_id", stream);
streamHandler.on('error', function(error){});
streamHandler.on('success', function(stats){});
streamHandler.startStreaming();
```

## Docs

    * [Falkonry APIs](https://service.falkonry.io/api)
     
## Tests

  To run the test suite, first install the dependencies, then run `npm test`:
  
```bash
$ npm install
$ npm test
```

## License

  [MIT](LICENSE)