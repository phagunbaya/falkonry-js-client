/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

var Schemas = require('./schema');
var Models = require('./models');

var Utils = {
  'wrapError' : function(code, message) {
    return {
      'code'    : code,
      'message' : message
    };
  }
};

module.exports = {
  'Models' : Models,
  'Schemas': Schemas,
  'Utils'  : Utils
};