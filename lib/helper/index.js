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
  },
  'randomString' : function(length) {
    length = length || 6;
    var allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789', string = '';
    for(var i = 0; i < length; i++) {
      string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return string;
  }
};

module.exports = {
  'Models' : Models,
  'Schemas': Schemas,
  'Utils'  : Utils
};