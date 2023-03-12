const { get } = require('../database');
const { getUserFromDatabaseRow } = require('../models/user');

const sqlGetUserByUserName = get(
  'select * from users where user_name = ? and status = 0',
  getUserFromDatabaseRow
);
const sqlGetUserById = get(
  'select * from users where id = ? and status = 0',
  getUserFromDatabaseRow
);

/**
 * @param {string} username The username.
 */
exports.getUserByUserName = async username => {
  if (!username || typeof username !== 'string') {
    throw Error('invalid username');
  }

  const user = await sqlGetUserByUserName(username);

  return user;
};

/**
 * @param {number} id The user's ID.
 */
exports.getUserByID = async id => {
  if (!id || typeof id !== 'number') {
    throw Error('invalid id');
  }

  const user = await sqlGetUserById(id);

  return user;
};

/**
 * @param {import("koa").Context} ctx Context to check.
 */
exports.getUserByCtx = async ctx => {
  const id = ctx.session.userId;

  // Validate first to prevent errors in getUserByUserName.
  if (!id) {
    return undefined;
  }

  const user = await this.getUserByID(id);

  return user;
};
