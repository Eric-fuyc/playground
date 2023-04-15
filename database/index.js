/* eslint-disable jsdoc/check-tag-names */
const db = require('./connection');
const logger = require('debug')('web:database');

const w = (sql, method, hook) => {
  const preparedSQL = db.prepare(sql);
  logger("prepare SQL [ %s ] '%s'", method, sql);

  function wrapper(...params) {
    return new Promise((resolve, reject) => {
      preparedSQL[method](...params, (err, row) => {
        logger("<== [ %s ] '%s'", method, sql);
        logger('<== %o', params);
        if (err) {
          logger('error when excuting: %o', err);
          reject(err);
        }
        const model = hook(row);
        logger('==> %o', model);
        resolve(model);
      });
    });
  }

  return wrapper;
};

/**
 * SQL wrapper method get.
 * @param {string} sql SQL statement to run.
 * @param {(row: any) => T} converter Converter that takes the row and returns the Model.
 * @return {(...param: any) => Promise<T | undefined>} The data model.
 * @template {Object} T
 */
const get = (sql, converter) => {
  const hook = row => {
    if (row) {
      return converter(row);
    }
  };
  return w(sql, 'get', hook);
};

/**
 * SQL wrapper method all
 * @param {string} sql SQL statement to run.
 * @param {(row: any) => T} converter Converter that takes the row and returns the Model.
 * @return {(...param: any) => Promise<T[]>} The data model.
 * @template {Object} T
 */
const all = (sql, converter) => {
  const hook = result => {
    return result.map(row => converter(row));
  };
  return w(sql, 'all', hook);
};

/**
 * SQL wrapper method run
 * @param {string} sql SQL statement to run.
 */
const run = sql => {
  return w(sql, 'run', () => undefined);
};

module.exports = { get, all, run };
