[![Falkonry Logo](http://static1.squarespace.com/static/55a7df64e4b09f03368a7a78/t/569c6441ab281050fe32c18a/1453089858079/15-logo-transparent-h.png?format=500w)](http://falkonry.com/)

[![npm package](https://nodei.co/npm/falkonry-js-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/falkonry-js-client/)
[![Build status](https://img.shields.io/travis/Falkonry/falkonry-js-client.svg?style=flat-square)](https://travis-ci.org/Falkonry/falkonry-js-client)

Falkonry Javascript Client to access [Falkonry Condition Prediction](falkonry.com) APIs

[Releases](https://github.com/Falkonry/falkonry-js-client/releases)

## Installation

```bash
$ npm install falkonry-js-client
```

## Features

    * Create Eventbuffer
    * Retrieve Eventbuffers
    * Create Pipeline
    * Retrieve Pipelines
    * Add data to Eventbuffer (csv/json, stream)
    * Retrieve output of Pipeline
    * Create/update/delete subscription for Eventbuffer
    * Create/update/delete publication for Pipeline

## Quick Start
```
* Get auth token from Falkonry Service UI
* Read the examples provided for integratioin with various data formats
```

## Examples 

    * To create an Eventbuffer for a single thing

Data :

```
json data :

{"time" :"2016-03-01 01:01:01", "current" : 12.4, "vibration" : 3.4, "state" : "On"}
{"time" :"2016-04-01 07:01:01", "current" : 0.4, "vibration" : 4.9, "state" : "Off"}

or

csv data : 

time,current,vibration,state
2016-03-01 01:01:01,12.4,3.4,On
2016-03-01 01:01:02,11.3,2.2,On

```

Usage :

```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token'); 

var eventbuffer = new Schemas.Eventbuffer();    
eventbuffer.setName('Test-Eeventbuffer-01');    //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data

//create eventbuffer
falkonry.createEventbuffer(eventbuffer, function(error, response){});

//add data to Eventbuffer
var data = '{"time" :"2016-03-01 01:01:01", "current" : 12.4, "vibration" : 3.4, "state" : "On"}';
var options = null

return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});
```

    * To add json data to Eventbuffer
    
```js
var Falkonry   = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

//add input data
var data = '{"time" :"2016-03-01 01:01:01", "current" : 12.4, "vibration" : 3.4, "state" : "On"}';
var options = null
return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});
```

    * To add csv data to Eventbuffer
    
```js
var Falkonry   = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

//add input data 
var data = 'time,current,vibration,state\n2016-03-01 01:01:01,12.4,3.4,On';
var options = null
return falkonry.addInput('eventbufferId', 'csv', data, options, function(error, response){});
```

    * To create an Eventbuffer for Multiple Things
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token'); 

var eventbuffer = new Schemas.Eventbuffer();    
eventbuffer.setName('Test-Eeventbuffer-01');    //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setThingIdentifier("motor");        //set property to identify thing in the data

//create and return Eventbuffer
return falkonry.createEventbuffer(eventbuffer, function(error, response){});
```

    * To create an Eventbuffer for narrow format data
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var eventbuffer = new Schemas.Eventbuffer();
eventbuffer.setName('Test-Eeventbuffer-01');    //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setSignalsTagField("tag");          //property that identifies signal tag in the data
eventbuffer.setSignalsDelimiter("_");           //delimiter used to concat thing id and signal name to create signal tag
eventbuffer.setSignalsLocation("prefix");       //part of the tag that identifies the signal name
eventbuffer.setValueColumn("value");

//create and return Eventbuffer
return falkonry.createEventbuffer(eventbuffer, function(error, response){});
```

    * To get all Eventbuffers
    
```js
var Falkonry   = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
        
//return a list of the Eventbuffers
falkonry.getEventbuffers(function(error, pipelines){});
```

    * To create Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var eventbuffer = new Schemas.Eventbuffer();
eventbuffer.setName('Test-Eeventbuffer-01');    //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setThingIdentifier("motor");        //set property to identify thing in the data

return falkonry.createEventbuffer(eventbuffer, function(error, response){

    //adding Data to the Eventbuffer
    var data = "time, motor, current, vibration, state\n" + "2016-03-01 01:01:01, Motor1, 12.4, 3.4, On";
    var eventbuffer_id = response.getId();
    return falkonry.addInput(eventbuffer_id,'csv',data,null,function(error,response){
        
        //creating a Pipeline from the Eventbuffer
        var pipeline = new Schemas.Pipeline();
        var signals  = {                                        //signals present in the Eventbuffer
        'current'   : ['Numeric', 'Samples'],                       
        'vibration' : 'Numeric', // default eventType is 'Samples'
        'state'     : ['Categorical', 'Occurrences']
        };      
        var assessment = new Schemas.Assessment();              //add an Assessment to the Pipeline
        assessment.setName('Health')                            //set name for the Assessment
            .setInputSignals(['current', 'vibration', 'state']);//add input signals to the Assessment

        pipeline.setName('Pipeline-01')                         //set Pipeline name
            .setEventbuffer(eventbuffer_id)                     //select Eventbuffer for the Pipeline
            .setInputSignals(signals)                           //add list of signals for the Pipeline
            .setAssessment(assessment);                         //select list of Assessments for the Pipeline
        return falkonry.createPipeline(pipeline, function(error, response){});
    });
});
```

    * To get all Pipelines
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
        
falkonry.getPipelines(function(error, pipelines){});
```

    * To add data from a stream to Eventbuffer
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');         //use *.csv for csv data
var options = null
var streamHandler = falkonry.addInputFromStream('eventbuffer_id', 'json', stream, options, function(error, response){});
```

    * To add json verification data to Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
var data = '{"time" : "2011-03-26T12:00:00Z", "car" : "HI3821", "end" : "2012-06-01T00:00:00Z", "Health" : "Normal"}';
var options = null
return falkonry.addVerification('pipelineId', 'json', data, options, function(error, response){});
```

    * To add csv verification data to Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
var data = "time,end,car,Health\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,IL9753,Normal\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,HI3821,Normal";
var options = null
return falkonry.addInput('pipelineId', 'csv', data, options, function(error, response){});
```

    * To add verification data from a stream to Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');
var options = null
var streamHandler = falkonry.addVerificationFromStream('pipelineid', 'json', stream, options, function(error, response){});
```

    * To get output of a Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');
var startTime = '1457018017';               //seconds since unix epoch 
var endTime   = '1457028017';               //seconds since unix epoch
var streamHandler = falkonry.getOutput('pipeline_id', startTime, endTime, function(error, stream){
    stream.pipe(fs.createWriteStream('/tmp/pipeline_output.json'));
});
```

    * To add subscription to an Eventbuffer
    
```js
var Falkonry = require('falkonry-js-client').Client;
var Schemas  = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var subscription = new Schemas.Subscription()
    .setType('MQTT')                        //set type of Subscription
    .setPath('mqtt://test.mosquito.com')    //set host url for Mosquitto broker
    .setTopic('falkonry-eb-1-test')         //set topic to subscribe
    .setUsername('test-user')               //optional property
    .setPassword('test');                   //optional property

//create and return Subscription
return falkonry.createSubscription('eventbuffer_id', subscription, function(error, response){});
```


    * To add publication to a Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;
var Schemas  = require('falkonry-js-client').Schemas;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var publication = new Schemas.Publication()
    .setType('MQTT')                        //set type of Subscription
    .setPath('mqtt://test.mosquito.com')    //set host url for Mosquitto broker
    .setTopic('falkonry-eb-1-test')         //set topic to subscribe
    .setUsername('test-user')               //optional property
    .setPassword('test');                   //optional property
    .setContentType('application/json');    //set format of output
    
//create and return a Publication
return falkonry.createPublication('pipeline_id', publication, function(error, response){});
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
