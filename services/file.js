const { get, all } = require('../database');
const { getUserByID } = require('./user');
const { getFileFromDatabaseRow } = require('../models/file');
const { getShareFromDatabaseRow } = require('../models/share');

const sqlListFilesByUserID = all(
  'select * from files where user_id = ? and status = 0',
  getFileFromDatabaseRow
);

const sqlGetFileByID = get(
  'select * from files where id = ? and status = 0',
  getFileFromDatabaseRow
);

const sqlGetPublicShareByFileID = get(
  'select * from shares where file_id = ? and user_id = -1 and status = 0',
  getShareFromDatabaseRow
);

/**
 * @param {number} userID er's ID.
 */
const listFilesByUserID = async userID => {
  // Check if user exists.
  const user = getUserByID(userID);
  if (!user) {
    throw Error('User not found!');
  }

  const files = await sqlListFilesByUserID(userID);

  return files;
};

/**
 * @param {number} id File's Id.
 */
const getFileByID = async id => {
  // Validate ID.
  if (!id || typeof id !== 'number') {
    throw Error('Invalid ID!');
  }

  const file = await sqlGetFileByID(id);

  return file;
};

/**
 * @param {number} fileID File's ID
 */
const getPublicShareByFileID = async fileID => {
  // Validate file ID.
  if (!fileID || typeof fileID !== 'number') {
    throw Error('Invalid ID!');
  }

  // Check if file exists
  const file = await getFileByID(fileID);
  if (!file) {
    throw Error('File not found!');
  }

  const share = await sqlGetPublicShareByFileID(file.id);

  return share;
};

module.exports = {
  listFilesByUserID,
  getFileByID,
  getPublicShareByFileID,
};
