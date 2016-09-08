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

#### Setup Eventbuffer for narrow/historian style data from a single entity

Data:
```
    {"time" :"2016-03-01 01:01:01", "tag" : "signal1", "value" : 3.4}
    {"time" :"2016-03-01 01:01:02", "tag" : "signal2", "value" : 9.3}

    or

    time, tag, value
    2016-03-01 01:01:01, signal1, 3.4
    2016-03-01 01:01:02, signal2, 9.3

```

Usage:

```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var eventbuffer = new Schemas.Eventbuffer();
eventbuffer.setName('Test-Eventbuffer-01');     //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setTimezone("GMT", 0);              //output data will be generated using timezone
eventbuffer.setSignalsTagField("tag");          //property that identifies signal tag in the data
eventbuffer.setValueColumn("value");            //property that identifies value of the signal in the data

//create Eventbuffer
falkonry.createEventbuffer(eventbuffer, function(error, response){});

//add data to Eventbuffer
String data = "{\"time\" : \"2016-03-01 01:01:01\", \"tag\" : \"signal1\", \"value\" : 3.4}" + "\n"
        + "{\"time\" : \"2016-03-01 01:01:02\", \"tag\" : \"signal2\", \"value\" : 9.3}";
var options = null
return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});
```

#### Setup Eventbuffer for narrow/historian style data from multiple entities

Data:

```
    {"time" :"2016-03-01 01:01:01", "tag" : "signal1_thing1", "value" : 3.4}
    {"time" :"2016-03-01 01:01:01", "tag" : "signal2_thing1", "value" : 1.4}
    {"time" :"2016-03-01 01:01:02", "tag" : "signal1_thing2", "value" : 9.3}
    {"time" :"2016-03-01 01:01:02", "tag" : "signal2_thing2", "value" : 4.3}

    or

    time, tag, value
    2016-03-01 01:01:01, signal1_thing1, 3.4
    2016-03-01 01:01:01, signal2_thing1, 1.4
    2016-03-01 01:01:02, signal1_thing2, 9.3
    2016-03-01 01:01:02, signal2_thing2, 4.3
```

Usage:

```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var eventbuffer = new Schemas.Eventbuffer();
eventbuffer.setName('Test-Eventbuffer-01');     //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setSignalsTagField("tag");          //property that identifies signal tag in the data
eventbuffer.setSignalsDelimiter("_");           //delimiter used to concat entity id and signal name to create signal tag
eventbuffer.setSignalsLocation("prefix");       //part of the tag that identifies the signal name
eventbuffer.setValueColumn("value");            //property that identifies value of the signal in the data

//create Eventbuffer
falkonry.createEventbuffer(eventbuffer, function(error, response){});

//add data to Eventbuffer
String data = "{\"time\" : \"2016-03-01 01:01:01\", \"tag\" : \"signal1_thing1\", \"value\" : 3.4}" + "\n"
        + "{\"time\" : \"2016-03-01 01:01:01\", \"tag\" : \"signal2_thing1\", \"value\" : 1.4}" + "\n"
        + "{\"time\" : \"2016-03-01 01:01:02\", \"tag\" : \"signal1_thing1\", \"value\" : 9.3}" + "\n"
        + "{\"time\" : \"2016-03-01 01:01:02\", \"tag\" : \"signal2_thing2\", \"value\" : 4.3}";
var options = null
return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});        
```

#### Setup Eventbuffer for wide style data from a single entity

Data :

```
    {"time":1467729675422, "signal1":41.11, "signal2":82.34, "signal3":74.63, "signal4":4.8}
    {"time":1467729668919, "signal1":78.11, "signal2":2.33, "signal3":4.6, "signal4":9.8}

    or

    time, signal1, signal2, signal3, signal4
    1467729675422, 41.11, 62.34, 77.63, 4.8
    1467729675445, 43.91, 82.64, 73.63, 3.8
```

Usage :

```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token'); 

var eventbuffer = new Schemas.Eventbuffer();    
eventbuffer.setName('Test-Eventbuffer-01');     //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data

//create eventbuffer
falkonry.createEventbuffer(eventbuffer, function(error, response){});

//add data to Eventbuffer
var data = '{"time" :"2016-03-01 01:01:01", "current" : 12.4, "vibration" : 3.4, "state" : "On"}';
var options = null
return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});
```

