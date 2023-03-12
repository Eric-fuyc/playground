/**
 * @readonly
 * @enum {numbers}
 */
const FileStatus = {
  FILE_STATUS_NORMAL: 0,
  FILE_STATUS_DELETED: 1,
};

/**
 * Model of file
 * @typedef {Object} File
 * @property {number} id
 * @property {string} name
 * @property {number} ownerID
 * @property {FileStatus} status
 */

const getFileFromDatabaseRow = row => {
  /**
   * @type {File}
   */
  const file = {
    id: row.id,
    name: row.file_name,
    ownerID: row.user_id,
    status: row.status,
  };
  return file;
};

module.exports = { FileStatus, getFileFromDatabaseRow };
