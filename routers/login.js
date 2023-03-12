const { HttpError } = require('koa');
const Router = require('koa-router');
const { getUserByUserName, getUserByCtx } = require('../services/user');

const router = new Router();

router.get('/login', async ctx => {
  // If already logged in, redirect to home page.
  if (await getUserByCtx(ctx)) {
    ctx.redirect('/');
    return;
  }

  await ctx.render('login', { wrongPassword: false });
});

router.post('/login', async ctx => {
  // If already logged in, redirect to home page.
  if (await getUserByCtx(ctx)) {
    ctx.redirect('/');
  }

  // Validate request.
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    throw HttpError('invalid username or password');
  }

  const user = await getUserByUserName(username);

  // Check if the password is correct.
  if (user?.password === password) {
    // Save the session and redirect to home page.
    ctx.session.userId = user.id;
    ctx.redirect('/');

    return;
  }

  // If password is incorrect, render wrong password hint.
  await ctx.render('login', { wrongPassword: true });
});

module.exports = router;
