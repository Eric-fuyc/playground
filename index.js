const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const views = require("koa-views");
const body = require("koa-body");

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

app.use(
  body({
    multipart: true,
  })
);

const router = new Router();
router.get("/", (ctx) => {
  ctx.body = "hello hei";
});

app.use(router.routes());

app.listen(8000, () => {
  console.log("open server localhost:8000");
});
