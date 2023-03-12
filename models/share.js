/**
 * @readonly
 * @enum {numbers}
 */
const ShareStatus = {
  SHARE_STATUS_NORMAL: 0,
  SHARE_STATUS_DELETED: 1,
};

const SHARE_USER_EVERYONE = -1;

/**
 * Model of Share
 * @typedef {Object} Share
 * @property {number} fileID
 * @property {number | SHARE_USER_EVERYONE} userID
 * @property {ShareStatus} status
 */

const getShareFromDatabaseRow = row => {
  /**
   * @type {Share}
   */
  const share = {
    fileID: row.file_id,
    userID: row.user_id,
    status: row.status,
  };
  return share;
};

module.exports = { ShareStatus, getShareFromDatabaseRow, SHARE_USER_EVERYONE };
