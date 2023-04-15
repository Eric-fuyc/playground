const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const body = require('koa-body');
const session = require('koa-session');

const indexRouter = require('./routers');
const loginRouter = require('./routers/login');
const fileRouter = require('./routers/file');
const userRouter = require('./routers/user');

const app = new Koa();

app.keys = [ 'e60e4bda-90eb-4e65-8a70-81366d9a2221' ];

app.use(serve(__dirname + '/static'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

app.use(
  body({
    multipart: true,
  })
);

app.use(
  session(
    {
      key: '1402f2c6-60ab-484f-a9ae-becfefe7deb2',
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      rolling: true,
    },
    app
  )
);

app.use(indexRouter.routes());
app.use(loginRouter.routes());
app.use(fileRouter.routes());
app.use(userRouter.routes());

app.listen(8000, () => {
  console.log('open server localhost:8000');
});
