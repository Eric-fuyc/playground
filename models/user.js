/**
 * @readonly
 * @enum {number}
 */
const UserStatus = {
  USER_STATUS_NORMAL: 0,
  USER_STATUS_DELETED: 1,
};

/**
 * @readonly
 * @enum {string}
 */
const UserRole = {
  USER_ROLE_NORMAL: 'user',
  USER_ROLE_ADMINISTRATOR: 'admin',
};

/**
 * Model of user
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} password
 * @property {UserRole} role
 * @property {UserStatus} status
 */

const getUserFromDatabaseRow = row => {
  /**
   * @type {User}
   */
  const user = {
    id: row.id,
    name: row.user_name,
    password: row.user_password,
    role: row.user_role,
    status: row.status,
  };
  return user;
};

module.exports = { UserStatus, UserRole, getUserFromDatabaseRow };
