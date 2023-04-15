/* eslint-disable jsdoc/check-tag-names */
const logger = require('debug')('web-util');

const must = (hook, adj) => async (obj, err, log) => {
  const value = await obj;
  if (hook(value)) {
    logger('%o is %s, obj=%o', value, adj, log);
    throw err;
  }
  return value;
};

const definedCondition = value => typeof value === 'undefined' || value === null;
const numberCondition = value => definedCondition(value) || typeof value !== 'number';
const stringCondition = value => definedCondition(value) || typeof value !== 'string';

/**
 * @template {Object} T
 */
const mustDefined = must(definedCondition, 'undefined');

/**
 * @param {Promise<any>} obj Promise of object to detect.
 * @param {Error} err If is not number throw this error.
 * @param {Object} log The object to log.
 * @return {number} The number.
 */
const mustNumber = must(numberCondition, 'not number');

/**
 * @param {Promise<any>} obj Promise of object to detect.
 * @param {Error} err If is is not string throw this error.
 * @param {Object} log The object to log.
 * @return {string} The string.
 */
const mustString = must(stringCondition, 'not string');

module.exports = {
  mustDefined,
  mustNumber,
  mustString,
};
