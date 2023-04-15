const { get } = require('../database');
const { getUserFromDatabaseRow } = require('../models/user');
const { mustString, mustNumber } = require('../util');
const logger = require('debug')('servcie:user');

const sqlGetUserByUserName = get(
  'select * from users where user_name = ? and status = 0',
  getUserFromDatabaseRow
);
const sqlGetUserById = get(
  'select * from users where id = ? and status = 0',
  getUserFromDatabaseRow
);

/**
 * @param {string} userName The username.
 */
exports.getUserByUserName = async userName => {
  logger('getUserByUserName userName=%o', userName);
  mustString(userName, Error('invalid userName'), userName);

  const user = await sqlGetUserByUserName(userName);

  logger('getUserByUserName returned');
  return user;
};

/**
 * @param {number} id The user's ID.
 */
exports.getUserByID = async id => {
  logger('getUserByID id=%o', id);
  mustNumber(id, Error('Invalid userID!'), id);

  const user = await sqlGetUserById(id);

  logger('getUserByID returned');
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
