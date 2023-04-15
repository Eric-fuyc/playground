const { get, all } = require('../database');
const { getFileByID } = require('./file');
const { getShareFromDatabaseRow } = require('../models/share');
const { mustNumber, mustDefined } = require('../util');
const logger = require('debug')('service:share');

const sqlGetPublicShareByFileID = get(
  'select * from shares where file_id = ? and user_id = -1 and status = 0',
  getShareFromDatabaseRow
);

const sqlListPublicShares = all(
  'select * from shares where user_id = -1 and status = 0',
  getShareFromDatabaseRow
);

const sqlListSharesByFileID = all(
  'select * from shares where file_id = ? and status = 0',
  getShareFromDatabaseRow
);

const sqlGetShareByFileIDAndUserID = get(
  'select * from shares where file_id = ? and user_id = ? and status = 0;',
  getShareFromDatabaseRow
);

const sqlListSharesByUserId = all(
  'select * from shares where user_id = ? and status = 0',
  getShareFromDatabaseRow
);


/**
 * @param {number} fileID The file's ID.
 */
const getPublicShareByFileID = async fileID => {
  logger('getPublicShareByFileID fileID=%o', fileID);
  // Validate file ID.
  mustNumber(fileID, Error('Invalid file ID!'), fileID);

  // Check if file exists.
  const file = await getFileByID(fileID);
  mustDefined(file, Error('File not found!'), fileID);

  const share = await sqlGetPublicShareByFileID(file.id);

  logger('getPublicShareByFileID returned');
  return share;
};

/**
 */
const listPublicShares = async () => {
  logger('listPublicShares');
  const shares = await sqlListPublicShares();

  logger('listPublicShares returned');
  return shares;
};

const getShareByFileIDAndUserID = async (fileID, userID) => {
  logger('getShareByFileIDAndUserID fileID=%o, userID=%o', fileID, userID);
  // Validate file ID.
  mustNumber(userID, Error('Invalid user ID!'), userID);

  // Check if user exists.
  const user = await getFileByID(userID);
  mustDefined(user, Error('User not found!'), userID);

  // Validate file ID.
  mustNumber(fileID, Error('Invalid file ID!'), fileID);

  // Check if file exists.
  const file = await getFileByID(fileID);
  mustDefined(file, Error('File not found!'), fileID);

  const share = sqlGetShareByFileIDAndUserID(fileID, userID);

  logger('getShareByFileIDAndUserID returned');
  return share;
};

/**
 * @param {number} fileID The file's ID.
 */
const listSharesByFileId = async fileID => {
  logger('listSharesByFileId fileID=%o', fileID);
  // Validate file ID.
  mustNumber(fileID, Error('Invalid file ID!'), fileID);

  // Check if file exists;
  const file = await getFileByID(fileID);
  mustDefined(file, Error('File not found!'), fileID);

  const share = await sqlListSharesByFileID(file.id);

  logger('listSharesByFileId returned');
  return share;
};

/**
 * @param {number} userID The user's ID.
 */
const listSharesByUserID = async userID => {
  logger('listSharesByUserID userID=%o', userID);
  // Validate file ID.
  mustNumber(userID, Error('Invalid user ID!'), userID);

  // Check if user exists.
  const user = await getFileByID(userID);
  mustDefined(user, Error('User not found!'), userID);

  const shares = await sqlListSharesByUserId(user.id);

  logger('listSharesByUserID returned');
  return shares;
};


module.exports = {
  getPublicShareByFileID,
  getShareByFileIDAndUserID,
  listSharesByFileId,
  listSharesByUserID,
  listPublicShares,
};
