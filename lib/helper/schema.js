/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 *
 * Schema helper
 *  To manage schema of the entities
 *
 */

module.exports = {
  'Pipeline'    : {
    'id': 'string',
    'sourceId': 'string',
    'tenant': 'string',
    'createdBy': 'string',
    'updatedBy': 'string',
    'createTime': 'number',
    'updateTime': 'number',
    'type': 'string',
    'name': 'string',
    'inputConf': 'object',
    'thingIdentifier': 'string',
    'timeIdentifier': 'string',
    'timeFormat': 'string',
    'inputMeasurement': 'string',
    'singleThingID': 'string',
    'inputList': '$List(Signal)',
    'assessmentList': '$List(Assessment)',
    'earliestDataPoint': 'number',
    'latestDataPoint': 'number',
    'status': 'string',
    'outflowStatus': 'string',
    'modelRevisionList': 'array',
    'outflowHistory': 'array',
    'statsMeasurementMap': 'object',
    'interval': {
      'field': 'string',
      'duration': 'string'
    }
  },
  'Signal'      : {
    'key' : 'string',
    'name' : 'string',
    'valueType' : 'object'
  },
  'InputSignalTypes' : ['Numeric', 'Categorical'],
  'InputSignalEventTypes' : ['Occurrences', 'Samples'],
  'Assessment'  : {
    'key': 'string',
    'name': 'string',
    'measurement': 'string',
    'episodeMeasurement': 'string',
    'verificationMeasurement': 'string',
    'inputList': '$List(string)',
    'aprioriConditionList': '$List(string)'
  }
};