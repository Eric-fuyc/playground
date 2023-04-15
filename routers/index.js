const Router = require('koa-router');
const { getUserByCtx } = require('../services/user');
const { listPublicShares, listSharesByUserID } = require('../services/share');
const { getFileByID, listFilesByUserID } = require('../services/file');
const { mustDefined } = require('../util');

const router = new Router();

router.get('/', async ctx => {
  // If haven't logged in, redirect to login page.
  const user = await getUserByCtx(ctx);
  if (!user) {
    ctx.redirect('/login');
    return;
  }

  const ownFiles = await listFilesByUserID(user.id);

  const publicShares = await listPublicShares();
  const publicFiles = await Promise.all(
    publicShares.map(share => mustDefined(getFileByID(share.fileID),
      Error('Unexpect undefined file'), share)));

  const sharedShares = await listSharesByUserID(user.id);
  const sharedFiles = await Promise.all(
    sharedShares.map(share => mustDefined(getFileByID(share.fileID),
      Error('Unexpect undefined file'), share)));


  await ctx.render('index', {
    ownFiles,
    publicFiles,
    sharedFiles,
    user,
  });
});

module.exports = router;
