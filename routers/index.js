const Router = require('koa-router');
const { getUserByCtx } = require('../services/user');
const { listFilesByUserID } = require('../services/file');

const router = new Router();

router.get('/', async ctx => {
  // If haven't logged in, redirect to login page.
  const user = await getUserByCtx(ctx);
  if (!user) {
    ctx.redirect('/login');
    return;
  }

  const ownFiles = await listFilesByUserID(user.id);

  await ctx.render('index', { ownFiles, userName: user.name });
});

module.exports = router;
