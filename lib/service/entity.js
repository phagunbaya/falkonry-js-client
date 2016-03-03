/*!
 * falkonry-js-client
 * Copyright(c) 2016 Falkonry Inc
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var Models = require('../helper').Models;

/**
 *
 * EntityService
 *  Class to handle and validate entities and their schemas
 * @constructor
 *
 */
function EntityService () {

}

/**
 *
 * getSchema
 *  To get the schema of the requested entity name
 * @param {String} entityName
 * @returns {Object}
 *
 */
EntityService.prototype.getSchema = function(entityName) {
  return Models[entityName];
};

/**
 *
 * validate
 *  To validate structure of the requested entity
 * @param {Object} object
 * @returns {Boolean}
 *
 */
EntityService.prototype.validate = function(object) {
  return true;
};

module.exports.EntityService = EntityService;