#### Setup Eventbuffer for wide style data from multiple entities

Data :

```
    {"time":1467729675422, "entity": "Thing1", "signal1":41.11, "signal2":82.34, "signal3":74.63, "signal4":4.8}
    {"time":1467729668919, "entity": "Thing2", "signal1":78.11, "signal2":2.33, "signal3":4.6, "signal4":9.8}

    or

    time, entity, signal1, signal2, signal3, signal4
    1467729675422, thing1, 41.11, 62.34, 77.63, 4.8
    1467729675445, thing1, 43.91, 82.64, 73.63, 3.8
```

Usage:

```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token'); 

var eventbuffer = new Schemas.Eventbuffer();    
eventbuffer.setName('Test-Eventbuffer-01');     //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setEntityIdentifier("entity");        //set property to identify entity in the data

//create Eventbuffer
falkonry.createEventbuffer(eventbuffer, function(error, response){});

//add data to Eventbuffer
String data = "time, entity, signal1, signal2, signal3, signal4" + "\n"
        + "1467729675422, thing1, 41.11, 62.34, 77.63, 4.8" + "\n"
        + "1467729675445, thing1, 43.91, 82.64, 73.63, 3.8";
var options = null
return falkonry.addInput('eventbufferId', 'json', data, options, function(error, response){});
```
    
#### Get an Eventbuffer
    
```js
var Falkonry   = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
        
//return a list of the Eventbuffers
falkonry.getEventbuffers(function(error, pipelines){});
```

#### Setup Pipeline from Eventbuffer
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var Schemas    = require('falkonry-js-client').Schemas;

//instantiate Falkonry
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');

var eventbuffer = new Schemas.Eventbuffer();
eventbuffer.setName('Test-Eventbuffer-01');     //name of the eventbuffer
eventbuffer.setTimeIdentifier("time");          //property that identifies time in the data
eventbuffer.setTimeFormat("iso_8601");          //format of the time in the data
eventbuffer.setEntityIdentifier("entity");        //set property to identify entity in the data

return falkonry.createEventbuffer(eventbuffer, function(error, response){

    //adding Data to the Eventbuffer
    var data = "time, entity, current, vibration, state\n" + "2016-03-01 01:01:01, Motor1, 12.4, 3.4, On";
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

#### To get all Pipelines
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
        
falkonry.getPipelines(function(error, pipelines){});
```

#### Add facts data (json format) to a Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;
var falkonry   = new Falkonry('https://service.falkonry.io', 'auth-token');
var data = '{"time" : "2011-03-26T12:00:00Z", "car" : "HI3821", "end" : "2012-06-01T00:00:00Z", "Health" : "Normal"}';
var options = null
return falkonry.addFacts('pipelineId', 'json', data, options, function(error, response){});
```

#### Add facts data (csv format) to a Pipeline
    
```js
var Falkonry   = require('falkonry-js-client').Client;

//instantiate Falkonry
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');

var data = "time,end,car,Health\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,IL9753,Normal\n2011-03-31T00:00:00Z,2011-04-01T00:00:00Z,HI3821,Normal";
var options = null
return falkonry.addInput('pipelineId', 'csv', data, options, function(error, response){});
```

#### Add facts data (json format) from a stream to a Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.json');         
var options = null
var streamHandler = falkonry.addInputFromStream('eventbuffer_id', 'json', stream, options, function(error, response){});
```

#### Add facts data (csv format) from a stream to a Pipeline
    
```js
var Falkonry = require('falkonry-js-client').Client;
var falkonry = new Falkonry('https://service.falkonry.io', 'auth-token');
var stream   = fs.createReadStream('/tmp/sample.csv');         
var options = null
var streamHandler = falkonry.addInputFromStream('eventbuffer_id', 'csv', stream, options, function(error, response){});
```

#### Get output of a Pipeline
    
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

#### To create and delete a subscription for an Eventbuffer

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

//delete Subscription
falkonry.deleteSubscription('eventbuffer_id', subscription, function(error, response){});
```


#### To create and delete a publication for a Pipeline
    
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

//delete Publication
falkonry.deletePublication('pipeline_id', publication, function(error, response){});
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