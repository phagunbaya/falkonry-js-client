/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var Signal       = require('./Signal');
var Assessment   = require('./Assessment');
var Pipeline     = require('./Pipeline');
var Eventbuffer  = require('./Eventbuffer');
var Subscription = require('./Subscription');
var Publication  = require('./Publication');

module.exports = {
  'Signal'       : Signal,
  'Assessment'   : Assessment,
  'Pipeline'     : Pipeline,
  'Eventbuffer'  : Eventbuffer,
  'Subscription' : Subscription,
  'Publication'  : Publication
};