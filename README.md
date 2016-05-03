[![Falkonry Logo](http://static1.squarespace.com/static/55a7df64e4b09f03368a7a78/t/569c6441ab281050fe32c18a/1453089858079/15-logo-transparent-h.png?format=500w)](http://falkonry.com/)

[![npm package](https://nodei.co/npm/falkonry-js-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/falkonry-js-client/)
[![Build status](https://img.shields.io/travis/Falkonry/falkonry-js-client.svg?style=flat-square)](https://travis-ci.org/Falkonry/falkonry-js-client)

Falkonry Javascript Client to access [Falkonry Condition Prediction](falkonry.com) APIs

## Installation

```bash
$ npm install falkonry-js-client
```

## Features

    * Create Pipeline
    * Retrieve Pipelines
    * Add data to Pipeline (json, stream)
    * Retrieve output of Pipeline
    
## Quick Start

    * To create Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var assessment = new Schemas.Assessment()
                        .setName('Health')
                        .setInputSignals(['current', 'vibration']);
                        
var pipeline   = new Schemas.Pipeline()
                        .setName('Motor Health')
                        .setThingName('Motor')
                        .setTimeIdentifier('time')
                        .setTimeFormat('YYYY-MM-DD HH:MM:SS')
                        .setInputSignals({'current' : 'Numeric', 'vibration' : 'Numeric'})
                        .addAssessment(assessment);
        
falkonry.createPipeline(pipeline, function(error, pipeline){});
```

    * To get all Pipelines
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
        
falkonry.getPipelines(function(error, pipelines){});
```

    * To add data
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
var data       = [
    {
        'time'      : 1456528122024,
        'current'   : 3.86,
        'vibration' : 4.2
    },
    {
        'time'      : 1456528132024,
        'current'   : 4.456,
        'vibration' : 6.8
    },
    {
        'time'      : 1456528142024,
        'current'   : 2.4690,
        'vibration' : 9.3
    }
];
falkonry.addInput('pipeline_id', data, function(error, response){});
```

    * To add data from a stream
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');

var streamHandler = falkonry.addInputFromStream('pipeline_id', stream, function(error, response){});
```

    * To get output of a Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');
var startTime = '1457018017'; //seconds since unix epoch 
var endTime   = '1457028017'; //seconds since unix epoch
var streamHandler = falkonry.getOutput('pipeline_id', startTime, endTime, function(error, stream){
    stream.pipe(fs.createWriteStream('/tmp/pipeline_output.json'));
});
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

  Available under [MIT License(LICENSE)
