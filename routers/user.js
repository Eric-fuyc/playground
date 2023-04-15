const Router = require('koa-router');
const { getUserByCtx, getUserByID } = require('../services/user');
const { getShareByFileIDAndUserID, getPublicShareByFileID } = require('../services/share');
const { listFilesByUserID } = require('../services/file');

const router = new Router();

router.get('/user/:id', async ctx => {
  // If haven't logged in, redirect to login page.
  const requester = await getUserByCtx(ctx);
  if (!requester) {
    ctx.redirect('/login');
    return;
  }

  const paramID = ctx.params.id;
  const userID = Number(paramID);
  if (isNaN(userID) || !isFinite(userID)) {
    ctx.throw('Invalid user ID.', 400);
  }

  const user = await getUserByID(userID);
  if (!user) {
    ctx.throw(404, 'User not found.');
  }

  const ownFiles = await listFilesByUserID(user.id);

  const publicFiles = (await Promise.all(
    ownFiles.map(file => (getPublicShareByFileID(file.id) ? file : null)))).filter(file => file);

  const sharedFiles = (await Promise.all(
    ownFiles.map(file => (getShareByFileIDAndUserID(file.id, user.id) ? file : null)))).filter(file => file);

  await ctx.render('user', {
    target: user,
    publicFiles,
    sharedFiles,
    user: requester,
  });
});

module.exports = router;

