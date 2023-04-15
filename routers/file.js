const Router = require('koa-router');
const { getUserByCtx, getUserByID } = require('../services/user');
const { getFileByID } = require('../services/file');
const { getPublicShareByFileID, listSharesByUserID } = require('../services/share');

const router = new Router();

/**
 * @param {import('../models/file').File} file The File to get.
 */
const getShareStatus = async file => {
  // If shared to everyone, shareStatus === 'public'.
  const publicShare = await getPublicShareByFileID(file.id);
  if (publicShare) {
    return 'public';
  }

  // If shared but not to everyone, shareStatus === 'shared'
  const share = await listSharesByUserID(file.id);
  if (share) {
    return 'shared';
  }

  // Otherwise, shareStatus === 'private'.
  return 'private';
};

router.get('/file/:id', async ctx => {
  // If haven't logged in, redirect to login page.
  const user = await getUserByCtx(ctx);
  if (!user) {
    ctx.redirect('/login');
    return;
  }

  // Validate the request.
  const paramID = ctx.params.id;
  const fileID = Number(paramID);
  if (isNaN(fileID) || !isFinite(fileID)) {
    ctx.throw(400, 'Invalid file ID.');
  }

  // Get the file with the id.
  const file = await getFileByID(fileID);
  if (!file) {
    ctx.throw(404, 'File not found.');
  }

  // Get the owner by ID.
  const ownerID = file.ownerID;
  const owner = await getUserByID(ownerID);

  const shareStatus = await getShareStatus(file);

  await ctx.render('file', {
    user,
    file,
    shareStatus,
    owner,
  });
});

module.exports = router;
