const { get, all } = require('../database');
const { getUserByID } = require('./user');
const { getFileFromDatabaseRow } = require('../models/file');
const { mustNumber, mustDefined } = require('../util');
const logger = require('debug')('service:file');

const sqlListFilesByUserID = all(
  'select * from files where user_id = ? and status = 0',
  getFileFromDatabaseRow
);

const sqlGetFileByID = get(
  'select * from files where id = ? and status = 0',
  getFileFromDatabaseRow
);


/**
 * @param {number} userID er's ID.
 */
const listFilesByUserID = async userID => {
  logger('listFileByUserID userID=%o', userID);

  // Check if user exists.
  const user = getUserByID(userID);
  mustDefined(user, Error('User not found!'), userID);

  const files = await sqlListFilesByUserID(userID);

  logger('listFileByUserID returned');
  return files;
};

/**
 * @param {number} id File's Id.
 */
const getFileByID = async id => {
  logger('getFileByID id=%o', id);
  // Validate ID.
  mustNumber(id, Error('Invalid file ID!'), id);

  const file = await sqlGetFileByID(id);

  logger('getFileByID returned');
  return file;
};

module.exports = {
  listFilesByUserID,
  getFileByID,
};
